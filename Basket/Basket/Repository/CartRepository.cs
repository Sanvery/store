using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basket.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Basket.Models;

namespace Basket.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly CartContext _dbContext;

        public CartRepository(CartContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Cart> GetCarts()
        {
            return _dbContext.Carts.ToList();
        }

        public Material GetMaterialByID(int materialId)
        {
            return _dbContext.Materials.Find(materialId);
        }

        public void AddToCart(string cartId, Material material)
        {
            try
            {
                // Get the matching cart and album instances
                var cartItem = _dbContext.Carts.SingleOrDefault(
                    c => c.CartId == cartId
                    && c.MaterialvId == material.vId);
                if (cartItem == null)
                {
                    // Create a new cart item if no cart item exists
                    cartItem = new Cart
                    {
                        MaterialvId = material.vId,
                        CartId = cartId,
                        Quantity = 1,
                        OrderId = 1
                    };
                    _dbContext.Carts.Add(cartItem);
                }
                else
                {
                    // If the item does exist in the cart, 
                    // then add one to the quantity
                    cartItem.Quantity++;
                }
                Save();
            }
            catch
            {
                return;
            }
        }

        public void RemoveFromCart(string cartId, int materialId, int quantity)
        {
            // Get the cart
            var cartItem = _dbContext.Carts.Single(
                cart => cart.CartId == cartId
                && cart.MaterialvId == materialId);

            if (cartItem != null)
            {
                if (quantity > 0)
                {
                    cartItem.Quantity = quantity;
                }
                if (quantity == 0)
                {
                    _dbContext.Carts.Remove(cartItem);
                }
                Save();
            }
            return;
        }

        // clear cart
        public void EmptyCart(string cartId)
        {
            var cartItems = _dbContext.Carts.Where(
                cart => cart.CartId == cartId);

            foreach (var cartItem in cartItems)
            {
                _dbContext.Carts.Remove(cartItem);
            }
            Save();
        }

        public List<Cart> GetCartItems(string cartId)
        {
            return _dbContext.Carts.Where(
                cart => cart.CartId == cartId).ToList();
        }

        public List<Order> GetOrders(string userName)
        {
            return _dbContext.Orders.Where(
                order => order.UserName == userName).ToList();
        }

        public int GetCount(string cartId)
        {
            // Get the count of each item in the cart and sum them up
            int? count = (from cartItems in _dbContext.Carts
                          where cartItems.CartId == cartId
                          select (int?)cartItems.Quantity).Sum();
            // Return 0 if all entries are null
            return count ?? 0;
        }

        public decimal GetTotal(string cartId)
        {
            // Multiply album price by count of that album to get 
            // the current price for each of those albums in the cart
            // sum all album price totals to get the cart total
            decimal? total = (from cartItems in _dbContext.Carts
                              where cartItems.CartId == cartId
                              select (int?)cartItems.Quantity *
                              cartItems.Material.vPrice).Sum();

            return total ?? decimal.Zero;
        }

        public int CreateOrder(string cartId, string userName)
        {
            var order = new Order
            {
                UserName = userName,
                OrderDate = DateTime.Now,
                TotalPrice = GetTotal(cartId)
            };
            _dbContext.Orders.Add(order);
            Save();
            int orderId = order.OrderId;
            return orderId;
        }

        // When a user has logged in, migrate their shopping cart to
        // be associated with their username
        public void MigrateCart(string cartId, string userName)
        {
            var shoppingCart = _dbContext.Carts.Where(
                c => c.CartId == cartId);

            foreach (Cart item in shoppingCart)
            {
                item.CartId = userName;
            }
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
