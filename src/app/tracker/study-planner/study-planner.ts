import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-study-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-planner.html',
  styleUrls: ['./study-planner.css']
})
export class StudyPlanner {
  studyHours: number = 0;

  saveStudy() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    localStorage.setItem(`tracker-study-${user}`, this.studyHours.toString());
    alert('Saved!');
  }

  loadStudy() {
    const user = localStorage.getItem('currentUserEmail') || 'guest';
    const saved = localStorage.getItem(`tracker-study-${user}`);
    if (saved) this.studyHours = Number(saved);
  }

  ngOnInit() {
    this.loadStudy();
  }
}
