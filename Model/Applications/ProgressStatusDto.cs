using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApplicationProgressTracker.Model.Applications
{
    public class ProgressStatusDto
    {
        [Required]
        public int Id { get; set; }
        public string? ProgressStatusName { get; set; }
        public bool? IsActive { get; set; }
     
    }
}

