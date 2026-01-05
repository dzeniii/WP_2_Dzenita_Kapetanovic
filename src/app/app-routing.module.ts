import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Tracker} from './tracker/tracker';
import { StudentFunZone } from './student-fun-zone/student-fun-zone';
import { funRoutes } from './student-fun-zone/student-fun-zone';


export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },

  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'profile', component: Profile },
      { path: 'trackers', component: Tracker },
      { path: 'student-fun-zone', component: StudentFunZone, children: funRoutes }
    ]
  },

  { path: '**', redirectTo: 'profile' }
];

