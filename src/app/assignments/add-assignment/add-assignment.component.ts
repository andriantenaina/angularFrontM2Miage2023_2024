import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { Matiere } from '../../matiere/matiere.model';
import {MatSelectModule} from '@angular/material/select';


// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;
  index_matiere_selected!:number;
  matiere!:Matiere;

  matieres: Matiere[] = [
    // {
    //   nom: 'matiere 1',code:'001',description:'description matiere',image_name:'mg.png'
    // },
    // {
    //   nom: 'matiere 2',code:'002',description:'description matiere 2',image_name:'mg.png'
    // }
  ];

  // selectedFood: any;

  selectMatiere(event: Event) {
    this.matiere = this.matieres[this.index_matiere_selected];
    // this.index_matiere_selected = (event.target as HTMLSelectElement).value.;
  }


  constructor(private assignmentsService: AssignmentsService,
              private router:Router) {}

  onSubmit(event: any) {
    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();
    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = this.matieres.at(this.index_matiere_selected);

    console.log(nouvelAssignment);

    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    // this.assignmentsService
    //   .addAssignment(nouvelAssignment)
    //   .subscribe((reponse) => {
    //     console.log(reponse);
    //    // On navigue pour afficher la liste des assignments
    //    // en utilisant le router de manière programmatique
    //     this.router.navigate(['/home']);
    //   });
  }

}
