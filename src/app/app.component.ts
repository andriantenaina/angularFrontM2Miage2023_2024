import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { RegisterComponent } from "./user/register/register.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { User } from './user/user.model';
import { Auth } from './user/auth.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, MatButtonModule, MatDividerModule,
        MatIconModule, MatSlideToggleModule,MatToolbarModule,MatSelectModule,MatFormFieldModule,MatSidenavModule,MatListModule,
        AssignmentsComponent, RegisterComponent]
})
export class AppComponent implements OnInit {
  title = 'Application de gestion des assignments';
  loged = false
  constructor(private authService:AuthService,
              private assignmentsService: AssignmentsService,
              private router:Router) {}

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  
  log(){
    if(this.loged){
      this.authService.logOut();
      this.loged = false;
      this.router.navigate(['/login']);
    }
    else{
      this.loged = false;
      this.router.navigate(['/login']);
    }
  }
              
  ngOnInit(): void {
    let localToken = localStorage.getItem('token')
    let user!: User;
    if(localToken){
      this.loged = true;
      let auth = new Auth();
      auth.auth =true;
      auth.token = localToken;
      this.authService.verifyToken(auth).subscribe((user)=>{
        this.authService.userlogged = user;
      })
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  // login() {
  //   // on utilise le service d'autentification
  //   // pour se connecter ou se déconnecter
  //   if(!this.authService.loggedIn) {
  //     this.authService.logIn();
  //   } else {
  //     this.authService.logOut();
  //     // on navigue vers la page d'accueil
  //     this.router.navigate(['/home']);
  //   }
  // }

  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */

    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });
  }
}
