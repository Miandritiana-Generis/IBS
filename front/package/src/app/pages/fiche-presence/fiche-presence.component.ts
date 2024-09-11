import { CommonModule, Time } from '@angular/common';
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
  id_edt : string;
  id_classe_etudiant : string;
  date : Date;
  fin : Time
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
    // HttpClientModule,
  ],
  templateUrl: './fiche-presence.component.html'
})
export class AppFichePresenceComponent {
  listeFichePresence: ProductsData[] = [];
  id_salle = 30;
  heure = "";
  date = "";
  id_edt :string= "0";

  displayedColumns: string[] = ['nom', 'prenom', 'hArriver', 'status'];
  dataSource: ProductsData[] = [];
  apiUrl: any;

  constructor(private edtService: EdtService, private http: HttpClient ,private route:ActivatedRoute) {
   this.route.queryParamMap.subscribe(params => {
      console.log(params.get("id_edt"));
      this.id_edt = params.get('id_edt')!;
      this.getListFichePresence(this.id_salle,this.id_edt ,this.heure, this.date);
    });
    
  }


  ngOnInit() {
   
  }

  getListFichePresence(id_salle: number, idEdt : string,heure: string, date: string): void {

    const salle = localStorage.getItem("salle");
    id_salle = parseInt(salle || "0", 10);
    this.edtService.getInfoFichePresence(id_salle,heure, date,idEdt ).subscribe(
      (data: any[]) => {
        // Map data to include hourRate defaulting to null if not provided
        this.listeFichePresence = data.map(item => ({
          id: item.id,
          // imagePath: item.photo ? `assets/images/profile/${item.photo}` : 'assets/images/profile/default-user.jpg',
          imagePath: 'assets/images/profile/default-user.jpg',
          nom: item.nom,
          prenom: item.prenom,
          hourRate: item.heure_arrive ? item.heure_arrive : 'N/A', // Garder hourRate comme chaîne
          status: item.status ? (item.status === true ? 'Present' : 'Absent') : 'Absent',
          salle: item.salle,
          matiere: item.matiere,
          enseignant: item.enseignant,
          classe: item.classe,
          id_edt : item.id_edt,
          id_classe_etudiant : item.id_classe_etudiant,
          date : item.date,
          fin : item.fin
        }));
        
        

        // Set the data source for the table
        this.dataSource = this.listeFichePresence;
      }
    );
  }


  sendFichePresenceData(): void {
    const dataToSend = this.listeFichePresence;  // Assuming listeFichePresence contains the data you want to send
    this.edtService.sendFichePresenceDataService(dataToSend).subscribe(
      (response: any) => {
        console.log('Data sent successfully:', response);
        window.location.href = 'http://127.0.0.1:5000/';
      },
      (error: any) => {
        alert("Tsy mety lasa le data");
        console.error('Error sending data:', error);
      }
    );
  }
    


}
