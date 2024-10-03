import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PresenceService } from 'src/app/services/presence.service';
import { Absence } from 'src/app/modeles/Absence';
import { JustificationAbsenceService } from 'src/app/services/justification-absence.service';
import { AbstractControl } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface productsData {
  id: number;
  imagePath: string;
  nom: string;
  prenom: string;
  cours: string;
  classe: string;
  enseignant: string;
  status: string;
  id_justification: number;
  dateTimeDebut: Date;
  dateTimeFin: Date;
  description: string;
}

export interface Search{
  name: string;
}

const ELEMENT_DATA: productsData[] = [];

@Component({
  selector: 'app-liste-absence',
  standalone: false,
  templateUrl: './liste-absence.component.html',
})
export class AppListeAbsence {
  absents: Absence[] = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  date: string;
  selectedAbsence: any;
  idEdt = 0;
  id_justification = 0;
  allAbsents: Absence[] = [];


  // Ajout des variables pour les champs du formulaire
  description: string = ''; 
  dateTimeDebut: string = ''; 
  dateTimeFin: string = '';

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchs: Search[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.searchs.push({ name: value });
      this.applySearchFilter();
    }

    event.chipInput!.clear();
  }

  remove(search: Search): void {
    const index = this.searchs.indexOf(search);

    if (index >= 0) {
      this.searchs.splice(index, 1);
      this.absents = [...this.absents];
      this.applySearchFilter();
    }
  }

  constructor(
    public dialog: MatDialog,
    private presenceService: PresenceService,
    private justificationService: JustificationAbsenceService
  ) {
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
    this.getAbsence();
  }
  
  displayedColumns: string[] = ['Etudiant', 'Cours', 'Classe', 'Enseignant', 'Justification', 'Modifier'];
  dataSource = ELEMENT_DATA;

  
  openModal(templateRef: TemplateRef<any>, id_justi:number, absenceId: number, idEdt: number, dateTimeDebut?: string, dateTimeFin?: string, description?: string): void {
    this.selectedAbsence = absenceId;
    this.idEdt = idEdt;
    this.dateTimeDebut = dateTimeDebut ? new Date(dateTimeDebut).toISOString().slice(0, 10) : '';
    this.dateTimeFin = dateTimeFin ? new Date(dateTimeFin).toISOString().slice(0, 10) : '';
    this.description = description || '';
    this.id_justification = id_justi;

    console.log("idAbsence :", absenceId);

    const dialogRef = this.dialog.open(templateRef, {
      width: '800px' 
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitJustification( this.description, this.dateTimeDebut, this.dateTimeFin);
        this.closeModal(dialogRef);
      }
    });
  }

  closeModal(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }


  
  submitJustification(description: string, dateTimeDebut: string, dateTimeFin: string) {
  
    if (!description || !dateTimeDebut || !dateTimeFin) {
      alert('Tous les champs sont obligatoires. Veuillez remplir la description, la date de début et la date de fin.');
      return; // Exit the function if validation fails
    }

    const absenceId = this.selectedAbsence;
    const idEdt = this.idEdt;
    const id_justification = this.id_justification;

    // Formater les dates pour ne garder que la partie "date"
    const formatteddateTimeDebut = dateTimeDebut ? new Date(dateTimeDebut).toISOString().split('T')[0] : null;
    const formatteddateTimeFin = dateTimeFin ? new Date(dateTimeFin).toISOString().split('T')[0] : null;
  
    const justificationPayload = {
      id : id_justification,
      id_edt : idEdt,
      id_classe_etudiant: absenceId,
      description: description,
      date_time_debut: formatteddateTimeDebut,
      date_time_fin: formatteddateTimeFin
    };
  
    console.log("justificationPayload: ", justificationPayload);
  
    this.justificationService.justifierDelegue(justificationPayload).subscribe(
      response => {
        console.log('Justification envoyée avec succès', response);
        window.location.reload();
        close();
      },
      error => {
        console.error('Erreur lors de l\'envoi de la justification', error);
        close();
      }
    );
  }
  
  onDateChange(type: string, event: any) {
    if (type === 'debut') {
      this.dateTimeDebut = event.target.value;
    } else if (type === 'fin') {
      this.dateTimeFin = event.target.value;
    }
  }
  
  public changerPage(event: any){
    this.page = event.page;
    this.getAbsence();
  }
  
  public getAbsence() {
    this.presenceService.getAbsent(this.date, this.date, this.page).subscribe(
      success => {
        this.allAbsents = success.content;
        this.absents = [...this.allAbsents];
        this.totalElements = success.totalElements;
        this.totalPages = success.size;
        // this.applySearchFilter();

      },
      error => {
        
      }
    );
  }

  onEnter() {
    this.getAbsence();
  }

  applySearchFilter() {
    // Start from the original data
    let filteredAbsents = [...this.allAbsents];
  
    // Apply the search terms if any
    if (this.searchs.length > 0) {
      const searchTerms = this.searchs.map(search => search.name.toLowerCase());
      filteredAbsents = filteredAbsents.filter(absent =>
        searchTerms.some(term =>
          absent.nom?.toLowerCase().includes(term) || absent.prenom?.toLowerCase().includes(term)
        )
      );
    }
  
    // Update the displayed list of absents
    this.absents = filteredAbsents;
  }
  
  
  
}
