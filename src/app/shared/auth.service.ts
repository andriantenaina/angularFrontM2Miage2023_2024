import { Auth } from '../user/auth.model';
import { User } from './../user/user.model';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private logService:LoggingService,
    private http:HttpClient) { }

  uri = 'https://assignementback.onrender.com/api/auth';

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;
  token = undefined;
  userlogged!:User | undefined;

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn(user:User) {
    //this.assignments.push(assignment);
    this.logService.log(user.email, "connection");
    //return of("Assignment ajouté avec succès");
    this.loggedIn = true;
    let result = this.http.post<Auth>(this.uri+"/login", user);
    result.subscribe((data)=>{
      localStorage.setItem('token',data.token);
      this.verifyToken(data).subscribe((user)=>{
        this.userlogged = user;
      })
    })
    return result;
  }

  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
    this.userlogged = undefined;
    localStorage.removeItem('token');
  }

  verifyToken(auth: Auth){
    this.logService.log(auth.token, "verifier");
    return this.http.get<User>(this.uri+"/me",{headers:{'Authorization':`Bearer ${auth.token}`}});
  }
  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()

  isAllowed(role:String[]){
    console.log(role);
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...

      if(this.userlogged?.status && role.includes(this.userlogged?.status)){
        resolve(true);
      }else{
        resolve(false);
      }
      // pas de cas d'erreur ici, donc pas de reject
    });
    return promesse;
  }

  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      if(this.userlogged?.status == "admin"){
        resolve(true);
      }else{
        resolve(false);
      }
      // pas de cas d'erreur ici, donc pas de reject
    });
    return promesse;
  }

  isStudent(){
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      if(this.userlogged?.status == "student"){
        resolve(true);
      }else{
        resolve(false);
      }
      // pas de cas d'erreur ici, donc pas de reject
    });
    return promesse;
  }

  isProf(){
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      if(this.userlogged?.status == "prof"){
        resolve(true);
      }else{
        resolve(false);
      }
      // pas de cas d'erreur ici, donc pas de reject
    });
    return promesse;
  }
}
