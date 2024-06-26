import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { RenduDirective } from '../shared/rendu.directive';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card'
import { UsersService } from '../services/user.service';
import { MatiereService } from '../services/matiere.service';
import { FileUploadService } from '../services/file-upload.service';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { NoteComponent } from './note/note.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolComponent } from '../toolbar/app.toolbar.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  imports: [
    MatCardModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    ScrollingModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    ToolComponent,
    MatFormFieldModule,
    MatSelectModule
  ],
})
export class AssignmentsComponent implements OnInit {

  titre = 'Liste des assignments';
  // Pour la pagination
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  slide!:boolean

  // tableau des assignments POUR AFFICHAGE
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  assignments: Assignment[] = [];

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  // ici on injecte le service
  constructor(private assignmentsService: AssignmentsService,
    private authService:AuthService,
    private userService: UsersService,private matiereService: MatiereService,
    private imageService: FileUploadService,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private router:Router) {}

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  openDialog(assignment:Assignment) {
    this.dialog.open(NoteComponent,{ data : assignment } );
    }

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.getAssignmentsFromService();
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
          this.ngZone.run(() => {
            if (!this.hasNextPage) return;
            this.page = this.nextPage;
            this.getAssignmentsFromServicePourScrollInfini();
          });
      });
  }

  getAssignmentsFromService() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.assignments = data.docs;
        this.assignments.forEach(element => {
          this.userService.getUser(element.id_user).subscribe((user)=>{
            if(user){
              element.user = user;
            } 
          });
          this.matiereService.getMatiere(element.id_matiere).subscribe((matiere)=>{
            console.log(matiere);
            if(matiere){
              this.userService.getUser(matiere.id_user).subscribe((user)=>{
                if(user){
                  matiere.user = user;
                } 
              });
              if(matiere.image_name.includes("http")){
                matiere.image_name = matiere.image_name;
              }
              else{
                matiere.image_name = this.imageService.baseUrl+"/download/"+ matiere.image_name;
              }
              element.matiere = matiere;
            }
          })
        });
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  getAssignmentsFromServicePourScrollInfini() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.assignments = [...this.assignments, ...data.docs];
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  // Pour la pagination
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsFromService();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsFromService();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsFromService();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromService();
  }
}

const ELEMENT_DATA: Assignment[] = [
  {
    nom: 'Devoire sur la methode agile',
    dateDeRendu: new Date("2024-02-02"),
    rendu: true,
    id_user : '1',
    id_matiere: '1',
    note : 12,
    remarque : 'tres bien'
  },
  {
    nom: 'Devoire de Geographie(japon)',
    dateDeRendu: new Date("2024-02-02"),
    rendu: true,
    id_user : '1',
    id_matiere: '1',
    note : 12,
    remarque : 'tres bien'
  }
];
