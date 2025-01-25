using DoToApp.DTO;

namespace DoToApp.Data._TaskRepositiory
{
    public class TaskRepositiory : ITaskRepository
    {
        private ApplicationDataContext _dataContext;

        public TaskRepositiory(ApplicationDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public TaskDTO GetSingleTask(int taskId)
        {
            var sql = $"SELECT * FROM TodoAppSchema.Tasks WHERE TaskId = {taskId}";
            var task = _dataContext.LoadDataSingle<TaskDTO>(sql);
            return task;
        }

        public IEnumerable<TaskDTO> GetTasks()
        {
            var sql = $"SELECT * FROM TodoAppSchema.Tasks";
            var tasks = _dataContext.LoadData<TaskDTO>(sql);
            return tasks;
        }
    }
}
