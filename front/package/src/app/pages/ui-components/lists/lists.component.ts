import { SalleService } from './../../../services/salle.service';
import { Component } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent {
  listeSalle: any[] = [];
  typesOfShoes: string[] = ['Salle1', 'Salle2', 'Salle24', 'Salle31'];


  constructor(private salleService: SalleService) {}

  ngOnInit() {
    this.getListeSalle();
  }


  getListeSalle(): void {
    this.salleService.getListeSalle().subscribe(
      (data: any[]) => {
        this.listeSalle = data;
      }
    );
  }
}
