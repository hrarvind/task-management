import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /* GET tasks by name contains search term */
  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty task array.
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found tasks matching "${term}"`) :
        this.log(`no tasks matching "${term}"`)),
      catchError(this.handleError<Task[]>('searchTasks', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }
}
