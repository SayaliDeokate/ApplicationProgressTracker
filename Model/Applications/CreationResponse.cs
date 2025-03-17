namespace ApplicationProgressTracker.Model.Applications
{
    public class CreationResponse<T>
    {
        public bool Success { get; set; }
        public Uri AccessUrl { get; set; }
        public T CreatedObject { get; set; }
        public string Message { get; set; }
    }
}
