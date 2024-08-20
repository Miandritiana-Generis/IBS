import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hourRate: number;
  classes: number;
  priority: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Mark J. Freeman',
    position: 'English',
    hourRate: 150,
    classes: 53,
    priority: 'Available',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    hourRate: 150,
    classes: 68,
    priority: 'In Class',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    hourRate: 150,
    classes: 94,
    priority: 'Absent',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    hourRate: 150,
    classes: 27,
    priority: 'On Leave',
  },
];

@Component({
  selector: 'app-fiche-presence',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './fiche-presence.component.html'
})
export class AppFichePresenceComponent {
  
  displayedColumns: string[] = ['profile', 'hrate', 'exclasses', 'status'];
  dataSource = ELEMENT_DATA;

}
