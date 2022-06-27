using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Basket.Models;
using Basket.Contexts;
using Basket.Repository;
using System.Transactions;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;

namespace Basket.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("AllowCors")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        public ShoppingCartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        // GET: ShoppingCart
        [HttpGet]
        public IActionResult Get()
        {
            var cart = _cartRepository.GetCarts();
            return new OkObjectResult(cart);
        }

        // GET: ShoppingCart/5
        [HttpGet("{cartId}")]
        public IActionResult Get(string cartId)
        {
            var cart = _cartRepository.GetCartItems(cartId);
            return new OkObjectResult(cart);
        }

        // GET: ShoppingCart/5/3
        [HttpGet("{cartId}/{materialId}")]
        public IActionResult Get(string cartId, int materialId)
        {
            var material = _cartRepository.GetMaterialByID(materialId);
            using (var scope = new TransactionScope())
            {
                _cartRepository.AddToCart(cartId, material);
                scope.Complete();
                if (material != null)
                    return new OkResult();
                else
                    return NotFound();
            }
        }

        // GET: ShoppingCart/orders/name
        [HttpGet("orders/{userName}")]
        [Authorize]
        public IActionResult GetOrders(string userName)
        {
            var orders = _cartRepository.GetOrders(userName).OrderByDescending(i => i.OrderId);
            return new OkObjectResult(orders);
        }

        public class CartParams
        {
            public string cartId { get; set; }
            public int materialId { get; set; }
            public int quantity { get; set; }
        }

        public class OrderParams
        {
            public string cartId { get; set; }
            public string userName { get; set; }
        }

        [HttpPost]

        public IActionResult Post([FromBody] CartParams cartParams)
        {
            string cartId = cartParams.cartId;
            int materialId = cartParams.materialId;
            int quantity = cartParams.quantity;

            _cartRepository.RemoveFromCart(cartId, materialId, quantity);
            return new OkResult();
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public int PostOrder([FromBody] OrderParams orderParams)
        {
            string cartId = orderParams.cartId;
            string userName = orderParams.userName;

            int orderId =_cartRepository.CreateOrder(cartId, userName);
            _cartRepository.MigrateCart(cartId, userName);
            _cartRepository.EmptyCart(cartId);
            return orderId;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{cartId}")]
        public IActionResult Delete(string cartId)
        {
            _cartRepository.EmptyCart(cartId);
            return new OkResult();
        }
    }
}
