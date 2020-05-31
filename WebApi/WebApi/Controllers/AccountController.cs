using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Route("api/auth/")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private SNDBContext _context;
        public AccountController(SNDBContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("me")]
        public ActionResult<AuthModel> Get()
        {
            if(User.Identity.IsAuthenticated)
            { 
                return new AuthModel { ResultCode = 0, Data = User.Identity.Name, Messages = "" };
            }
            else
            {
                return new AuthModel { ResultCode = 1, Messages = "Not Authenticated!" };
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<Users>> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                if(user != null)
                {
                    await Authenticate(user.Id.ToString());

                    return user;
                }
            }
            return NotFound();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Users>> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    user = new Users
                    {
                        Email = model.Email,
                        Password = model.Password,
                        Name = model.Name + ' ' + model.Surname,
                        LocationId = model.LocationId,
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    _context.Contacts.Add(model.Contacts);
                    await _context.SaveChangesAsync();

                    Profile profile = new Profile
                    {
                        ContactsId = model.Contacts.Id,
                        UserId = user.Id,
                        LookingForAJob = model.LookingForAJob,
                        LookingForAJobDescription = model.LookingForAJobDescription
                    };

                    _context.Profiles.Add(profile);
                    await _context.SaveChangesAsync();

                    await Authenticate(user.Id.ToString());

                    return CreatedAtAction("Register", new { id = user.Id }, user);
                }
                else
                    return NotFound();
            }
            return BadRequest();
        }

        private async Task Authenticate(string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userId)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpDelete("logout")]
        public async Task<string> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return "Logout Success";
        }
    }
}