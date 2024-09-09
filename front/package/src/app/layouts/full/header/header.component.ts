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
  page =0;
  notification:Notification[]=[];
  constructor(public dialog: MatDialog,private authService:AuthService ,
    private router:Router,
    private notificationService:NotificationEdtService
  ) {
    this.nom=localStorage.getItem("nom")|| "My Profil";
    this.setNotification();
  }
  public charger(event: MouseEvent){
    event.stopPropagation();
    this.page=this.page+1;
    this.setNotification();
  }
  public actualiser(event: MouseEvent){
    this.notification=[];
    event.stopPropagation();
    this.setNotification();
  }
  public setNotification(){
    this.notificationService.getNotification(this.page).subscribe(
      (data: any)=> {
        this.count=data.count;
        for(let item of data.data){
          this.notification.push(item)
        }
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

  redirifer(idEdt:number , type:number){
    if(type==1){
      this.router.navigate(['/fiche-presence'], { queryParams: { id_edt: idEdt } });
    }
  }
}
