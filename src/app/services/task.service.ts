import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { 

  }
  findAll = () => {
    return this.http.get<Task[]>("http://localhost:5000/tasks");
  }

  delete = (id) => {
    return this.http.delete(`http://localhost:5000/tasks/${id}`);
  }

  persist = (task) => {
      return this.http.post<Task>("http://localhost:5000/tasks",task)
  }

  complated = (id,complated) => {
    return this.http.patch(`http://localhost:5000/tasks/${id}`, {complated : !complated});
  }

  update = (task) => {
    return this.http.put(`http://localhost:5000/tasks/${task.id}`, task)
  }
}
