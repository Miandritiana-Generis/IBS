import { SalleService } from './../../../services/salle.service';
import { Component } from '@angular/core';
import { EdtService } from 'src/app/services/edt.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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


  constructor(private salleService: SalleService, private edtService: EdtService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getListeSalle();
    this.checkSession();
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

  saveSalle(shoeId: number | undefined): void {
    if (shoeId !== undefined) {
      console.log('Selected Salle ID:', shoeId);
      localStorage.setItem("salle" , shoeId.toString());

      this.edtService.sendIdSalle(shoeId).subscribe(
        (response: any) => {
          console.log('Data sent successfully:', response);
          window.location.href = 'http://localhost:4400';
      },
        (error: any) => {
          alert("Tsy mety lasa le id salle");
          console.error('Error sending data:', error);
        }
      );
      
    } else {
      console.log('No Salle selected');
    }
  }

  checkSession(): void {
    const flaskUrl = 'http://127.0.0.1:5000/';
    this.http.get(flaskUrl).subscribe(
      response => {
        // If the session exists, you can proceed as normal
        console.log('Session is valid');
      },
      error => {
        if (error.status === 403 && error.error.redirect) {
          alert(error.error.message);  // Display the alert message
          this.router.navigate(['/salle/lists']);  // Redirect to the desired page
        }
      }
    );
  }

}
