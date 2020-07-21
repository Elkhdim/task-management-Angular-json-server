import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService : TaskService ) { }
  editForm = false;
  showForm = false;
  searchText = '';
  tasks : Task[] = [];
  resultTasks : Task[] = [];
  myTask : Task = {
    label : '',
    complated : false
  }
  getTask = () => {
    this.taskService.findAll()
      .subscribe(tasks => {
        this.resultTasks = this.tasks = tasks
      })
  }


  ngOnInit() {
    this.getTask();
  }

  deleteTask = (id) => {
    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id != id)
        console.log("Delete has benn succed")
      });
  }

  persistTask = () => {
    this.taskService.persist(this.myTask)
      .subscribe((task) => {
        this.tasks = [task,...this.tasks]
        this.resetTask();
        this.showForm = true;
      })
  }

  resetTask = () => {
    this.myTask = {
      label : '',
      complated : false
    }
  }

  toggleComplated = (task) => {
    this.taskService.complated(task.id,task.complated)
      .subscribe(() => {
        task.complated = !task.complated
      })
  }

  editTask = (task) => {
    this.myTask = task
    this.editForm = true;
  }

  updateTask = () => {
    this.taskService.update(this.myTask)
      .subscribe(task => {
        this.resetTask();
        //this.editForm = false;
      })
  }

  searchTasks = () => {
    this.resultTasks = this.tasks.filter((task)=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }

}
