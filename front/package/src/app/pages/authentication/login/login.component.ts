import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  myForm: FormGroup;
  idApplication="2";
  message="";
  constructor(
    private authentificationService: AuthService
  ) {
    this.myForm = new FormGroup({
      identifiant: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    const identifiant = this.myForm.get('identifiant')?.value;
    const password = this.myForm.get('password')?.value;
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
