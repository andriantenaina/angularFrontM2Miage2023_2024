import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from '../shared/logging.service';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  matieres:Matiere[] = [];

  constructor(private logService:LoggingService,
              private http:HttpClient) { }

  uri = 'https://assignementback.onrender.com/api/matieres';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/api/matieres";

  // retourne tous les matieres
  getMatieres():Observable<any> {
    return this.http.get<Matiere[]>(this.uri);
  }

  getMatieresPagines(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(this.uri + "?page=" + page + "&limit=" + limit);
  }

  // renvoie un matiere par son id, renvoie undefined si pas trouvé
  getMatiere(id:string):Observable<Matiere|undefined> {
    return this.http.get<Matiere>(this.uri + "/" + id)
    .pipe(
           catchError(this.handleError<any>('### catchError: getMatieres by id avec id=' + id))
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
    //let a = this.matieres.find(a => a.id === id);
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

  // ajoute un matiere et retourne une confirmation
  addMatiere(matiere:Matiere):Observable<any> {
    //this.matieres.push(matiere);
    this.logService.log(matiere.nom, "ajouté");
    //return of("Matiere ajouté avec succès");
    return this.http.post<Matiere>(this.uri, matiere);
  }

  updateMatiere(matiere:Matiere):Observable<any> {
   // l'matiere passé en paramètre est le même objet que dans le tableau
   // plus tard on verra comment faire avec une base de données
   // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(matiere.nom, "modifié");
    //return of("Matiere modifié avec succès");
    return this.http.put<Matiere>(this.uri, matiere);
  }

  deleteMatiere(matiere:Matiere):Observable<any> {
    // on va supprimer l'matiere dans le tableau
    //let pos = this.matieres.indexOf(matiere);
    //this.matieres.splice(pos, 1);
    this.logService.log(matiere.nom, "supprimé");
    //return of("Matiere supprimé avec succès");
    return this.http.delete(this.uri + "/" + matiere._id);
  }

  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  // peuplerBD() {
  //   // on utilise les données de test générées avec mockaroo.com pour peupler la base
  //   // de données
  //   bdInitialMatieres.forEach(a => {
  //     let nouvelMatiere = new Matiere();
  //     nouvelMatiere.nom = a.nom;
  //     nouvelMatiere.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelMatiere.rendu = a.rendu;

  //     this.addMatiere(nouvelMatiere)
  //     .subscribe(() => {
  //       console.log("Matiere " + a.nom + " ajouté");
  //     });
  //   });
  // }

  // peuplerBDavecForkJoin():Observable<any> {
  //   let appelsVersAddMatiere:Observable<any>[] = [];

  //   bdInitialMatieres.forEach(a => {
  //     const nouvelMatiere = new Matiere();
  //     nouvelMatiere.nom = a.nom;
  //     nouvelMatiere.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelMatiere.rendu = a.rendu;

  //     appelsVersAddMatiere.push(this.addMatiere(nouvelMatiere))
  //   });

  //   return forkJoin(appelsVersAddMatiere);
  // }

}
