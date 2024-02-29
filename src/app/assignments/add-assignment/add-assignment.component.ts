import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,MatInputModule,MatButtonModule ,MatDatepickerModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  @Output()
  nouvelAssignment = new  EventEmitter();
  nomAssignment = '';
  dateDeRendu = undefined;

  onSubmit(event: any){

    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    // this.assignments.push(nouvelAssignment);
    this.nouvelAssignment.emit();
  }
}
