using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/profile")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly SNDBContext _context;
        readonly IWebHostEnvironment _appEnvironment;

        public ProfilesController(SNDBContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        [AllowAnonymous]
        // GET: api/Profiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileModel>> GetProfile(int id)
        {
            try
            {
                Profile profile = (from p in _context.Profiles where p.UserId == id select p).FirstOrDefault();
                Users user = await _context.Users.FindAsync(profile.UserId);
                user.Photo = await _context.Photos.FindAsync(user.PhotoId);
                Contacts contacts = await _context.Contacts.FindAsync(profile.ContactsId);

                ProfileModel model = new ProfileModel
                {
                    UserId = (int)profile.UserId,
                    LookingForAJob = profile.LookingForAJob,
                    LookingForAJobDescription = profile.LookingForAJobDescription,
                    FullName = user.Name,
                    Status = user.Status,
                    Contacts = contacts,
                };
                try
                {
                    model.Photo = user.Photo.FilePath;
                }
                catch(Exception ex)
                {
                    model.Error = ex.ToString();
                }

                if (profile == null)
                {
                    return NotFound();
                }

                return model;
            }
            catch(Exception ex)
            {
                return new ProfileModel { Error = ex.ToString() };
            }
        }

        [AllowAnonymous]
        [HttpGet("status/{id}")]
        public async Task<string> GetStatus(int id)
        {
            Users user = await _context.Users.FindAsync(id);
            try
            {
                return user.Status;
            }
            catch
            {
                return "Couldn't find user"; 
            }
        }

        [HttpPut]
        public async Task<ResultModel<ProfileModel>> PutProfile(ProfileModel profile)
        {
            profile.UserId = Int32.Parse(User.Identity.Name);
            
            Users user = await _context.Users.FindAsync(profile.UserId);
            user.Name = profile.FullName;
            
            Profile pr = (from p in _context.Profiles where p.UserId == profile.UserId select p).FirstOrDefault();
            pr.LookingForAJob = profile.LookingForAJob;
            pr.LookingForAJobDescription = profile.LookingForAJobDescription;
            
            profile.Contacts.Id = (int)pr.ContactsId;
            
            _context.Contacts.Update(profile.Contacts);
            _context.Users.Update(user);
            _context.Profiles.Update(pr);
            await _context.SaveChangesAsync();
            return new ResultModel<ProfileModel> { ResultCode = 0, Messages = "Profile data changed", Data = profile };
        }

        [HttpPut("photo")]
        public async Task<ResultModel<string>> PutPhoto([FromForm] FileUploadAPI objFile)
        {
            try
            {
                if (objFile.Files.Length > 0)
                {
                    if (!Directory.Exists(_appEnvironment.WebRootPath + "\\Files\\"))
                    {
                        Directory.CreateDirectory(_appEnvironment.WebRootPath + "\\Files\\");
                    }

                    string Alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
                    Random rnd = new Random();
                    StringBuilder sb = new StringBuilder(9);
                    int Position = 0;
                    for (int i = 0; i <= 9; i++)
                    {
                        Position = rnd.Next(0, Alphabet.Length - 1);
                        sb.Append(Alphabet[Position]);
                    }

                    string FileName = sb.ToString();
                    string[] nameAndExtension = objFile.Files.FileName.Split('.');
                    nameAndExtension[0] = FileName;

                    using (FileStream fileStream = System.IO.File.Create(_appEnvironment.WebRootPath + "\\Files\\" + nameAndExtension[0] + '.' + nameAndExtension[1]))
                    {
                        objFile.Files.CopyTo(fileStream);
                        fileStream.Flush();
                        Photos photo = (from p in _context.Photos where p.FilePath == "http://localhost:2669/Files/" + nameAndExtension[0] + '.' + nameAndExtension[1] select p).FirstOrDefault();
                        if(photo == null)
                        {
                            photo = new Photos
                            {
                                FileName = nameAndExtension[0],
                                Extension = nameAndExtension[1],
                                FilePath = "http://localhost:2669/Files/" + nameAndExtension[0] + '.' + nameAndExtension[1]
                            };
                            
                            _context.Photos.Add(photo);
                            await _context.SaveChangesAsync();
                        }
                        
                        Users user = await _context.Users.FindAsync(Int32.Parse(User.Identity.Name));
                        if(user.PhotoId != null)
                        {
                            Photos ph = await _context.Photos.FindAsync(user.PhotoId);
                            System.IO.File.Delete(_appEnvironment.WebRootPath + "\\Files\\" + ph.FileName + '.' + ph.Extension);
                            _context.Photos.Remove(ph);
                        }
                        user.PhotoId = photo.Id;
                        await _context.SaveChangesAsync();
                        return new ResultModel<string> { ResultCode = 0, Messages = "Upload", Data = photo.FilePath };
                    }
                }
                else
                {
                    return new ResultModel<string> { ResultCode = 1, Messages = "There are no files" };
                }
            }
            catch (Exception ex)
            {
                return new ResultModel<string> { ResultCode = 10, Messages = ex.ToString() };
            }
        }

        [HttpPut("status")]
        public async Task<ResultModel<string>> PutStatus(StatusModel status)
        {
            try
            {
                Users user = (from u in _context.Users where u.Id == Int32.Parse(User.Identity.Name) select u).FirstOrDefault();
                user.Status = status.Status;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return new ResultModel<string> { ResultCode = 1, Messages = "Status is changed", Data = user.Status };
            }
            catch(Exception ex)
            {
                return new ResultModel<string> { ResultCode = 1, Messages = ex.ToString() };
            }
        }

        //// DELETE: api/Profiles/5
        //[HttpDelete("{id}")]
        //public async Task<ResultModel<Profile>> DeleteProfile(int id)
        //{
        //    Profile profile = await _context.Profiles.FindAsync(id);
        //    if (profile == null)
        //    {
        //        return new ResultModel<Profile> { ResultCode = 1, Messages = "Profile not found" };
        //    }

        //    _context.Profiles.Remove(profile);
        //    await _context.SaveChangesAsync();

        //    return new ResultModel<Profile> { ResultCode = 0, Messages = "Profile removed", Data = profile };
        //}
    }
}
