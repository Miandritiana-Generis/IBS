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
  fin : Time;
  debut : Time;
  id_personne : number;
  id_salle : number;
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
  estValideProf: boolean = false;
  estValideDelegue: boolean = false;
  retourDelegue : string = '';
  retourProf : string = '';


  displayedColumns: string[] = ['nom', 'prenom', 'hArriver', 'status'];
  dataSource: ProductsData[] = [];
  apiUrl: any;
  isLoading: boolean = false;

  isIdPatValid: boolean = true;

  constructor(private edtService: EdtService, private http: HttpClient ,private route:ActivatedRoute, private fichePresenceService : FichePresenceService) {
   this.route.queryParamMap.subscribe(params => {
      console.log(params.get("id_edt"));
      this.id_edt = params.get('id_edt')!;
      this.getListFichePresence(this.id_salle ,this.heure, this.date,this.id_edt);
      
    });
    
  }


  ngOnInit() {
    this.checkIfAnnule(parseInt(this.id_edt));

    const idPat = localStorage.getItem("idPat");
    
    // Check if idPat is not undefined and is not equal to "0"
    if (idPat !== undefined && idPat !== "0") {
      this.isIdPatValid = false; // Set flag to false to hide the button
    }
  }

  getListFichePresence(id_salle: number, heure: string, date: string, idEdt : string): void {

    if(idEdt != null){

      const salle = localStorage.getItem("salle");
      id_salle = parseInt(salle || "0", 10);

      const personne = parseInt(localStorage.getItem("id")|| "0", 10);
      console.log(personne);
      
      const idPat = localStorage.getItem("idPat");

      this.edtService.getInfoFichePresence(id_salle, heure, date, idEdt).subscribe(
        (response: { data: any[]; retour: boolean }) => {
          // Vérification que 'data' est bien un tableau
          const data = response.data;
          this.retour = response.retour;
          const l= this.retour.split(";");
          this.retourProf = l[0];
          this.retourDelegue = l[1];

          console.log(this.retourProf);
          console.log(this.retourDelegue);
          

          if (Array.isArray(data)) {
            // Si 'data' est un tableau, le mapper pour créer listeFichePresence
            this.listeFichePresence = data.map(item => ({
              id: item.id,
              // If the photo exists, format it correctly to ensure it's treated as an absolute URL
              imagePath: 'http:\\'+item.photo,
              // ? item.photo
              //     .replace('\\\\192.168.1.8\\bevazaha$', 'http://192.168.1.8/bevazaha$')
              //     .replace(/\\/g, '/') // Ensure backslashes are converted to forward slashes
              // : 'assets/images/profile/default-user.jpg',        
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
              fin : item.fin,
              debut : item.debut,
              id_personne : item.id_personne,
              id_salle : id_salle
            }));
          } else {
            // Si la réponse n'est pas un tableau, afficher un message d'erreur
            console.error("La réponse n'est pas un tableau valide:", response);
            this.listeFichePresence = [];
          }        

          // this.dataSource = this.listeFichePresence;
          

          if (this.listeFichePresence.some(item => item.id_personne === personne) || idPat) {
            console.log("etooooooooooooooooooooo");
            
            this.dataSource = this.listeFichePresence;
            console.log("Données transformées:", this.listeFichePresence);
            this.listeFichePresence.forEach(item => {
              console.log(item.imagePath);
              console.log(item.retour);
            });
            
          }else{
            console.log("sdfdsijl");
            this.listeFichePresence = [];
          }
          
          this.dataSource = this.listeFichePresence;

        },
        (error: any) => {
          console.error("Erreur lors de l'appel à l'API:", error);
        }
      );
    }else{
      window.location.href = 'http://localhost:4400/programme';
    }
  }

  sendFichePresenceData(): void {
    this.isLoading = true;
    const dataToSend = this.listeFichePresence;
    this.edtService.sendFichePresenceDataService(dataToSend).subscribe(
      (response: any) => {
        window.location.href = 'http://127.0.0.1:5000/';
        console.log('Data sent successfully:', response);
        this.isLoading = false;
      },
      (error: any) => {
        alert("Tsy mety lasa le data");
        console.error('Error sending data:', error);
      }
    );
  }


  validerProf(idEdt: string): void {
    const tokenValue = localStorage.getItem('token') || '';  // Assurer que tokenValue n'est jamais null
    const confirmed = confirm("Voulez-vous vraiment valider ce fiche de présence ?");
    
    if (confirmed) {
      this.fichePresenceService.validerProf(idEdt, tokenValue).subscribe(
        success => {
          alert('Validation réussie.');
          window.location.reload();
        },
        error => {
          console.log(JSON.parse(error.error).erreurs[0].messageErreur);  // Afficher les détails de l'erreur dans la console

          // Si l'erreur contient des erreurs spécifiques
          if (JSON.parse(error.error) && JSON.parse(error.error).erreurs && JSON.parse(error.error).erreurs.length > 0) {
            this.message = JSON.parse(error.error).erreurs[0].messageErreur;
            alert(this.message);
          } 
          // Gérer le cas où l'erreur HTTP est 400 (Bad Request)
          else if (error.status === 400) {
            alert('Erreur 400: Requête invalide. Veuillez vérifier les données envoyées.');
          } 
          // Gérer d'autres types d'erreurs (401, 403, etc.)
          else if (error.status === 401) {
            alert('Erreur 401: Non autorisé. Veuillez vous reconnecter.');
          } else if (error.status === 403) {
            alert('Erreur 403: Accès refusé. Vous n\'avez pas les droits pour cette action.');
          } 
          // Cas par défaut pour les autres erreurs
          else {
            alert(`Une erreur est survenue: ${error.message}`);
          }
        }
      );
    }
  }





  validerDelegue(idEdt: string): void {
    const tokenValue = localStorage.getItem('token') || '';
    
    if (tokenValue && confirm("Voulez-vous vraiment valider ?")) {
      this.fichePresenceService.validerDelegue(idEdt, tokenValue).subscribe({
        next: () => {
          alert('Validation réussie.');
          window.location.reload();
        },
        error: (error) => {
          console.log(JSON.parse(error.error).erreurs[0]);  // Log pour plus de détails
  
          // Gestion des erreurs en fonction du code HTTP
          if (error.status === 400) {
            alert(JSON.parse(error.error).erreurs[0].messageErreur);
          } else if (error.status === 401) {
            alert(JSON.parse(error.error).erreurs[0].messageErreur);
          } else if (error.status === 403) {
            alert(JSON.parse(error.error).erreurs[0].messageErreur);
          } else if (error.status === 404) {
            alert(JSON.parse(error.error).erreurs[0].messageErreur);
          } else {
            alert(JSON.parse(error.error).erreurs[0].messageErreur);
          }
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

  // public checkIfEsrValideProf(idEdt: number): void {
  //   this.fichePresenceService.estValiderProf(idEdt).subscribe(
  //     (response: any) => {
  //       this.estValideProf = response.prof;
  //       console.log("V :",this.estValideProf);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la vérification:', error);
  //     }
  //   );
  // }

  // private checkIfEsrValideDelegue(idEdt: number): void {
  //   this.fichePresenceService.estValiderDelegue(idEdt).subscribe(
  //     (response: any) => {
  //       this.estValideDelegue = response.delegue;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la vérification:', error);
  //     }
  //   );
  // }

  presenceManuelle(idEdt: number, idClasseEtudiant: number): void {
    const idEnseignant = localStorage.getItem('idEnseignant');
    const idPat = localStorage.getItem('idPat');
    
    if(idEnseignant && idEnseignant !== '0' || idPat && idPat !== '0') {
      const confirmAction = confirm("Êtes-vous sûr de vouloir marquer cet étudiant comme présent?");
    
      if (confirmAction) {
        const tempsArriver = new Date().toLocaleTimeString('en-GB'); // Current time in HH:mm:ss format
  
        this.fichePresenceService.presence(idEdt, idClasseEtudiant, tempsArriver).subscribe(
          (response) => {
            console.log(response);
            alert('Présence enregistrée avec succès!');
            var index = this.listeFichePresence.findIndex(student => student.id_classe_etudiant === idClasseEtudiant);
            this.listeFichePresence[index].status = 'Present';
            this.listeFichePresence[index].hourRate = response.tempsArriver;
            

          },
          (error) => {
            console.error('Error:', error);
            alert('Échec de l\'enregistrement de la présence.');
          }
        );
      }
    }else{
      alert('Vous n\'êtes pas autoriser à faire la presence manuellement');
    }
  }

  isCurrentTimeWithinRange(date: string, debut: string, fin: string, id_salle: number): boolean {

    const salle = localStorage.getItem('salle');    
    const currentDateTime = new Date();
    const startTime = new Date(`${date}T${debut}`);
    const endTime = new Date(`${date}T${fin}`);

    if (salle !== id_salle.toString() || currentDateTime < startTime || currentDateTime > endTime) {
      return false;
    }
  
    return true;

  }


}
