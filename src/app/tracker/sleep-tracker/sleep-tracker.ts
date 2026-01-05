import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sleep-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sleep-tracker.html',
  styleUrls: ['./sleep-tracker.css']
})
export class SleepTracker {
  sleepHours: number = 0;

  saveSleep() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-sleep-${user}`, this.sleepHours.toString());
    alert('Saved!');
  }

  loadSleep() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-sleep-${user}`);
    if (saved) this.sleepHours = Number(saved);
  }

  ngOnInit() {
    this.loadSleep();
  }
}
