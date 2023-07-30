import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { Task } from '../Interface/task';
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

  private getUserIdFromLocalStorage(): string | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.uid;
  }

  getTasks(): Observable<Task[]> {
    const userId = this.getUserIdFromLocalStorage();
    if (userId) {
      return this.afs
        .collection<Task>('task', (ref) => ref.where('userId', '==', userId))
        .valueChanges();
    } else {
      return new Observable<Task[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
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
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  addTask(task: Task): Observable<any> {
    return new Observable((observer) => {
      const userId = this.getUserIdFromLocalStorage();
      if (userId) {
        task.userId = userId;
        this.tasksCollection
          .add(task)
          .then((result) => {
            observer.next(result);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      } else {
        observer.error(new Error('User is not authenticated'));
      }
    });
  }

  updateTask(taskId: string, updatedTask: Task): Observable<void> {
    const userId = this.getUserIdFromLocalStorage();
    updatedTask.userId = userId;
    return from(this.tasksCollection.ref.where('id', '==', taskId).get()).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const documentRef = querySnapshot.docs[0].ref;
          return from(documentRef.update(updatedTask));
        } else {
          return new Observable<void>((observer) => {
            observer.error(new Error('Task not found'));
          });
        }
      }),
      catchError((error) => {
        this.showErrorSnackbar(error);
        throw error;
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return from(this.tasksCollection.ref.where('id', '==', taskId).get()).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const documentRef = querySnapshot.docs[0].ref;
          return from(documentRef.delete());
        } else {
          return throwError(() => new Error('Task not found'));
        }
      }),
      catchError((error) => {
        this.showErrorSnackbar(error);
        return throwError(() => error);
      })
    );
  }
}
