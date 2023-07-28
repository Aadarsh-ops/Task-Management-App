import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/services/task';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private taskService: TaskService,private router: Router,) { }

  ngOnInit() {
    this.initTaskForm();
  }

  private initTaskForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: uuidv4(),
        ...this.taskForm.value,
        completed: false // New tasks are not completed by default
      };
      this.taskService.addTask(newTask)
      .then(()=> this.router.navigate(['/task-list']))
      .catch((error) => {
        console.error('Error adding product:', error);
      });
    }
  }

  resetForm() {
    this.taskForm.reset();
  }
}
