namespace DoToApp.DTO
{
    public partial class TaskToAddDTO
    {
        public string? TaskName { get; set; }
        public string? TaskDesc { get; set; }
        public DateTime? CreateOn { get; set; }
        public int UserId { get; set; }
    }
}
