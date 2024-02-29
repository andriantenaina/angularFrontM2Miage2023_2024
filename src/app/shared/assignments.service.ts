import { Assignment } from './../assignments/assignment.model';
import { AddAssignmentComponent } from './../assignments/add-assignment/add-assignment.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments: Assignment[] = [
    {
      nom:"Devoir Angular de Michel Buffa",
      dateDeRendu: new Date("2024-02-15"),
      rendu:false
    },
    {
      nom:"Devoir SQL3 de Serge Miranda",
      dateDeRendu:new Date("2024-01-15"),
      rendu:true
    },
    {
      nom:"Devoir BD de Mr Gabriel Mopolo",
      dateDeRendu: new Date("2024-03-01"),
      rendu:false
    }
  ];
  
  constructor() { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  AddAssignment(assignment:Assignment):Observable<String>{
    this.assignments.push(assignment);
    return of("Assignment ajoute avec succes");
  }
} 
