import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { MatiereService } from '../../services/matiere.service';
import { AuthService } from '../../shared/auth.service';
import {MatStepperModule} from '@angular/material/stepper';
import { ToolComponent } from '../../toolbar/app.toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToolComponent,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  therdFormGroup = this._formBuilder.group({
    therdCtrl: ['', Validators.required],
  });
  
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


  constructor(private assignmentsService: AssignmentsService,private matiereService: MatiereService,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
              private router:Router) {}


  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe((data)=>{
      this.matieres = data.docs;
    })
  }
  
  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  onSubmit(event: any) {
    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();
    let error = false;
    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    // nouvelAssignment.matiere = this.matieres.at(this.index_matiere_selected);
    let id_matiere = this.matieres.at(this.index_matiere_selected)?._id;
    if(id_matiere){
      nouvelAssignment.id_matiere = id_matiere;
    }
    if (this.authService.userlogged && this.authService.userlogged._id) {
      nouvelAssignment.id_user = this.authService.userlogged._id;
    }else{
      error=true;
      this.router.navigate(['/login'])
    }


    // console.log(nouvelAssignment);

    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    if(!error){
      this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
        // On navigue pour afficher la liste des assignments
        // en utilisant le router de manière programmatique
        this.router.navigate(['/home']);
      });
    }
  }

}
