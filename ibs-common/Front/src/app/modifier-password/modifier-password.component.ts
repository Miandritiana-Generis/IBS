import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { error } from 'jquery';
import { AuthentificationService } from '../authentification/authentification.service';
import { EntiteService } from '../services/entite.service';
import { Entite } from '../modeles/Entite';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-modifier-password',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './modifier-password.component.html',
  styleUrl: './modifier-password.component.css'
})
export class ModifierPasswordComponent implements OnInit {

  isme: boolean = false;
  myFormInfo: FormGroup;
  myForm: FormGroup;
  idUtilisateur: number = 0;
  message: string = "";
  messageConfirme: string = "";
  disabled: string = "";
  borderDisabled: string = "";
  messageErreur: string ="";
  profil: any = {
    "id": 0,
    "login": "",
    "motdepasse": "",
    "nom": "",
    "prenom": "",
    "superutilisateur": false,
    "code": {
        "id": 0,
        "numero": 0,
        "description": "",
        "entite": {
            "id": 0,
            "nom": ""
        }
    }
  };
  entite: Entite[] = [];
  codeFiltrer : any[] = [];
  codes : any[] = [];
  selectedEntite: string = "";
  codeUtilisateur : any = {};
  isSelectedEntite: boolean = false;

  constructor(private route: ActivatedRoute, 
    private utilisateurService: UtilisateurService, 
    private authentificationService: AuthentificationService,
    private entiteService: EntiteService,
    private codeService: CodeService) {
    this.route.paramMap.subscribe(params => {
      this.idUtilisateur = parseInt(params.get('idUtilisateur')!);
      if(this.idUtilisateur==0) {
        this.isme = true;
      }
    })
    this.myFormInfo =  new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      entiteId: new FormControl('', Validators.required),
      directionId: new FormControl('', Validators.required)
    });
    this.myForm =  new FormGroup({
      ancienmotdepasse: new FormControl('', Validators.required),
      motdepasse: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  ngOnInit(): void {
    this.utilisateurService.getDataProfil(this.idUtilisateur).subscribe(
      data => {
        if(data) {
          this.profil = data;
        }
      });
    this.getListEntite();
    this.getCodesData();
  }

  checkedSelect(selectedId: string, selectedListe: string): boolean {
    var resultat = false;
    if(selectedId==selectedListe) {
      resultat = true;
    }
    return resultat;
  }

  getListEntite() {
    this.entiteService.getAllData().subscribe(
      response => {
        this.entite = response;
      }
    );
  }

  getCodesData(){
    this.codeService.getAllData().subscribe(data => {
      this.codes = data;
    })
  }

  changeOccur(event : any) {
    let entiteId = event.target.value;
    this.codeFiltrer = this.codes.filter(item => item.entite.id == entiteId);
    this.codeFiltrer.sort((a, b) => a.numero - b.numero)

  }

  onEntiteChange(event : any) {
    let entiteId = event.target.value;
    this.codeFiltrer = this.codes.filter(item => item.entite.id == entiteId);
    this.codeFiltrer.sort((a, b) => a.numero - b.numero)
  }

  modifierinformation(): void {
  }

  confirmerMotDePasse(event: Event): void {
    var nouveaumotdepasse = (document.getElementById('nouveau') as HTMLInputElement).value;
    var confirmermotdepasse = (event.target as HTMLInputElement).value;
    if(confirmermotdepasse!=nouveaumotdepasse) {
      this.message="Nouveau mot de passe incorrecte";
    }
    else {
      this.message="";
      this.messageConfirme="";
      this.disabled="";
    }
  }

  modifiermotdepasse(event: Event): void {
    if(this.message=="Nouveau mot de passe incorrecte") {
      this.message = "";
      this.messageConfirme="Le nouveau mot de passe et le mot de passe de confirmation doivent être identiques";
      this.disabled = "disabled";
      this.confirmerMotDePasse(event);
    }
    else {
      var ancienmotdepasse = this.myForm.get('ancienmotdepasse')?.value;
      var motdepasse = this.myForm.get('motdepasse')?.value;
      this.utilisateurService.modifiermotdepasse(this.idUtilisateur, ancienmotdepasse, motdepasse).subscribe(
        succes => {
          this.authentificationService.logout();
        },
        error => {
          this.messageErreur=error.message
        }
      );
    }
  }
}
