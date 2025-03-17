using System.ComponentModel.DataAnnotations;

namespace ApplicationProgressTracker.Model.Database
{
    public class Application
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ApplicationName { get; set; }
        public int? ProgressStatusId { get; set; }
        public string? Description { get; set; }

        public virtual ProgressStatus ProgressStatus { get; set; }
    }
}
