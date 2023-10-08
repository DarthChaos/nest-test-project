import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './TaskStatus';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDTO } from './DTO/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'Some Tasks.',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  createTasks(title: string, description: string) {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.PENDING,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  updateTasks(id: string, updatedFields: UpdateTaskDTO): Task {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, updatedFields);

    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));

    return newTask;
  }

  deleteTasks(id: string): Task {
    const deleted = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return deleted;
  }
}
