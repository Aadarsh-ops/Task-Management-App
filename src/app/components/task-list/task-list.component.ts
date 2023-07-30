import { Component, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/Interface/task';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TruncatePipe } from 'src/app/shared/services/truncate.pipe';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TruncatePipe],
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  public parentMarkerPosition: google.maps.LatLngLiteral[] | null = [];
  public displayedColumns = [
    'title',
    'description',
    'dueDate',
    'status',
    'actions',
  ];
  taskStatuses = ['Completed', 'Pending'];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
    this.tasks$.subscribe((tasks) => {
      tasks.forEach((task) => {
        if (task.markerPosition) {
          this.parentMarkerPosition.push(task.markerPosition);
        }
      });

      this.dataSource.data = tasks; 
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
  handleMarkerPositionChange(task: Task) {
    this.parentMarkerPosition = [task.markerPosition];
  }
  showMarkerPosition(task: Task): void {
  
    if (
      task.markerPosition &&
      task.markerPosition.lat != null &&
      task.markerPosition.lng != null
    ) {
    } else {
      this.snackBar.open('Location is not available for this task', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  showDescriptionDialog(description: string): void {
    this.dialog.open(TaskDescriptionDialogComponent, {
      data: description,
      width: '400px', 
    });
  }

  onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.snackBar.open('Task deleted successfully', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
      (error) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
}
