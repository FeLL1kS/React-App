using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/follow")]
    [ApiController]
    public class FollowersController : ControllerBase
    {
        private readonly SNDBContext _context;

        public FollowersController(SNDBContext context)
        {
            _context = context;
        }

        // GET: api/Followers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<bool>> GetFollowers(int id)
        {
            if (await _context.Users.FindAsync(id) == null || id.ToString() == User.Identity.Name)
                return BadRequest();

            List<Followers> followers = await (from f in _context.Followers where f.CurrentUser == Int32.Parse(User.Identity.Name) select f).ToListAsync();

            foreach(Followers follower in followers)
            {
                if(follower.RequestedUser == id)
                {
                    return true;
                }
            }
            return false;
        }

        // POST: api/Followers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{id}")]
        public async Task<ActionResult<ResultModel<int>>> PostFollowers(int id)
        {
            if (await _context.Users.FindAsync(id) == null || id.ToString() == User.Identity.Name)
                return new ResultModel<int> { ResultCode = 1, Messages = "The user does not exist or you are trying to follow to yourself" };

            Followers follower = (from f in _context.Followers where f.CurrentUser == Int32.Parse(User.Identity.Name) && f.RequestedUser == id select f).FirstOrDefault();

            if(follower == null)
            {
                follower = new Followers
                {
                    CurrentUser = Int32.Parse(User.Identity.Name),
                    RequestedUser = id
                };
                _context.Followers.Add(follower);
                await _context.SaveChangesAsync();
                return new ResultModel<int> { ResultCode = 0, Messages = "Followed", Data = follower.Id};
            }
            return new ResultModel<int> { ResultCode = 1, Messages = "You are already followed to this user" };
        }

        // DELETE: api/Followers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ResultModel<int>>> DeleteFollowers(int id)
        {
            if (await _context.Users.FindAsync(id) == null)
                return new ResultModel<int> { ResultCode = 1, Messages = "The user does not exist"};

            Followers follower = (from f in _context.Followers where f.CurrentUser == Int32.Parse(User.Identity.Name) && f.RequestedUser == id select f).FirstOrDefault();
            if (follower == null)
                return new ResultModel<int> { ResultCode = 1, Messages = "You are not followed to this user" };
            _context.Followers.Remove(follower);
            await _context.SaveChangesAsync();
            return new ResultModel<int> { ResultCode = 0, Messages = "Unfollowed", Data = follower.Id };
        }
    }
}
