import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habit-tracker.html',
  styleUrls: ['./habit-tracker.css']
})
export class HabitTracker {
  habits: { name: string; done: boolean }[] = [
    { name: 'Čitanje', done: false },
    { name: 'Meditacija', done: false },
    { name: 'Vježbanje', done: false },
    { name: 'Hodanje', done: false },
    { name: 'Planiranje dana', done: false },
    { name: 'Učenje', done: false }
  ];

  get completedCount() {
    return this.habits.filter(h => h.done).length;
  }

  toggleHabit(index: number) {
    this.habits[index].done = !this.habits[index].done;
    this.saveHabits();
    this.saveHistory();
  }

  addHabit(name: string) {
    if (!name.trim()) {
      alert('Unesi naziv navike!');
      return;
    }
    this.habits.push({ name, done: false });
    this.saveHabits();
  }

  saveHabits() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-habits-${user}`, JSON.stringify(this.habits));
  }

  loadHabits() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-habits-${user}`);
    if (saved) {
      this.habits = JSON.parse(saved);
    }
  }

  saveHistory() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const date = new Date().toLocaleDateString('bs-BA'); // format: 7.1.2026
    const key = `tracker-history-${user}`;

    const history = JSON.parse(localStorage.getItem(key) || '[]');

    const todayRecord = {
      date,
      completed: this.habits.filter(h => h.done).map(h => h.name)
    };

    const existingIndex = history.findIndex((r: any) => r.date === date);
    if (existingIndex !== -1) {
      history[existingIndex] = todayRecord;
    } else {
      history.push(todayRecord);
    }

    localStorage.setItem(key, JSON.stringify(history));
  }

  getHistory() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const key = `tracker-history-${user}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  ngOnInit() {
    this.loadHabits();
  }
  selectedHabit: string | null = null;
history: { date: string; completed: string[] }[] = [];

selectHabit(name: string) {
  const user = localStorage.getItem('currentUserEmail') || 'guest';
  const key = `tracker-history-${user}`;
  this.history = JSON.parse(localStorage.getItem(key) || '[]');
  this.selectedHabit = name;
}
}
