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
    [Route("api/auth/me")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private SNDBContext db;
        public AccountController(SNDBContext context)
        {
            db = context;
        }

        [HttpGet]
        public string Get()
        {
            return "Authorized";
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<string> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = await db.Users.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                if(user != null)
                {
                    await Authenticate(model.Email);

                    return "Авторизовано";
                }
            }
            return "Пользователя нет";
        }

        private async Task Authenticate(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet("logout")]
        public async Task Logout()
        {
            await ConfirmLogout();
        }

        public async Task<IActionResult> ConfirmLogout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
    }
}