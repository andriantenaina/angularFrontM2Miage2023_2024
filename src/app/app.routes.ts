import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DetailsComponent } from './user/details/details.component';
import { MatiereComponent } from './matiere/matiere.component';
import { AddMatiereComponent } from './matiere/add-matiere/add-matiere.component';
import { profGuard } from './shared/prof.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard],
    data : {
      role : ['prof','admin']
    }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'matiere', component: MatiereComponent },
  { 
    path: 'matiere/add', component: AddMatiereComponent, 
    // canActivate:[authGuard],
    // data : {
    //   role : ['admin','prof']
    // }
  },
];
