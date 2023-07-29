import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Task } from './task';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore/';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
    this.tasksCollection = this.afs.collection<Task>('task');
  }

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.valueChanges();
  }

  getTask(taskId: string): Observable<Task | null> {
    return from(this.tasksCollection.ref.where('id', '==', taskId).get()).pipe(
      map((querySnapshot) => {
        if (!querySnapshot.empty) {
          const task = querySnapshot.docs[0].data() as Task;
          return task;
        } else {
          return null;
        }
      })
    );
  }

  showErrorSnackbar(error: any) {
    this.snackBar.open(error, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  addTask(task: Task): Promise<any> {
    return this.tasksCollection.add(task);
  }

  updateTask(taskId: string, updatedTask: Task): Observable<void> {
    return new Observable<void>((observer) => {
      this.tasksCollection.ref
        .where('id', '==', taskId)
        .get()
        .then(async (querySnapshot) => {
          if (!querySnapshot.empty) {
            const documentRef = querySnapshot.docs[0].ref;
            try {
              await documentRef.update(updatedTask);
              observer.next();
              observer.complete();
            } catch (error) {
              observer.error(this.showErrorSnackbar(error));
            }
          } else {
            observer.complete();
          }
        })
        .catch((error) => {
          observer.error(this.showErrorSnackbar(error));
        });
    }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const querySnapshot = await this.tasksCollection.ref
        .where('id', '==', taskId)
        .get();
      if (!querySnapshot.empty) {
        const documentRef = querySnapshot.docs[0].ref;
        await documentRef.delete();
      }
    } catch (error) {
      throw error;
    }
  }
}
