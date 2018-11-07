using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities.Spells;
using Api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SpellsController : ControllerBase
    {
        private ApplicationDbContext _ctx;

        public SpellsController(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }
        
        // GET: api/Spells
        [HttpGet]
        public IEnumerable<Spell> Get()
        {
            return _ctx.Spells.Where(x => x.User.Email == User.FindFirst("sub").Value);
        }

        [Route("GetAll")]
        public IEnumerable<Spell> GetAll()
        {
            return _ctx.Spells;
        }

        // GET: api/Spells/5
        [HttpGet("{id}", Name = "Get")]
        public Spell Get(int id)
        {
            return _ctx.Spells.First(x => x.SpellID == id);
        }

        // POST: api/Spells
        [HttpPost]
        public void Post([FromBody] Spell value)
        {
            try
            {
                _ctx.Spells.Add(value);
                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
                //TODO: Process error messages
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                _ctx.Spells.Remove(_ctx.Spells.First(x => x.SpellID == id));
                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
                //TODO: Process error messages here, too
            }
        }
    }
}
