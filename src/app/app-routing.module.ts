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
      { path: 'student-fun-zone', component: StudentFunZone, children: funRoutes }
    ]
  },

  { path: '**', redirectTo: '' }
];
