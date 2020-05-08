using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly SNDBContext _context;
        IWebHostEnvironment _appEnvironment;

        public PhotosController(SNDBContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context; 
            _appEnvironment = appEnvironment;
        }

        public class FileUploadAPI
        {
            public IFormFile Files { get; set; }
        }

        [HttpPost]
        public string PostPhotos([FromForm] FileUploadAPI objFile)
        {
            try
            {
                if (objFile.Files.Length > 0)
                {
                    if (!Directory.Exists(_appEnvironment.WebRootPath + "\\Files\\"))
                    {
                        Directory.CreateDirectory(_appEnvironment.WebRootPath + "\\Files\\");
                    }
                    using (FileStream fileStream = System.IO.File.Create(_appEnvironment.WebRootPath + "\\Files\\" + objFile.Files.FileName))
                    {
                        objFile.Files.CopyTo(fileStream);
                        string[] nameAndExtension = objFile.Files.FileName.Split('.');
                        fileStream.Flush();
                        Photos photo = new Photos
                        {
                            FileName = nameAndExtension[0],
                            Extension = nameAndExtension[1],
                            FilePath = "http://localhost:2669/Files/" + objFile.Files.FileName
                        };
                        _context.Photos.Add(photo);
                        _context.SaveChanges();
                        return "\\Upload\\" + objFile.Files.FileName;
                    }
                }
                else
                {
                    return "Failed";
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

    }
}
