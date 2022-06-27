using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basket.Models;

namespace Basket.Repository
{
    public interface ICartRepository
    {
        IEnumerable<Cart> GetCarts();
        Material GetMaterialByID(int materialId);
        List<Cart> GetCartItems(string cartId);
        void AddToCart(string cartId, Material material);
        void RemoveFromCart(string cartId, int materialId, int quantity);
        void EmptyCart(string cartId);
        int GetCount(string cartId);
        decimal GetTotal(string cartId);
        int CreateOrder(string cartId, string userName);
        void MigrateCart(string cartId, string userName);
        List<Order> GetOrders(string userName);
        void Save();
    }
}
