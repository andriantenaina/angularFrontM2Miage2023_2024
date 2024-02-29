import { AssignmentsService } from './../shared/assignments.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";


@Component({
  selector: 'app-assignments',
  standalone: true,
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  imports: [CommonModule, RenduDirective, MatListModule, AssignmentDetailComponent, AddAssignmentComponent, MatButtonModule]
})
export class AssignmentsComponent {
  titre = "Mon application sur les Assignments !";

  formVisuble = false;

  assignments: Assignment[] = [];
  assignmentSelectionner: Assignment | undefined;

  constructor(private assignmentsService: AssignmentsService) { }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    this.getAssignmentFromService();
  }

  getAssignmentFromService() {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
      console.log('Données arrivées');
    });
    console.log('Requête envoyée');
  }

  assignmentClique(assignement: Assignment) {
    console.log("assignment clique : " + assignement.nom);

    this.assignmentSelectionner = assignement;
  }

  onAddAssignmentBtnClick() {
    this.formVisuble = true;
  }

  ajouteAssignment(event: Assignment) {

    this.assignmentsService.AddAssignment(event).subscribe((reponse)=>{
      console.log(reponse);
      this.formVisuble=false;
    })

    // this.assignments.push(event);
    // this.formVisuble = false;
  }
  onDeletAssignment() {
    if (this.assignmentSelectionner) {
      let pos = this.assignments.indexOf(this.assignmentSelectionner);
      this.assignments.splice(pos, 1);
      this.assignmentSelectionner = undefined;
    }
  }
}
