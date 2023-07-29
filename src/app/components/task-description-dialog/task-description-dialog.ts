// task-description-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-description-dialog',
  templateUrl: './task-description-dialog.html',
})
export class TaskDescriptionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public description: string) {}
}
