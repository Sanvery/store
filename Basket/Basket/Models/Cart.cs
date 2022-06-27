using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Models
{
    public class Cart
    {
        [Key]
        public int RecordId { get; set; }
        public string CartId { get; set; }
        public int OrderId { get; set; }
        public int MaterialvId { get; set; }
        public int Quantity { get; set; }
        public virtual Material Material { get; set; }
    }
}
