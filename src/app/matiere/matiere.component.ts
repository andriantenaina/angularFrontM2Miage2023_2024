import { Component, NgZone, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Matiere } from './matiere.model';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatiereService } from '../services/matiere.service';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { FileUploadService } from '../services/file-upload.service';
import { UsersService } from '../services/user.service';
import { ToolComponent } from '../toolbar/app.toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matiere',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatTableModule, MatButtonModule, RouterModule, MatIconModule, MatPaginatorModule, ScrollingModule, ToolComponent, MatFormFieldModule, MatSelectModule, MatSidenavModule,MatListModule,MatToolbarModule],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['code', 'nom'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Matiere | null;

  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  matieres: Matiere[] = [];

  constructor(private matiereService: MatiereService,private router: Router,private imageService: FileUploadService, private userService: UsersService,private authService:AuthService,
    private ngZone: NgZone) { }

  ngOnInit() {
    console.log('ngOnInit matiere, appelée AVANT affichage du composant');
    this.getMatiereFromService();
  }
  
  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
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
        console.log('On demande de nouveaux matiere');
        // on va faire une requête pour demander les matiere suivants
        // et on va concatener le resultat au tableau des matiere courants
        console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;
          this.page = this.nextPage;
          this.getMatiereFromServicePourScrollInfini();
        });
      });
  }

  getMatiereFromService() {
    // on récupère les matiere depuis le service
    this.matiereService
      .getMatieresPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.matieres = data.docs;
        this.matieres.forEach(element => {
          element.image_name = this.imageService.baseUrl + "/download/" + element.image_name;
          this.userService.getUser(element.id_user).subscribe((user) => {
            element.user = user;
          })
          // console.log(element);
          // this.imageService.getFile(element.image_name).subscribe((dataImage)=>{
          //   element.image_name = dataImage;
          // })
        });
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        console.log(this.matieres);
      });
    console.log('Requête envoyée');
  }

  getMatiereFromServicePourScrollInfini() {
    // on récupère les matiere depuis le service
    this.matiereService
      .getMatieresPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps

        console.log('Données arrivées');
        this.matieres = [...this.matieres, ...data.docs];
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
    this.getMatiereFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getMatiereFromService();
  }

  premierePage() {
    this.page = 1;
    this.getMatiereFromService();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getMatiereFromService();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getMatiereFromService();
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   description: string;
// }
const ELEMENT_DATA: Matiere[] = [
  {
    code: '001',
    nom: 'Base de données',
    description: 'matiere base de donnees',
    id_user: '1',
    image_name: location.protocol + "//" + location.host + '/assets/mg.png'
  },
  {
    code: '002',
    nom: 'Technologies Web',
    description: 'matiere Technologies Web',
    id_user: '1',
    image_name: 'mg.jpeg'
  },
  {
    code: '003',
    nom: 'Grails',
    description: 'matiere Grails',
    id_user: '1',
    image_name: 'mg.jpeg'
  }
];
