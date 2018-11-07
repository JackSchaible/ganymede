using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities.Spells;
using api.ViewModels.Models.Spells;
using Api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SpellsController : ControllerBase
    {
        private readonly ApplicationDbContext _ctx;
        private readonly IMapper _mapper;

        public SpellsController(ApplicationDbContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        
        // GET: api/SpellModels
        [HttpGet]
        public IEnumerable<SpellModel> Get()
        {
            return _mapper.Map<List<SpellModel>>(_ctx.Spells.Where(x => x.User.Email == User.FindFirst("sub").Value));
        }

        [Route("GetAll")]
        public IEnumerable<SpellModel> GetAll()
        {
            return _mapper.Map<List<SpellModel>>(_ctx.Spells);
        }

        // GET: api/SpellModels/5
        [HttpGet("{id}", Name = "Get")]
        public SpellModel Get(int id)
        {
            return _mapper.Map<SpellModel>(_ctx.Spells.First(x => x.SpellID == id));
        }

        // POST: api/SpellModels
        [HttpPost]
        public void Post([FromBody] SpellModel value)
        {
            try
            {
                _ctx.Spells.Add(_mapper.Map<Spell>(value));
                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
                //TODO: Process error messages
            }
        }

        // PUT api/SpellModels
        [HttpPut]
        public void Put([FromBody] SpellModel value)
        {
            try
            {
                var old = _ctx.Spells.First(x => x.SpellID == value.SpellID);

                old = _mapper.Map<Spell>(value);

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
