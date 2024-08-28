import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { EdtService } from 'src/app/services/edt.service';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

export interface ProductsData {
  id: number;
  imagePath: string;
  nom: string;
  prenom: string;
  hourRate: Date | null;
  status: string;
  salle: string;
  matiere : string;
  enseignant : string;
  classe : string;
}

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
    MatChipsModule,
    CommonModule,
  ],
  templateUrl: './fiche-presence.component.html'
})
export class AppFichePresenceComponent {
  listeFichePresence: ProductsData[] = [];
  id_salle = 40;
  heure = "";
  date = "";

  displayedColumns: string[] = ['nom', 'prenom', 'hArriver', 'status'];
  dataSource: ProductsData[] = [];

  constructor(private edtService: EdtService, private http: HttpClient) {}

  ngOnInit() {
    this.getListFichePresence(this.id_salle, this.heure, this.date);
  }

  getListFichePresence(id_salle: number, heure: string, date: string): void {

    const url = `http://127.0.0.1:5000/api/fiche-presence?id_salle=${id_salle}&heure=${heure}&date=${date}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.listeFichePresence = data;
    });
    
    this.edtService.getInfoFichePresence(id_salle, heure, date).subscribe(
      (data: any[]) => {
        // Map data to include hourRate defaulting to null if not provided
        this.listeFichePresence = data.map(item => ({
          id: item.id,
          imagePath: item.photo ? `assets/images/profile/${item.photo}` : 'assets/images/profile/default.jpg',
          nom: item.nom,
          prenom: item.prenom,
          hourRate: item.heure_arrive ? new Date(item.heure_arrive) : null,
          status: item.status ? (item.status === true ? 'Present' : 'Absent') : 'Absent',
          salle : item.salle,
          matiere : item.matiere,
          enseignant : item.enseignant,
          classe : item.classe
        }));

        // Set the data source for the table
        this.dataSource = this.listeFichePresence;
      }
    );
  }
}
