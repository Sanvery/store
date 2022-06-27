using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Store.Contexts;
using Store.Models;
using System.Collections;
using System.Collections.Specialized;

namespace Store.Repository
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly MaterialContext _dbContext;

        public MaterialRepository(MaterialContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Material> GetMaterials()
        {
            return _dbContext.Materials.ToList();
        }

        public Material GetMaterialByID(int materialId)
        {
            return _dbContext.Materials.Find(materialId);
        }

        public void InsertMaterial(Material material)
        {
            _dbContext.Add(material);
            Save();
        }

        public void DeleteMaterial(Material Material)
        {
            throw new NotImplementedException();
        }

        public void DeleteMaterial(int materialId)
        {
            var material = _dbContext.Materials.Find(materialId);
            _dbContext.Materials.Remove(material);
            Save();
        }

        public void UpdateMaterial(Material material)
        {
            _dbContext.Entry(material).State = EntityState.Modified;
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
