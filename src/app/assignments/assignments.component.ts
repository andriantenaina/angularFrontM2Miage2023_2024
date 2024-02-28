import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Assignment } from './assignment.model';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,RenduDirective,FormsModule,MatInputModule,MatButtonModule ,MatDatepickerModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Mon application sur les Assignments !";
  nomAssignment = '';
  dateDeRendu = undefined;
  buttonActive = false;

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

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit(){
    // setTimeout(()=>{
    //   this.buttonActive = true;
    // },2000);
  }

  onSubmit(event: any){

    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignments.push(nouvelAssignment);
  }
}
