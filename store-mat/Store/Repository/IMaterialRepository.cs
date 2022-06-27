using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Store.Contexts;
using Store.Models;

namespace Store.Repository
{
    public interface IMaterialRepository
    {
        IEnumerable<Material> GetMaterials();

        Material GetMaterialByID(int MaterialId);

        void InsertMaterial(Material Material);

        void DeleteMaterial(int MaterialId);

        void UpdateMaterial(Material Material);

        void Save();
    }
}
