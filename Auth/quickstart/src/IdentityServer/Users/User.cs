using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Users
{
    public class User
    {
        [Key]
        public string UserName { get; set; }
        public int UserId { get; set; }
        public string UserPassword { get; set; }
    }
}
