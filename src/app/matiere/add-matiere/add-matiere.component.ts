import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Matiere } from '../matiere.model';
import { AuthService } from '../../shared/auth.service';
import { MatButton } from '@angular/material/button';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpResponse } from '@angular/common/http';
// import { FileUploadComponent } from '../../components/file-upload/file-upload.component';

@Component({
  selector: 'app-add-matiere',
  standalone: true,
  imports: [MatFormFieldModule,MatButton,FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.css',
})
export class AddMatiereComponent {
nom: any;
description: any;
image_file!: File;

constructor(private authService:AuthService,private uploadService:FileUploadService){}

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

save(event: any){
  let matiere = new Matiere();
  matiere.nom = this.nom;
  matiere.description = this.description;
  matiere.image_name = this.image_file.name;
  matiere.user = this.authService.userlogged;
  // matiere.id_user = this.authService.userlogged._id;

  this.upload();

  console.log(matiere);
}

}
