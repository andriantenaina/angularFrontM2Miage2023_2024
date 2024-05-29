import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../../services/matiere.service';
import { Matiere } from '../../matiere/matiere.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-edit-assignment',
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
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  matieres : Matiere[] = [];
  // Pour les champs de formulaire
  nomAssignment = '';
  id_matiere = '';
  dateDeRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService:MatiereService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // on récupère l'id dans l'url
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      this.assignment = assignment;
      // on met à jour les champs du formulaire
      if (assignment !== undefined) {
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.id_matiere = assignment.id_matiere;
        this.matiereService.getMatiere(assignment.id_matiere).subscribe((matiere)=>{
          if(matiere){
            assignment.matiere = matiere;
          }
        })
      }
    });
    this.matiereService.getMatieres().subscribe((data)=>{
      this.matieres = data.docs;
    })
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.id_matiere = this.id_matiere;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
