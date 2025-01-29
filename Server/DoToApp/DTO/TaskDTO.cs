namespace DoToApp.DTO
{
    public partial class TaskDTO
    {
        public Guid TaskGuid { get; set; }
        public string? TaskName { get; set; }
        public string? TaskDesc { get; set; }
        public DateTime? CreateOn { get; set; }
        public bool IsCompleted { get; set; }
    }
}
