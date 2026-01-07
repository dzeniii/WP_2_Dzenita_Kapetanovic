import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitTracker } from './habit-tracker/habit-tracker';
import { SleepTracker } from './sleep-tracker/sleep-tracker';
import { StudyPlanner } from './study-planner/study-planner';
import { YogaFitness } from './yoga-fitness/yoga-fitness';
import { TaskPlanner } from './task-planner/task-planner';
import { WaterIntake } from './water-intake/water-intake';

interface TrackerItem {
  name: string;
  image: string;
  component: any; 
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./tracker.html' ,
  styleUrls: ['./tracker.css']
})
export class Tracker {
  trackers: TrackerItem[] = [
    { name: 'Habit Tracker', image: 'assets/slike/habit.png', component: HabitTracker },
    { name: 'Sleep Tracker', image: 'assets/slike/sleep.png', component: SleepTracker },
    { name: 'Study Planner', image: 'assets/slike/school.png', component: StudyPlanner },
    { name: 'Yoga / Fitness', image: 'assets/slike/yoga.png', component: YogaFitness },
    { name: 'Task / Project', image: 'assets/slike/tasks.png', component: TaskPlanner },
    { name: 'Water Intake', image: 'assets/slike/water.png', component: WaterIntake },
  ];

  selectedTracker: any = null;

  selectTracker(tracker: TrackerItem) {
    this.selectedTracker = tracker.component;
  }
}

