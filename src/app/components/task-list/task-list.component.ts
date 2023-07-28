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


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();

    this.tasks$.subscribe(tasks => {
      console.log(tasks);
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.sort = this.sort;
    });
  }

  // onDeleteTask(taskId: string): void {
  //   console.log(taskId);
  //   this.taskService.deleteTask(taskId)
  //     .catch(error => console.error('Error deleting task:', error));
  // }
  onDeleteTask(taskId: string): void {
    console.log(taskId);
    from(this.taskService.deleteTask(taskId))
      .toPromise()
      .then(() => console.log('Task deleted successfully'))
      .catch(error => console.error('Error deleting task:', error));
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterStatus(filterValue: string) {
    if (filterValue === 'Completed' || filterValue === 'Pending') {
      this.dataSource.filterPredicate = (data: Task, filter: string) => {
        return data.completed.toString() === (filterValue === 'Completed').toString();
      };
    } else {
      this.dataSource.filterPredicate = (data: Task, filter: string) => {
        const dueDate = data.dueDate as any; // For handling either a Timestamp or Date
        return dueDate.toDate().toLocaleDateString().indexOf(filterValue) !== -1;
      };
    }
    this.dataSource.filter = filterValue.toLowerCase();
  }
}

