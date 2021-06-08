import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 11, name: 'Running' },
      { id: 12, name: 'Cycling' },
      { id: 13, name: 'Zumba' },
      { id: 14, name: 'Aerobics' },
      { id: 15, name: 'Squats' },
      { id: 16, name: 'Yoga' },
      { id: 17, name: 'Pranayama' },
      { id: 18, name: 'Trekking' },
      { id: 19, name: 'Hiking' },
      { id: 20, name: 'Badminton' }
    ];
    return {tasks};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }
}