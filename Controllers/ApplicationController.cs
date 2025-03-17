using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ApplicationProgressTracker.Model.Database;
using ApplicationProgressTracker.Interfaces;
using AutoMapper;
using ApplicationProgressTracker.Model.Applications;

namespace ApplicationProgressTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IMapper _mapper;

        public ApplicationController(IApplicationService applicationService, IMapper mapper)
        {
            _applicationService = applicationService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromBody] ApplicationDto applicationDto)
        {
            try
            {
                var application = _mapper.Map<Application>(applicationDto);
                var response = await _applicationService.CreateApplicationAsync(application);
                if (response.Success)
                {
                    return Created("/api/application/" + response.CreatedObject, response.CreatedObject);
                }
                else
                {
                    throw new Exception("Unable to create Application.");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditApplication([FromRoute] int id, [FromBody] ApplicationDto applicationDto)
        {
            try
            {
                var application = _mapper.Map<Application>(applicationDto);
                if (id != applicationDto.Id)
                {
                    return BadRequest("Id mismatch");
                }
                var response = await _applicationService.EditApplicationAsync(application);
                if (response)
                {
                    return Ok();
                }
                else
                {
                    throw new Exception("Unable to edit Application.");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplicationById(int id)
        {
            try
            {
                var application = await _applicationService.GetApplicationByIdAsync(id);
                return Ok(application);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetApplications()
        {
            try
            {
                var applications = await _applicationService.GetApplicationsAsync();
                return Ok(applications);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

    
}
