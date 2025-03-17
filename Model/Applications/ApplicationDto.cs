using System.ComponentModel.DataAnnotations;

namespace ApplicationProgressTracker.Model.Applications
{
    public class ApplicationDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ApplicationName { get; set; }
        public int? ProgressStatusId { get; set; }
        public string? Description { get; set; }
    }
}
