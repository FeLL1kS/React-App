using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SNDBContext _context;

        public UsersController(SNDBContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<UserList>> GetUsers([FromQuery]PagingParameterModel pagingParameterModel)
        {
            List<Users> users = await _context.Users.Include(l => l.Location).Include(p => p.Photo).ToListAsync();
            List<Users> items = users.Skip((pagingParameterModel.PageNumber - 1) * pagingParameterModel.PageSize).Take(pagingParameterModel.PageSize).ToList();
            List<UserModel> models = new List<UserModel>();

            foreach (Users user in items)
            {
                UserModel model = new UserModel
                {
                    Id = user.Id,
                    Location = user.Location,
                    Name = user.Name,
                    Status = user.Status
                };
                if(user.Photo != null)
                {
                    model.Photo = user.Photo.FilePath;
                }
                try
                {
                    Followers follower = (from f in _context.Followers where f.CurrentUser == Int32.Parse(User.Identity.Name) && f.RequestedUser == user.Id select f).FirstOrDefault();
                    if (follower != null)
                        model.Followed = true;
                    else
                        model.Followed = false;
                }
                catch
                {
                    model.Followed = false;
                }
                models.Add(model);
            }

            UserList userList = new UserList
            {
                users = models,
                TotalPages = (int)(Math.Ceiling(users.Count() / (double)pagingParameterModel.PageSize))
            };

            return userList;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUsers(int id)
        {
            Users user = await _context.Users.Include(l => l.Location).Include(p => p.Photo).FirstOrDefaultAsync(u => u.Id == id);

            UserModel model = new UserModel
            {
                Id = user.Id,
                Location = user.Location,
                Name = user.Name,
                Photo = user.Photo.FilePath,
                Status = user.Status
            };
            Followers follower = (from f in _context.Followers where f.CurrentUser == Int32.Parse(User.Identity.Name) && f.RequestedUser == user.Id select f).FirstOrDefault();
            if (follower != null)
                model.Followed = true;
            else
                model.Followed = false;

            if (user == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpDelete("{id}")]
        public async Task<string> DeleteUser(int id)
        {
            Users user = await _context.Users.FindAsync(id);
            if(user.PhotoId != null) 
                _context.Photos.Remove(await _context.Photos.FindAsync(user.PhotoId));
            _context.Users.Remove(user);
            Profile profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == id);
            _context.Contacts.Remove(_context.Contacts.Find(profile.ContactsId));
            _context.Profiles.Remove(profile);
            _context.Followers.RemoveRange(await _context.Followers.Where(f => f.CurrentUser == id).ToListAsync());
            await _context.SaveChangesAsync();
            return "Successfull deleted";
        }
    }
}
