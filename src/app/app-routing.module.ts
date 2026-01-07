import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Tracker } from './tracker/tracker';
import { StudentFunZone, funRoutes } from './student-fun-zone/student-fun-zone';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Courses } from './courses/courses';
import { Schedule } from './schedule/schedule';
import { Contact } from './contact/contact';

// Tracker komponente
import { HabitTracker } from './tracker/habit-tracker/habit-tracker';
import { SleepTracker } from './tracker/sleep-tracker/sleep-tracker';
import { StudyPlanner } from './tracker/study-planner/study-planner';
import { YogaFitness } from './tracker/yoga-fitness/yoga-fitness';
import { TaskPlanner } from './tracker/task-planner/task-planner';
import { WaterIntake } from './tracker/water-intake/water-intake';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'courses', component: Courses },
  { path: 'schedule', component: Schedule },
  { path: 'contact', component: Contact },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'profile', component: Profile },
      { path: 'trackers', component: Tracker },
      { path: 'trackers/habit', component: HabitTracker },
      { path: 'trackers/sleep', component: SleepTracker },
      { path: 'trackers/study', component: StudyPlanner },
      { path: 'trackers/yoga', component: YogaFitness },
      { path: 'trackers/task', component: TaskPlanner },
      { path: 'trackers/water', component: WaterIntake },
      { path: 'student-fun-zone', component: StudentFunZone, children: funRoutes }
    ]
  },

  { path: '**', redirectTo: '' }
];
