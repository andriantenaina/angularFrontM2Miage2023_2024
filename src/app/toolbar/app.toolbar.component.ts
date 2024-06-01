import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RenduDirective } from '../shared/rendu.directive';
import { RouterLink } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  providers: [],
  templateUrl: './app.toolbar.component.html',
  //styleUrl: './app.toobar.component.css',
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    ScrollingModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class ToolComponent {

}