namespace DoToApp.DTO
{
    public partial class TaskToEditDTO
    {
        public Guid TaskGuid { get; set; }
        public string? TaskName { get; set; }
        public string? TaskDesc { get; set; }
    }
}
