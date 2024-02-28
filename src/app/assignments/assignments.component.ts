import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule,RenduDirective],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Mon application sur les Assignments !"

  assignments = [
    {
      nom:"Devoir Angular de Michel Buffa",
      dateDeRendu: "2024-02-15",
      rendu:false
    },
    {
      nom:"Devoir SQL3 de Serge Miranda",
      dateDeRendu: "2024-01-15",
      rendu:true
    },
    {
      nom:"Devoir BD de Mr Gabriel Mopolo",
      dateDeRendu: "2024-03-01",
      rendu:false
    }
  ];
}
