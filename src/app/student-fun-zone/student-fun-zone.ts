import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Quiz } from './quiz/quiz';
import { Bingo } from './bingo/bingo';
import { Whiteboard } from './whiteboard/whiteboard';
import { Kanban } from './kanban/kanban';
import { VisionBoard } from './vision-board/vision-board';
import { CommonModule } from '@angular/common';

export const funRoutes: Routes = [
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  { path: 'quiz', component: Quiz },
  { path: 'bingo', component: Bingo },
  { path: 'whiteboard', component: Whiteboard },
  { path: 'kanban', component: Kanban },
  { path: 'vision-board', component: VisionBoard }
];

@Component({
  selector: 'app-student-fun-zone',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './student-fun-zone.html',
  styleUrls: ['./student-fun-zone.css']
})
export class StudentFunZone {}
