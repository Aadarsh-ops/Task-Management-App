import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Task } from './task';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) {
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
              console.log(`Task with ID ${taskId} updated successfully.`);
              observer.next(); // Emit a value to the observer (success).
              observer.complete(); // Complete the observable.
            } catch (error) {
              console.error('Error updating task:', error);
              observer.error(error); // Emit an error to the observer.
            }
          } else {
            console.log(`Task with ID ${taskId} not found.`);
            observer.complete(); // Complete the observable since there is no task to update.
          }
        })
        .catch((error) => {
          console.error('Error querying task:', error);
          observer.error(error); // Emit an error to the observer.
        });
    }).pipe(
      catchError((error) => {
        // Handle errors that may occur in the observable chain (optional).
        console.error('Error in updateTask observable:', error);
        throw error; // Rethrow the error to propagate it to the subscriber (component).
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
        console.log(`Task with ID ${taskId} deleted successfully.`);
      } else {
        console.log(`Task with ID ${taskId} not found.`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}