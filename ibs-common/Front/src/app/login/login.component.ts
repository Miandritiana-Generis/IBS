import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';
import { NgIf } from '@angular/common';
import { catchError, map, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;
  message="";
  idApplication="2";

  constructor(private authentificationService: AuthentificationService,
    private router: Router,private activatedRoute: ActivatedRoute
  ) {
    this.recupererIdApplication();
     this.myForm = new FormGroup({
      identifiant: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  private recupererIdApplication(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.idApplication = params['idApplication'];
    });
  }

  login(): void {
    const identifiant = this.myForm.get('identifiant')?.value;
    const password = this.myForm.get('password')?.value;
    console.log(this.myForm.value);
    this.authentificationService.login(identifiant,password,this.idApplication).subscribe(
      success=>{
          if (!success) {
            this.message="Erreur";
          }
        },error => {
          this.message=error.message
      });
  }
  
  
}
