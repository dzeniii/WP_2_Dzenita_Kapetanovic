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
  habitsDone: number = 0;

  saveHabits() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-habit-${user}`, this.habitsDone.toString());
    alert('Saved!');
  }

  loadHabits() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-habit-${user}`);
    if (saved) this.habitsDone = Number(saved);
  }

  ngOnInit() {
    this.loadHabits();
  }
}

