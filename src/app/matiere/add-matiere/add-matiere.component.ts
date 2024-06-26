import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Matiere } from '../matiere.model';
import { AuthService } from '../../shared/auth.service';
import { MatButton } from '@angular/material/button';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpResponse } from '@angular/common/http';
import { MatiereService } from '../../services/matiere.service';
import { Router } from '@angular/router';
// import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { ToolComponent } from '../../toolbar/app.toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-matiere',
  standalone: true,
  imports: [MatButton,FormsModule, MatInputModule, RouterModule, ToolComponent, MatFormFieldModule, MatSelectModule, MatSidenavModule,MatListModule,MatToolbarModule,MatIconModule],
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.css',
})
export class AddMatiereComponent {
nom: any;
code: any;
description: any;
image_file!: File;

constructor(private authService:AuthService,
  private router:Router,
  private matiereService: MatiereService,
  private uploadService:FileUploadService){}

selectFile(event: any): void {
  this.image_file = event.target.files.item(0);
}

upload(): void {
  if (this.image_file) {
    this.uploadService.upload(this.image_file)
    .subscribe({
      // next: (event: any) => {
      //   if (event instanceof HttpResponse) {
      //     // this.message = event.body.message;
      //     // this.fileInfos = this.uploadService.getFiles();
      //   }
      // },
      error: (err: any) => {
        console.log(err);

        // if (err.error && err.error.message) {
        //   this.message = err.error.message;
        // } else {
        //   this.message = 'Could not upload the file!';
        // }
      },
      complete: () => {
        console.log("file uploaded")
      },
    });
  }
}

logout(){
  this.authService.logOut();
  this.router.navigate(['/login']);
}

save(event: any){
  let matiere = new Matiere();
  matiere.code = this.code;
  matiere.nom = this.nom;
  matiere.description = this.description;
  matiere.image_name = this.image_file.name;
  matiere.user = this.authService.userlogged;
  // matiere.id_user = this.authService.userlogged._id;

  this.matiereService.addMatiere(matiere).subscribe(()=>{
    this.upload();
    this.router.navigate(['/matiere']);
  })
}

}
