using System.ComponentModel.DataAnnotations;

namespace ApplicationProgressTracker.Model.Database
{
    public class ProgressStatus
    {
        [Required]
        public int Id { get; set; }
        public string? ProgressStatusName { get; set; }
        public bool? IsActive { get; set; }
    }
}
