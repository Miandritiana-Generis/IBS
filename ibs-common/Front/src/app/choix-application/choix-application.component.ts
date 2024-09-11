import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-choix-application',
  standalone: true,
  imports: [NgFor,
    CommonModule],
  templateUrl: './choix-application.component.html',
  styleUrls: ['./choix-application.component.css']
})
export class ChoixApplicationComponent {
  listeAppli: any[] = [];
  selectedId: number | null = null;  // Propriété pour stocker l'ID sélectionné

  constructor(private applicationService: ApplicationService, private router: Router) {}

  getListeApplication(): void {
    this.applicationService.getListeAppli().subscribe(
      (data: any[]) => {
        this.listeAppli = data;
      }
    );
  }

  passerIdApplication(idAppli: number): void {
    this.router.navigate(['login'], {
      queryParams: {
        idApplication: idAppli
      }
    });
  }


  setSelectedId(id: number): void {
    this.selectedId = id;
  }

  ngOnInit(): void {
    this.getListeApplication();
  }
}
