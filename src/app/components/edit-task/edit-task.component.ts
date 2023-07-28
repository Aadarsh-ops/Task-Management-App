import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/services/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  taskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get('id');
      if (taskId) {
        this.taskService.getTask(taskId).subscribe((task) => {
          if (task) {
            this.taskForm.patchValue(task);
          } else {
            // Handle task not found error
          }
        });
      } 
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const taskId = this.route.snapshot.paramMap.get('id');
      this.taskService.updateTask(taskId, taskData).subscribe(
        () => {
          this.router.navigate(['/task-list']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/task-list']);
  }
}
