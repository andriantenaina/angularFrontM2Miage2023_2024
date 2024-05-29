import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from '../shared/logging.service';
import { HttpClient } from '@angular/common/http';

// importation des données de test
// import { bdInitialUsers } from './data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[] = [];

  constructor(private logService:LoggingService,
              private http:HttpClient) { }

  uri = 'https://assignementback.onrender.com/api/users';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/api/users";

  // retourne tous les users
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.uri);
  }

  getUsersPagines(page:number, limit:number):Observable<any> {
    return this.http.get<User[]>(this.uri + "?page=" + page + "&limit=" + limit);
  }

  // renvoie un user par son id, renvoie undefined si pas trouvé
  getUser(id:string):Observable<User|undefined> {
    return this.http.get<User>(this.uri + "/" + id)
    .pipe(
           catchError(this.handleError<any>('### catchError: getUsers by id avec id=' + id))
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
    //let a = this.users.find(a => a.id === id);
    //return of(a);
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  // ajoute un user et retourne une confirmation
  addUser(user:User):Observable<any> {
    //this.users.push(user);
    this.logService.log(user.name, "ajouté");
    //return of("User ajouté avec succès");
    return this.http.post<User>(this.uri, user);
  }

  updateUser(user:User):Observable<any> {
   // l'user passé en paramètre est le même objet que dans le tableau
   // plus tard on verra comment faire avec une base de données
   // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(user.name, "modifié");
    //return of("User modifié avec succès");
    return this.http.put<User>(this.uri, user);
  }

  deleteUser(user:User):Observable<any> {
    // on va supprimer l'user dans le tableau
    //let pos = this.users.indexOf(user);
    //this.users.splice(pos, 1);
    this.logService.log(user.name, "supprimé");
    //return of("User supprimé avec succès");
    return this.http.delete(this.uri + "/" + user._id);
  }

  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  // peuplerBD() {
  //   // on utilise les données de test générées avec mockaroo.com pour peupler la base
  //   // de données
  //   bdInitialUsers.forEach(a => {
  //     let nouvelUser = new User();
  //     nouvelUser.nom = a.nom;
  //     nouvelUser.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelUser.rendu = a.rendu;

  //     this.addUser(nouvelUser)
  //     .subscribe(() => {
  //       console.log("User " + a.nom + " ajouté");
  //     });
  //   });
  // }

  // peuplerBDavecForkJoin():Observable<any> {
  //   let appelsVersAddUser:Observable<any>[] = [];

  //   bdInitialUsers.forEach(a => {
  //     const nouvelUser = new User();
  //     nouvelUser.nom = a.nom;
  //     nouvelUser.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelUser.rendu = a.rendu;

  //     appelsVersAddUser.push(this.addUser(nouvelUser))
  //   });

  //   return forkJoin(appelsVersAddUser);
  // }


}
