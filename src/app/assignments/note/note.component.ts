import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Assignment } from "../assignment.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Component, Inject, OnInit } from "@angular/core";
import { AssignmentsService } from "../../shared/assignments.service";

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './note.component.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class NoteComponent implements OnInit {
    // assignment!: Assignment;
    note?:number;
    constructor(
      public dialogRef: MatDialogRef<NoteComponent>,
      @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
      private assignmentService: AssignmentsService
    ) {}
    ngOnInit(): void {
        this.note = this.assignment.note;
    }
    
    onClick(): void {
        this.assignment.note = this.note;
        this.assignmentService.updateAssignment(this.assignment).subscribe();
      this.dialogRef.close();
    }
  }
  