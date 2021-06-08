import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../task.service';

import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTask();
  }

  goBack(): void {
    this.location.back();
  }

  getTask():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
    .subscribe(task => this.task = task);
  }

  save(): void {
    if (this.task) {
      this.taskService.updateTask(this.task)
        .subscribe(() => this.goBack());
    }
  }

}
