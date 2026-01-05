import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: string;
  text: string;
  status: 'todo' | 'progress' | 'done';
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban implements OnInit {
  tasks: Task[] = [];
  showTaskModal = false;
  showClearModal = false;
  taskInput = '';
  draggedTask: Task | null = null;

  columns = [
    { status: 'todo', title: 'To Do' },
    { status: 'progress', title: 'In Progress' },
    { status: 'done', title: 'Done' }
  ] as const;

  ngOnInit() {
    this.loadBoard();
  }

  openTaskModal() {
    this.showTaskModal = true;
    this.taskInput = '';
  }

  closeTaskModal() {
    this.showTaskModal = false;
  }

  addTask() {
    const text = this.taskInput.trim();
    if (!text) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: text,
      status: 'todo'
    };

    this.tasks.push(newTask);
    this.closeTaskModal();
    this.saveBoard();
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveBoard();
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  onDragStart(task: Task) {
    this.draggedTask = task;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(status: string) {
    if (this.draggedTask) {
      this.draggedTask.status = status as 'todo' | 'progress' | 'done';
      this.draggedTask = null;
      this.saveBoard();
    }
  }

  saveBoard() {
    localStorage.setItem('kanbanBoard', JSON.stringify(this.tasks));
    alert('Kanban ploča je sačuvana!');
  }

  loadBoard() {
    const saved = localStorage.getItem('kanbanBoard');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  clearBoard() {
    this.showClearModal = true;
  }

  confirmClear() {
    this.tasks = [];
    this.showClearModal = false;
    localStorage.removeItem('kanbanBoard');
  }

  cancelClear() {
    this.showClearModal = false;
  }
}
