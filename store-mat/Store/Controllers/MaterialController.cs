using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Models;
using Store.Contexts;
using Store.Repository;
using System.Transactions;
using Microsoft.AspNetCore.JsonPatch;
using System.Web.Http.Cors;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class MaterialController : ControllerBase
    {

        private readonly IMaterialRepository _materialRepository;

        public MaterialController(IMaterialRepository materialRepository)
        {
            _materialRepository = materialRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var materials = _materialRepository.GetMaterials();
            return new OkObjectResult(materials);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var material = _materialRepository.GetMaterialByID(id);
            return new OkObjectResult(material);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Material material)
        {
            using (var scope = new TransactionScope())
            {
                _materialRepository.InsertMaterial(material);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = material.vId }, material);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Material material)
        {
            if (material != null)
            {
                using (var scope = new TransactionScope())
                {
                    _materialRepository.UpdateMaterial(material);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _materialRepository.DeleteMaterial(id);
            return new OkResult();
        }
    }
}