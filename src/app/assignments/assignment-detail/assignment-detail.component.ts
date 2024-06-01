import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import  {RouterLink} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MatiereService } from '../../services/matiere.service';
import { UsersService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../user/user.model';
import { Auth } from '../../user/auth.model';
import { ToolComponent } from '../../toolbar/app.toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule, ToolComponent, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment|undefined;
  user!:User;
  constructor(private assignmentsService:AssignmentsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private matiereService:MatiereService,
              private userService:UsersService,
              private imageService:FileUploadService,
              private router:Router) { }

  ngOnInit() {
    // Recuperation des query params (ce qui suit le ? dans l'url)
    console.log(this.route.snapshot.queryParams);
    // Recuperation des fragment (ce qui suit le # dans l'url)
    console.log(this.route.snapshot.fragment);

    // On recupere l'id de l'assignment dans l'URL à l'aide de ActivatedRoute
    const id = this.route.snapshot.params['id'];
    // On utilise le service pour récupérer l'assignment avec cet id
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      if(assignment){
        this.matiereService.getMatiere(assignment.id_matiere).subscribe((matiere)=>{
          if(matiere){
            this.userService.getUser(matiere.id_user).subscribe((user)=>{
              if(user){
                matiere.user = user;
              } 
            });
            matiere.image_name = this.imageService.baseUrl+"/download/"+ matiere.image_name;
            assignment.matiere = matiere;
          }
        })
        console.log(assignment);
        this.assignmentTransmis = assignment;
      }
    });
  }
  
  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  onAssignmentRendu() {
    // on a cliqué sur la checkbox, on change le statut de l'assignment
    if(this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la liste des assignments
        this.router.navigate(['/home']);
      });
    }
  }

  onDelete() {
    // on va directement utiliser le service
    if(this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // on va cacher la vue de detail en mettant assignmentTransmis à undefined
        this.assignmentTransmis = undefined;
        // on navigue vers la liste des assignments
        this.router.navigate(['/home']);
      });
    }
  }

  isAdmin() {
    // let result = false
    // let localToken = localStorage.getItem('token')
    // let user!: User;
    // if(localToken){
    //   let auth = new Auth();
    //   auth.auth =true;
    //   auth.token = localToken;
    //   this.authService.verifyToken(auth).subscribe((user)=>{
    //     user = user;
    //   })
    // }
    // console.log(user);
    // return
    // return this.authService.isAdmin()
    // .then(admin => {
    //     if (admin) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // );

    if(this.authService.userlogged?.status == 'admin'){
      return true;
    }
    return false;
    // return this.authService.loggedIn;
  }
}
