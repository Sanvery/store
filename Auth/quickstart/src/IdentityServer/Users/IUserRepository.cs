using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Users
{
    public interface IUserRepository
    {
        bool ValidateCredentials(string username, string password);
        IEnumerable<User> GetUsers();
        void AddUser(string userName, string password);
        User FindUser(string userName);
    }
}
