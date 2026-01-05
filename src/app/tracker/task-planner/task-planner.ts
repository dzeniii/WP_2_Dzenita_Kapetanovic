import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-planner.html',
  styleUrls: ['./task-planner.css']
})
export class TaskPlanner {
  tasksDone: number = 0;

  saveTasks() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-task-${user}`, this.tasksDone.toString());
    alert('Saved!');
  }

  loadTasks() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-task-${user}`);
    if (saved) this.tasksDone = Number(saved);
  }

  ngOnInit() {
    this.loadTasks();
  }
}
