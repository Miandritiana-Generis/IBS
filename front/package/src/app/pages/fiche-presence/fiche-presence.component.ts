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
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FichePresenceService } from 'src/app/services/fiche-presence.service';

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
  id_edt : string
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
  id_salle = 25;
  heure = "";
  date = "";
  id_edt = "";

  displayedColumns: string[] = ['nom', 'prenom', 'hArriver', 'status'];
  dataSource: ProductsData[] = [];
  apiUrl: any;

  constructor(private edtService: EdtService,private fichePresenceService : FichePresenceService, private http: HttpClient) {}

  ngOnInit() {
    this.getListFichePresence(this.id_salle ,this.heure, this.date, this.id_edt);
  }

  getListFichePresence(id_salle: number, heure: string, date: string, idEdt : string,): void {

    const salle = localStorage.getItem("salle");
    id_salle = parseInt(salle || "0", 10);
    this.edtService.getInfoFichePresence(id_salle ,heure, date, idEdt).subscribe(
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
        }));
        
        

        // Set the data source for the table
        this.dataSource = this.listeFichePresence;
        console.log("data:",this.listeFichePresence);
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


  validerProf(idEdt: string): void {
    this.fichePresenceService.validerProf(idEdt)
        .subscribe({
            next: (response) => {
                alert(response.message);
            },
            error: (error: HttpErrorResponse) => {
                if (error.error && error.error.erreurs && error.error.erreurs.length > 0) {
                    const backendError = error.error.erreurs[0];
                    alert(`Erreur ${backendError.codeErreur}: ${backendError.messageErreur}`);
                } else {
                    alert(`Une erreur est survenue: ${error.message}`);
                }
            }
        });
}


  validerDelegue(idEdt : string) : void {
    if (confirm("Voulez-vous vraiment valider ?")) {
      this.fichePresenceService.validerDelegue(idEdt).subscribe({
          next: () => {
              alert('Validation réussie.');
          },
          error: (err) => {
              alert(err.message);  
          }
      });
  }
  }

    


}
