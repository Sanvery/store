using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Basket.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string UserName { get; set; }
        public System.DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
