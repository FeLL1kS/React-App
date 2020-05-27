using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly SNDBContext _context;

        public ProfilesController(SNDBContext context)
        {
            _context = context;
        }

        // GET: api/Profiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles()
        {
            List<Profile> profiles = await _context.Profiles.ToListAsync();
            foreach (Profile profile in profiles)
            {
                profile.Contacts = await _context.Contacts.FindAsync(profile.ContactsId);
                profile.User = await _context.Users.FindAsync(profile.UserId);
            }
            return profiles;
        }

        // GET: api/Profiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetProfile(int id)
        {
            Profile profile = (from p in _context.Profiles where p.UserId == id select p).FirstOrDefault();
            profile.Contacts = await _context.Contacts.FindAsync(profile.ContactsId);
            profile.User = await _context.Users.FindAsync(profile.UserId);

            if (profile == null)
            {
                return NotFound();
            }

            return profile;
        }

        // PUT: api/Profiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfile(int id, Profile profile)
        {
            Profile pr = (from p in _context.Profiles where p.UserId == id select p).FirstOrDefault();
            pr.LookingForAJob = profile.LookingForAJob;
            pr.LookingForAJobDesription = profile.LookingForAJobDesription;
            pr.FullName = profile.FullName;
            pr.Contacts = profile.Contacts;

            Contacts contacts = pr.Contacts;
            contacts.Id = (int)pr.ContactsId;

            _context.Profiles.Update(pr);
            _context.Contacts.Update(contacts);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(id))
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

        // POST: api/Profiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Profile>> PostProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfile", new { id = profile.Id }, profile);
        }

        // DELETE: api/Profiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Profile>> DeleteProfile(int id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();

            return profile;
        }

        private bool ProfileExists(int id)
        {
            return _context.Profiles.Any(e => e.Id == id);
        }
    }
}
