import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Notification } from 'src/app/modeles/Notification';
import { NotificationEdtService } from 'src/app/services/notification-edt.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['/src/assets/scss/pages/_dashboards.scss'],
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  nom="My profil";
  count=0;
  notification:Notification[]=[];
  constructor(public dialog: MatDialog,private authService:AuthService ,
    private router:Router,
    private notificationService:NotificationEdtService
  ) {
    this.nom=localStorage.getItem("nom")|| "My Profil";
    this.setNotification();
  }
  private setNotification(){
    this.notificationService.getNotification().subscribe(
      (data: any)=> {
        this.count=data.count;
        this.notification=data.data
      },error => {

      });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }

  formatTime(time: string): string {
    if (!time) {
      return '';
    }
    // Extraire HH:mm à partir de HH:mm:ss
    return time.slice(0, 5);
  }

  redirifer(idEdt:number){
    this.router.navigate(['/fiche-presence'], { queryParams: { id_edt: idEdt } });
  }
}
