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
  sleepTime: string = '';
  wakeTime: string = '';
  sleepQuality: string = 'dobar';
  sleepHours: number = 0;
  history: { date: string, hours: number, quality: string }[] = [];

  constructor() {
    this.loadSleep();
  }

  calculateSleepHours() {
    if (!this.sleepTime || !this.wakeTime) return;

    const [sh, sm] = this.sleepTime.split(':').map(Number);
    const [wh, wm] = this.wakeTime.split(':').map(Number);

    let start = new Date();
    start.setHours(sh, sm, 0);

    let end = new Date();
    end.setHours(wh, wm, 0);

    if (end <= start) end.setDate(end.getDate() + 1);

    const diffMs = end.getTime() - start.getTime();
    this.sleepHours = +(diffMs / 1000 / 3600).toFixed(2);
  }

  saveSleep() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const today = new Date().toISOString().split('T')[0];

    let allData = JSON.parse(localStorage.getItem(`tracker-sleep-history-${user}`) || '[]');
    const index = allData.findIndex((entry: any) => entry.date === today);
    if (index > -1) {
      allData[index] = { date: today, hours: this.sleepHours, quality: this.sleepQuality };
    } else {
      allData.push({ date: today, hours: this.sleepHours, quality: this.sleepQuality });
    }

    localStorage.setItem(`tracker-sleep-history-${user}`, JSON.stringify(allData));
    this.history = allData;

    alert('Sleep data saved!');
  }

  loadSleep() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    this.history = JSON.parse(localStorage.getItem(`tracker-sleep-history-${user}`) || '[]');

    const today = new Date().toISOString().split('T')[0];
    const todayEntry = this.history.find(h => h.date === today);
    if (todayEntry) {
      this.sleepHours = todayEntry.hours;
      this.sleepQuality = todayEntry.quality;
    }
  }
}

