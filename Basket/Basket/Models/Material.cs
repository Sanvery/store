using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Models
{
    public class Material
    {
        [Key]
        public int vId { get; set; }
        public string vImage { get; set; }
        public string vNameBuildingMaterial { get; set; }
        public string vCatalog { get; set; }
        public string vBrand { get; set; }
        public int vPrice { get; set; }
    }
}
