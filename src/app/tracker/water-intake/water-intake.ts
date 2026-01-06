import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WaterEntry {
  time: string;
  amount: number;
}

@Component({
  selector: 'app-water-intake',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './water-intake.html',
  styleUrls: ['./water-intake.css']
})
export class WaterIntake {
  waterAmount: number = 0;
  dailyIntake: WaterEntry[] = [];

  private user = localStorage.getItem('currentUserEmail') || 'guest';

  ngOnInit() {
    this.loadWater();
  }

  saveWater() {
    if (this.waterAmount <= 0) {
      alert('Unesite količinu vode!');
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const entry: WaterEntry = { time, amount: this.waterAmount };
    this.dailyIntake.push(entry);

    localStorage.setItem(`tracker-water-${this.user}`, JSON.stringify(this.dailyIntake));
    alert('Unos spremljen!');

    this.waterAmount = 0; // reset input
  }

  loadWater() {
    const saved = localStorage.getItem(`tracker-water-${this.user}`);
    if (saved) {
      this.dailyIntake = JSON.parse(saved);
    }
  }
}

