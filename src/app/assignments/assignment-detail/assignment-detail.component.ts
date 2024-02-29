import { Assignment } from './../assignment.model';
import { Component, Input, Output, input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  @Input()
  assignmentTransmis: Assignment | undefined;
  @Output()
  deleteAssignment = new EventEmitter<Assignment>();
  assignmentRendu() {
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu=true;
    }
  }

  onDelete(){
    this.deleteAssignment.emit()
  } 
}
