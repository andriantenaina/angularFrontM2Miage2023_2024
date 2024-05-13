import { Auth } from './auth.model';
import { User } from './../user.model';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,MatIconModule,MatTooltipModule,MatButtonModule, MatInputModule,MatCardModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  value = 'Clear me';
  email = '';
  password = undefined;

  constructor(private authService:AuthService,
    private router:Router) {}


  login(event: any) {
    if((this.email == '') || (this.password === undefined)) return;
    let user = new User();
    user.email = this.email;
    user.password = this.password;
    
    // let auth = new Auth()
    // auth.auth=true;
    // auth.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzhjMmFlZWRlZWI3YmRhYzQ0NTk3ZSIsImlhdCI6MTcxNTU5NjE3NiwiZXhwIjoxNzE1NjgyNTc2fQ.NhJEs0g6GSKKDteROPM2J6JD9zKviYFFJ4Xp76SV2aQ";
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    if(!this.authService.loggedIn) {
      this.authService.logIn(user)
      .subscribe((reponse) => {
        if(reponse.auth){
          this.authService.loggedIn = true;
          this.authService.verifyToken(reponse)
          .subscribe((user)=>{
            console.log("user "+user.name+" connecter");
            this.authService.userlogged = user;
          })
        }
       // On navigue pour afficher la liste des assignments
       // en utilisant le router de manière programmatique
        this.router.navigate(['/home']);
      });
    } else {
      // this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

}
