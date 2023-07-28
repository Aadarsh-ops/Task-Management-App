import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from './task';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore/'; 



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private TasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) {
    this.TasksCollection = this.afs.collection<Task>('task');
  }

  getTasks(): Observable<Task[]> {
    return this.TasksCollection.valueChanges();
  }

  getTask(id: string): Observable<Task | null> {
    return this.TasksCollection.doc<Task>(id).valueChanges().pipe(
      map((task) => task || null) // Map undefined to null
    );
  }
  addTask(task: Task): Promise<any> {
    return this.TasksCollection.add(task);
  }

  updateTask(id: string, task: Task): Promise<void> {
    return this.TasksCollection.doc(id).update(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.TasksCollection.doc(id).delete();
  }
}
