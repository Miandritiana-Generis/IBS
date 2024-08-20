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
  constructor() {}

  typesOfShoes: string[] = ['Salle1', 'Salle2', 'Salle24', 'Salle31'];

}
