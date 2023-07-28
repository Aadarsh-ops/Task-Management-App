import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
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

  updateTask(taskId: string, updatedTask: Task): Promise<void> {
    console.log(`Updating task with ID: ${taskId}`);
    return this.tasksCollection.ref
      .where('id', '==', taskId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const documentRef = querySnapshot.docs[0].ref;
          return documentRef
            .update(updatedTask)
            .then(() => {
              console.log(`Task with ID ${taskId} updated successfully.`);
            })
            .catch((error) => {
              console.error('Error updating task:', error);
              throw error; 
            });
        } else {
          console.log(`Task with ID ${taskId} not found.`);
          return Promise.resolve(); 
        }
      })
      .catch((error) => {
        console.error('Error querying task:', error);
        throw error; 
      });
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
