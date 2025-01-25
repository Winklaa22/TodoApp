using DoToApp.DTO;

namespace DoToApp.Data._TaskRepositiory
{
    public interface ITaskRepository
    {
        public TaskDTO GetSingleTask(int taskId);
        public IEnumerable<TaskDTO> GetTasks();
    }
}
