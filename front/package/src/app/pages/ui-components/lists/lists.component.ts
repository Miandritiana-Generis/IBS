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

  takeSalle(salle: string) {
    localStorage.setItem("salle" , salle);
  }

  // saveSalle(shoeId: number | undefined): void {
  //   if (shoeId !== undefined) {
  //     console.log('Selected Salle ID:', shoeId);
  //     localStorage.setItem("salle" , shoeId.toString());

  //     this.http.post('/set_id_salle', { id_salle: shoeId })
  //     .subscribe(response => {
  //       console.log('Response from Flask:', response);
  //     });
      
  //   } else {
  //     console.log('No Salle selected');
  //   }
  // }

}
