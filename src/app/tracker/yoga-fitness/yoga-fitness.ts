import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yoga-fitness',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './yoga-fitness.html',
  styleUrls: ['./yoga-fitness.css']
})
export class YogaFitness {
  fitnessMinutes: number = 0;

  saveFitness() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-fitness-${user}`, this.fitnessMinutes.toString());
    alert('Saved!');
  }

  loadFitness() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-fitness-${user}`);
    if (saved) this.fitnessMinutes = Number(saved);
  }

  ngOnInit() {
    this.loadFitness();
  }
}
