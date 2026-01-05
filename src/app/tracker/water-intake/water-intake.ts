import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-water-intake',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './water-intake.html',
  styleUrls: ['./water-intake.css']
})
export class WaterIntake {
  waterAmount: number = 0;

  saveWater() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-water-${user}`, this.waterAmount.toString());
    alert('Saved!');
  }

  loadWater() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-water-${user}`);
    if (saved) this.waterAmount = Number(saved);
  }

  ngOnInit() {
    this.loadWater();
  }
}
