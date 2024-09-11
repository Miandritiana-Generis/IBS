import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-erreur',
  standalone: true,
  imports: [],
  templateUrl: './erreur.component.html',
  styleUrl: './erreur.component.css'
})
export class ErreurComponent {

  @Input() erreur : string = "";
}
