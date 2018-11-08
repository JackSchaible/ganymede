using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities.Spells;
using api.Errors;
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
	    private Dictionary<string, ApiError> _errors = new Dictionary<string, ApiError>
	    {
		    { "UnknownError", new ApiError("Unknown", "API_ERR_UNK")}
	    };

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
        public object Post([FromBody] SpellModel value)
        {
	        Spell newSpell = null;
            try
            {
                newSpell = _ctx.Spells.Add(_mapper.Map<Spell>(value)).Entity;
                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
	            ApiError err;
	            if (_errors.ContainsKey(e.Message))
		            err = _errors[e.Message];
				else
					err = _errors["UnknownError"];

				return new { error = err };

				//TODO: Process error messages
			}

	        return newSpell.SpellID;
		}

        // PUT api/SpellModels
        [HttpPut]
        public object Put([FromBody] SpellModel value)
        {
	        Spell old = null;
            try
            {
                old = _ctx.Spells.First(x => x.SpellID == value.SpellID);

                old = _mapper.Map<Spell>(value);

                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
	            return new { error = _errors["InvalidPassword"] };
				//TODO: Process error messages
			}

	        return old;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public object Delete(int id)
        {
            try
            {
                _ctx.Spells.Remove(_ctx.Spells.First(x => x.SpellID == id));
                _ctx.SaveChanges();
            }
            catch (Exception e)
            {
	            return new { error = _errors["InvalidPassword"] };
				//TODO: Process error messages here, too
			}

	        return true;
		}
    }
}
