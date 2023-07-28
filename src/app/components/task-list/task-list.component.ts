import { Component, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/services/task';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  public dataSource: MatTableDataSource<Task>;
  public displayedColumns = ['title', 'description', 'dueDate', 'status', 'actions'];
  taskStatuses = ['Completed', 'Pending'];

  constructor(private taskService: TaskService) { }
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();


    this.tasks$.subscribe(tasks => {
      console.log(tasks);
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: any) {
    if (filterValue === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue ? 'true' : 'false';
    }
  }


  onDeleteTask(taskId: string): void {
    console.log('fff',taskId);
    this.taskService.deleteTask(taskId);
  }

}

