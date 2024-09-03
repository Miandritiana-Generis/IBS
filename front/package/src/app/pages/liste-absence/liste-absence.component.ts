import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface productsData {
  id: number;
  imagePath: string;
  nom: string;
  prenom: string;
  cours: string
  classe: string;
  enseignant: string;
  status: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    nom: 'Mark J. Freeman',
    prenom: 'English',
    cours: 'Management',
    classe: 'L2MDE',
    enseignant: 'Donald Hagenes',
    status: 'Justifié',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    nom: 'Andrew McDownland',
    prenom: 'Project Manager',
    cours: 'Management',
    classe: 'L2MDE',
    enseignant: 'Donald Hagenes',
    status: 'Non justifié',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    nom: 'Christopher Jamil',
    prenom: 'Project Manager',
    cours: 'Management',
    classe: 'L2MDE',
    enseignant: 'Donald Hagenes',
    status: 'Non justifié',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    nom: 'Nirav Joshi',
    prenom: 'Frontend Engineer',
    cours: 'Management',
    classe: 'L2MDE',
    enseignant: 'Donald Hagenes',
    status: 'Justifié',
  },
];

@Component({
  selector: 'app-liste-absence',
  standalone: false,
  templateUrl: './liste-absence.component.html',
})
export class AppListeAbsence {

  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['Etudiant', 'Cours', 'Classe', 'Enseignant', 'Justification', 'Modifier'];
  dataSource = ELEMENT_DATA;

  openModal(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef, {
      width: '800px' // You can adjust the size as needed
    });
  }
  
  //  disabled
  disabled = new FormControl(false);

  // show and hide
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

}
