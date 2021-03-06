﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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

        public class Data
        {
            public int UserId { get; set; }
            public string Email { get; set; }
            public string Name { get; set; }
        }

        [AllowAnonymous]
        [HttpGet("me")]
        public async Task<ActionResult<ResultModel<Data>>> Get()
        {
            if(User.Identity.IsAuthenticated)
            {
                Users user = await _context.Users.FindAsync(Int32.Parse(User.Identity.Name));
                return new ResultModel<Data> { ResultCode = 0, Data = new Data { UserId = Int32.Parse(User.Identity.Name), Email = user.Email, Name = user.Name }};
            }
            else
            {
                return new ResultModel<Data> { ResultCode = 1, Messages = "Not Authenticated!" };
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<ResultModel<string>>> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                if(user != null)
                {
                    await Authenticate(user.Id.ToString());

                    return new ResultModel<string> { ResultCode = 0, Messages = "Successfully logged in" };
                }
            }
            return new ResultModel<string> { ResultCode = 1, Messages = "Incorrect email or password" };
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<ResultModel<Data>>> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    if(model.Password != model.ConfirmPassword)
                    {
                        return new ResultModel<Data>
                        {
                            ResultCode = 11,
                            Messages = "Incorrect password"
                        };
                    }

                    user = new Users
                    {
                        Email = model.Email,
                        Password = model.Password,
                        Name = model.Name + ' ' + model.Surname
                    };
                    if(model.LocationId == 0)
                    {
                        user.LocationId = null;
                    }
                    else
                    {
                        user.LocationId = model.LocationId;
                    }

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    if (model.Contacts == null)
                    {
                        _context.Contacts.Add(model.Contacts = new Contacts()); 
                    }
                    else
                    {
                        _context.Contacts.Add(model.Contacts);
                    }
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

                    return new ResultModel<Data>
                    {
                        ResultCode = 0,
                        Messages = "Successful registered",
                        Data = new Data { Email = user.Email, UserId = user.Id }
                    };
                }
                else
                    return new ResultModel<Data>
                    {
                        ResultCode = 1,
                        Messages = "This e-mail is already in use"
                    };
            }
            return new ResultModel<Data>
            {
                ResultCode = 10,
                Messages = "Incorrect model"
            };
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
        public async Task<ResultModel<string>> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return new ResultModel<string> { ResultCode = 0, Messages = "Logout Successful" };
            }
            catch
            {
                return new ResultModel<string> { ResultCode = 1, Messages = "Unexpected Error" };
            }
        }
    }
}