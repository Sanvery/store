using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _dbContext;

        public UserRepository(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool ValidateCredentials(string username, string password)
        {
            var user = FindUser(username);
            if (user != null)
            {
                return user.UserPassword.Equals(password);
            }

            return false;
        }

        public IEnumerable<User> GetUsers()
        {
            return _dbContext.Users.ToList();
        }

        public void AddUser(string userName, string password)
        {
            var user = new User
            {
                UserName = userName,
                UserId = GetUsersCount() + 1,
                UserPassword = password
            };
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public User FindUser(string userName)
        {
            return _dbContext.Users.Find(userName);
        }

        public int GetUsersCount()
        {
            return _dbContext.Users.Count();
        }
    }
}
