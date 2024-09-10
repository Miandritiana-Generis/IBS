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
import { ActivatedRoute } from '@angular/router';
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
  listeFichePresence: any[] = [];
  id_salle = 25;
  heure = "";
  date = "";
  id_edt = "1";
  message: string = ''; 
  retour : any;
  estAnnule: boolean | null = null;
  retourDelegue : string = '';
  retourProf : string = '';


  displayedColumns: string[] = ['nom', 'prenom', 'hArriver', 'status'];
  dataSource: ProductsData[] = [];
  apiUrl: any;

  constructor(private edtService: EdtService, private http: HttpClient ,private route:ActivatedRoute, private fichePresenceService : FichePresenceService) {
   this.route.queryParamMap.subscribe(params => {
      console.log(params.get("id_edt"));
      this.id_edt = params.get('id_edt')!;
      this.getListFichePresence(this.id_salle ,this.heure, this.date,this.id_edt);
    });
    
  }


  ngOnInit() {
    this.checkIfAnnule(parseInt(this.id_edt));
  }

  getListFichePresence(id_salle: number, heure: string, date: string, idEdt : string): void {

    const salle = localStorage.getItem("salle");
    id_salle = parseInt(salle || "0", 10);

    this.edtService.getInfoFichePresence(id_salle, heure, date, idEdt).subscribe(
      (response: { data: any[]; retour: boolean }) => {
        // Vérification que 'data' est bien un tableau
        const data = response.data;
        this.retour = response.retour;
        const l= this.retour.split(";");
        this.retourProf = l[0];
        this.retourDelegue = l[1];

        if (Array.isArray(data)) {
          // Si 'data' est un tableau, le mapper pour créer listeFichePresence
          this.listeFichePresence = data.map(item => ({
            id: item.id,
            // If the photo exists, format it correctly to ensure it's treated as an absolute URL
            imagePath: item.photo 
              ? item.photo.replace('\\\\192.168.1.8\\bevazaha$', 'http://192.168.1.8/bevazaha$').replace(/\\/g, '/') 
              : 'assets/images/profile/default-user.jpg',
            nom: item.nom,
            prenom: item.prenom,
            hourRate: item.heure_arrive ? item.heure_arrive : 'N/A', // Garder hourRate comme chaîne
            status: item.status ? (item.status === true ? 'Present' : 'Absent') : 'Absent',
            salle: item.salle,
            matiere: item.matiere,
            enseignant: item.enseignant,
            classe: item.classe,
            id_edt: item.id_edt,
            id_classe_etudiant : item.id_classe_etudiant,
            date : item.date,
            fin : item.fin
          }));
        } else {
          // Si la réponse n'est pas un tableau, afficher un message d'erreur
          console.error("La réponse n'est pas un tableau valide:", response);
          this.listeFichePresence = [];
        }

        // Mettre à jour la source de données pour la table
        this.dataSource = this.listeFichePresence;
        console.log("Données transformées:", this.listeFichePresence);
      },
      (error: any) => {
        console.error("Erreur lors de l'appel à l'API:", error);
      }
    );
  }

  


  sendFichePresenceData(): void {
    const dataToSend = this.listeFichePresence;
    console.log("fdasdsgiulsag");
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
    const confirmed = confirm("Voulez-vous vraiment valider ce professeur ?");
    if (confirmed) {
      this.fichePresenceService.validerProf(idEdt).subscribe(
        success => {
          alert('Validation réussie.');
          window.location.reload();
        },
        error => {
          if (error.error.erreurs && error.error.erreurs && error.error.erreurs.length > 0) {
            this.message = error.erreurs[0].messageErreur;
          } else {
            alert(`Une erreur est survenue: ${error.message}`);
          }
        }
      );
    }
  }
  




validerDelegue(idEdt: string): void {
  const tokenValue = localStorage.getItem('token'); 
  if (tokenValue && confirm("Voulez-vous vraiment valider ?")) {
    this.fichePresenceService.validerDelegue(idEdt, tokenValue).subscribe({
      next: () => {
        alert('Validation réussie.');
      },
      error: (err) => {
        alert(err.message);
      }
    });
  } else {
    alert('Token manquant ou action annulée.');
  }
}

checkIfAnnule(idEdt: number): void {
  this.fichePresenceService.estAnnule(idEdt).subscribe(
    (response: any) => {
      this.estAnnule = response.estAnnule;
    },
    (error) => {
      console.error('Erreur lors de la vérification:', error);
    }
  );
}

    


}
