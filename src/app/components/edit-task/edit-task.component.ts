import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/services/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomDateFormatPipe } from 'src/app/shared/services/coustom-date-dormat-pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

function timestampToDate(timestamp: number): string {
  const dateObj = new Date(timestamp);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return formattedDate;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  providers: [CustomDateFormatPipe],
})
export class EditTaskComponent {
  taskForm: FormGroup;
  parentMarkerPosition: google.maps.LatLngLiteral | null = null;
  formattedDueDate: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
    private customDateFormatPipe: CustomDateFormatPipe,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]], 
      description: ['', [Validators.required, Validators.maxLength(100)]],
      dueDate: ['', Validators.required],
      completed: [false],
      markerPosition: [''],
    });
  }

  handleMarkerPositionChange(newPosition: google.maps.LatLngLiteral | null) {
    this.parentMarkerPosition = newPosition;
    this.taskForm.patchValue({ markerPosition: newPosition }); 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get('id');
      if (taskId) {
        this.taskService.getTask(taskId).subscribe((task) => {
          if (task) {
            this.taskForm.patchValue(task);
            this.parentMarkerPosition = this.taskForm.get('markerPosition').value;
            this.taskForm.patchValue({
              dueDate: this.taskForm.get('dueDate').value
                ? this.customDateFormatPipe.transform(this.taskForm.get('dueDate').value, 'shortDate')
                : null,
            });
          }
        });
      } 
    });
  }
  

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const taskId = this.route.snapshot.paramMap.get('id');
      this.taskService.updateTask(taskId, taskData)
      this.router.navigate(['/task-list']);
  }
}
  

  cancelEdit(): void {
    this.router.navigate(['/task-list']);
  }
}
