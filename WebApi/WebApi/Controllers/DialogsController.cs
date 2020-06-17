using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DialogsController : ControllerBase
    {
        private readonly SNDBContext _context;

        public DialogsController(SNDBContext context)
        {
            _context = context;
        }

        public class Data
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Avatar { get; set; }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResultModel<List<Data>>>> GetDialogs(int id)
        {
            List<Data> datas = new List<Data>();
            List<Dialog> dialogs = await _context.Dialogs.Where(d => d.firstUserID == id || d.secondUserID == id).ToListAsync();

            foreach (Dialog dialog in dialogs)
            {
                int userId = id == dialog.firstUserID ? dialog.secondUserID : dialog.firstUserID;
                Users user = await _context.Users.FindAsync(userId);
                user.Photo = await _context.Photos.FindAsync(user.PhotoId);
                datas.Add(new Data { Id = dialog.Id, Name = user.Name, Avatar = user.Photo.FilePath });
            }

            return new ResultModel<List<Data>> { ResultCode = 0, Data = datas };
        }

        [HttpGet("messages/{id}")]
        public async Task<ActionResult<List<Message>>> GetMessages(int id)
        {
            return await _context.Messages.Where(m => m.DialogId == id).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Dialog>> PostNewDialog(Dialog dialog)
        {
            Dialog temp = await _context.Dialogs.FirstOrDefaultAsync(d => d.firstUserID == dialog.firstUserID && d.secondUserID == dialog.secondUserID || d.firstUserID == dialog.secondUserID && d.secondUserID == dialog.firstUserID);
            if (temp != null)
                return NotFound();
            dialog.DateOfCreation = DateTime.Now;
            _context.Dialogs.Add(dialog);
            await _context.SaveChangesAsync();
            return dialog;
        }


        [HttpPost("messages")]
        public async Task<ActionResult<Message>> PostNewMessage(Message message)
        {
            message.Dialog = await _context.Dialogs.FindAsync(message.DialogId);
            if (message.UserId != message.Dialog.firstUserID && message.UserId != message.Dialog.secondUserID)
                return NotFound();

            message.DateCreated = DateTime.Now;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
