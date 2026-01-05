import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitTracker } from './habit-tracker/habit-tracker';
import { SleepTracker } from './sleep-tracker/sleep-tracker';
import { StudyPlanner } from './study-planner/study-planner';
import { YogaFitness } from './yoga-fitness/yoga-fitness';
import { TaskPlanner } from './task-planner/task-planner';
import { WaterIntake } from './water-intake/water-intake';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    CommonModule,
    HabitTracker,
    SleepTracker,
    StudyPlanner,
    YogaFitness,
    TaskPlanner,
    WaterIntake
  ],
  templateUrl: './tracker.html',
  styleUrls: ['./tracker.css']
})
export class Tracker {
  selectedTrackers: string[] = [];

  constructor() {
    const saved = localStorage.getItem('selectedTrackers');
    if (saved) {
      this.selectedTrackers = JSON.parse(saved);
    }
  }

  toggleTracker(tracker: string) {
    const index = this.selectedTrackers.indexOf(tracker);
    if (index > -1) {
      this.selectedTrackers.splice(index, 1);
    } else {
      this.selectedTrackers.push(tracker);
    }
    localStorage.setItem('selectedTrackers', JSON.stringify(this.selectedTrackers));
  }

  isSelected(tracker: string): boolean {
    return this.selectedTrackers.includes(tracker);
  }
}

