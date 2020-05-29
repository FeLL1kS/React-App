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
//using System.Web.Http;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            List<Users> users = await _context.Users.ToListAsync();

            List<Users> items = users.Skip((pagingParameterModel.PageNumber - 1) * pagingParameterModel.PageSize).Take(pagingParameterModel.PageSize).ToList();

            foreach (Users user in items)
            {
                user.Location = await _context.Locations.FindAsync(user.LocationId);
                user.Photo = await _context.Photos.FindAsync(user.PhotoId);
            }

            UserList userList = new UserList
            {
                users = items,
                TotalPages = (int)(Math.Ceiling(users.Count() / (double)pagingParameterModel.PageSize))
            };

            return userList;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var user = await _context.Users.FindAsync(id);
            user.Location = await _context.Locations.FindAsync(user.LocationId);
            user.Photo = await _context.Photos.FindAsync(user.PhotoId);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            users.Id = id;

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            Contacts contacts = new Contacts();
            _context.Contacts.Add(contacts);
            _context.SaveChanges();

            Profile profile = new Profile
            {
                FullName = users.Name,
                UserId = users.Id,
                ContactsId = contacts.Id
            };
            _context.Profiles.Add(profile);
            _context.SaveChanges();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
