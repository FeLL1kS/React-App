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
    [Route("api/[controller]")]
    [ApiController]
    public class DialogsController : ControllerBase
    {
        private readonly SNDBContext _context;

        public DialogsController(SNDBContext context)
        {
            _context = context;
        }

        public class DialogsData
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Avatar { get; set; }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResultModel<List<DialogsData>>>> GetDialogs(int id)
        {
            List<DialogsData> datas = new List<DialogsData>();
            List<Dialog> dialogs = await _context.Dialogs.Where(d => d.firstUserID == id || d.secondUserID == id).ToListAsync();

            foreach (Dialog dialog in dialogs)
            {
                int userId = id == dialog.firstUserID ? dialog.secondUserID : dialog.firstUserID;
                Users user = await _context.Users.FindAsync(userId);
                user.Photo = await _context.Photos.FindAsync(user.PhotoId);
                datas.Add(new DialogsData { Id = user.Id, Name = user.Name, Avatar = user.Photo.FilePath });
            }

            return new ResultModel<List<DialogsData>> { ResultCode = 0, Data = datas };
        }

        public class MessagesData
        {
            public int Id { get; set; }
            public string Message { get; set; }
            public string From { get; set; }
            public string Name { get; set; }
            public string Avatar { get; set; }
        }

        [HttpGet("messages/{id}")]
        public async Task<ActionResult<ResultModel<List<MessagesData>>>> GetMessages(int id)
        {
            Dialog dialog = await _context.Dialogs.Where(d => d.firstUserID == id && d.secondUserID.ToString() == User.Identity.Name || d.secondUserID == id && d.firstUserID.ToString() == User.Identity.Name || d.firstUserID == id && d.secondUserID == id).FirstOrDefaultAsync();
            if (dialog == null)
                return new ResultModel<List<MessagesData>> { ResultCode = 1, Messages = "This dialog does not exist" };
            List<Message> messages = await _context.Messages.Where(m => m.DialogId == dialog.Id).ToListAsync();
            List<MessagesData> datas = new List<MessagesData>();
            foreach (Message message in messages)
            {
                Users user = await _context.Users.Include(p => p.Photo).FirstOrDefaultAsync(u => u.Id == message.UserId);
                datas.Add(new MessagesData
                {
                    Id = message.Id,
                    Message = message.Content,
                    From = User.Identity.Name == message.UserId.ToString() ? "im" : "comp",
                    Name = user.Name,
                    Avatar = user.Photo.FilePath
                });
            }

            return new ResultModel<List<MessagesData>> { ResultCode = 0, Data = datas };
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
        public async Task<ActionResult<ResultModel<string>>> PostNewMessage(Message message)
        {
                message.Dialog = await _context.Dialogs.Where(d => d.firstUserID == message.DialogId && d.secondUserID == message.UserId || d.firstUserID == message.UserId && d.secondUserID == message.DialogId).FirstOrDefaultAsync();
            
            if(message.Dialog == null)
                return new ResultModel<string> { ResultCode = 10, Messages = "Dialog does not exist" };

            if (message.UserId != message.Dialog.firstUserID && message.UserId != message.Dialog.secondUserID)
                return new ResultModel<string> { ResultCode = 1, Messages = "Wrong user" };

            message.DateCreated = DateTime.Now;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return new ResultModel<string> { ResultCode = 0, Data = message.Content };
        }
    }
}
