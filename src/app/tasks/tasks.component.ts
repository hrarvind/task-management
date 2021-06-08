import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  selectedTask?: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.taskService.addTask({ name } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }
}
