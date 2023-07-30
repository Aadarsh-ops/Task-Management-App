import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/Interface/task';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  taskForm: FormGroup;
  parentMarkerPosition: google.maps.LatLngLiteral | null = null;
  minDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initTaskForm();
  }

  handleMarkerPositionChange(newPosition: google.maps.LatLngLiteral | null) {
    this.parentMarkerPosition = newPosition;
    this.taskForm.patchValue({ markerPosition: newPosition });
  }

  private initTaskForm() {
    this.taskForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      dueDate: [null, [Validators.required]],
      markerPosition: [''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: uuidv4(),
        ...this.taskForm.value,
        completed: false,
      };
      this.taskService.addTask(newTask);
      this.taskService.addTask(newTask).subscribe(
        () => {
          this.router.navigate(['/task-list']);
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

  resetForm() {
    this.taskForm.reset();
  }
}
