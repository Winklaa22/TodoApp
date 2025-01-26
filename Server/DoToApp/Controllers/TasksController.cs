﻿using DoToApp.Data;
using DoToApp.DTO;
using Microsoft.AspNetCore.Mvc;

namespace DoToApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private ApplicationDataContext _dataContext;

        public TasksController(IConfiguration config)
        {
            _dataContext = new ApplicationDataContext(config);
        }

        [HttpGet("GetSingleTask")]
        public TaskDTO GetSingleTask(string taskGuid)
        {
            var sql = $"SELECT * FROM TodoAppSchema.Tasks WHERE TaskGuid = '{taskGuid}'";
            var task = _dataContext.LoadDataSingle<TaskDTO>(sql);
            return task;
        }

        [HttpGet("GetTasks")]
        public IEnumerable<TaskDTO> GetTasks()
        {
            var sql = $"SELECT * FROM TodoAppSchema.Tasks";
            var tasks = _dataContext.LoadData<TaskDTO>(sql);
            return tasks;
        }

        [HttpPost("AddTask")]
        public IActionResult AddTask(TaskToAddDTO task)
        {
            var sql = $@"INSERT INTO TodoAppSchema.Tasks (
                            TaskName, 
                            IconName, 
                            TaskDesc
                        ) VALUES (
                            '{task.TaskName}', 
                            '{task.IconName}', 
                            '{task.TaskDesc}')";

            if (_dataContext.ExecuteSql(sql))
                return Ok();

            throw new Exception("Failed to add task");
        }

        [HttpDelete("DeleteTask")]
        public IActionResult DeleteTask(string taskGuid)
        {
            var sql = $"DELETE FROM TodoAppSchema.Tasks WHERE TaskGuid = '{taskGuid}'";

            if (_dataContext.ExecuteSql(sql))
                return Ok();

            throw new Exception("Failed to delete task");
        }

        [HttpPut("UpdateTask")]
        public IActionResult UpdateTask(TaskDTO task)
        {
            var sql = $@"UPDATE TodoAppSchema.Tasks SET 
                            TaskName = '{task.TaskName}', 
                            IconName = '{task.IconName}', 
                            TaskDesc = '{task.TaskDesc}', 
                            IsCompleted = '{task.IsCompleted}'
                        WHERE TaskGuid = '{task.TaskGuid}'";

            if (_dataContext.ExecuteSql(sql))
                return Ok();

            throw new Exception("Failed to edit task");
        }

        [HttpPut("EditTaskIsComplete")]
        public IActionResult EditTaskIsComplete(string taskGuid, bool isCompleted)
        {
            var sql = $@"UPDATE TodoAppSchema.Tasks SET 
                        IsCompleted = '{isCompleted}'
                    WHERE TaskGuid = '{taskGuid}'";
            if (_dataContext.ExecuteSql(sql))
                return Ok();
            throw new Exception("Failed to edit task");
        }
    }
   
}


