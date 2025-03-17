using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ApplicationProgressTracker.Model.Database;
using ApplicationProgressTracker.Interfaces;
using Microsoft.CodeAnalysis;
using ApplicationProgressTracker.Model.Applications;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using AutoMapper;

namespace ApplicationProgressTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressStatusController : ControllerBase
    {
        private readonly IProgressStatusService _progressStatusService;
        private readonly IMapper _mapper;

        public ProgressStatusController(IProgressStatusService progressStatusService, IMapper mapper)
        {
            _progressStatusService = progressStatusService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProgressStatus([FromBody] ProgressStatusDto progressStatusDto)
        {
            try
            {
                var progressStatus = _mapper.Map<ProgressStatus>(progressStatusDto);
                var response = await _progressStatusService.CreateProgressStatusAsync(progressStatus);

                if (response.Success)
                {
                    return Created("/api/progressStatus/" + response.CreatedObject, response.CreatedObject);
                }
                else
                {
                    throw new Exception("Unable to create Progress Status.");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProgressStatus([FromRoute] int id, [FromBody] ProgressStatusDto progressStatusDto)
        {
            try
            {
                var progressStatus = _mapper.Map<ProgressStatus>(progressStatusDto);
                if (id != progressStatusDto.Id)
                {
                    throw new Exception("Id Mismatch");
                }

               // var progressStatus = _mapper.Map<ProgressStatus>(progressStatus);
                var response = await _progressStatusService.EditProgressStatusAsync(progressStatus);

                if (response)
                {
                    return NoContent();
                }
                else
                {
                    throw new Exception("Unable to update Category.");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgressStatusById(int id)
        {
            var response = await _progressStatusService.GetProgressStatusByIdAsync(id);

            if (response == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(response);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProgressStatus()
        {
            try
            {
                var result = await _progressStatusService.GetProgressStatusAsync();
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }

       
    }
}
