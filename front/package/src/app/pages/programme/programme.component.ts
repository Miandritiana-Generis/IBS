  import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
  } from '@angular/core';
  import {
    isSameDay,
    isSameMonth,
    differenceInHours,
    isBefore,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    startOfMonth,
    endOfMonth
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  import { EventColor } from 'calendar-utils';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';

  import { CalendarModule } from 'angular-calendar';

  import { FlatpickrModule } from 'angularx-flatpickr';
  import { EdtService } from 'src/app/services/edt.service';
  import { CustomCalendarEvent } from 'src/app/modeles/CustomCalendarEvent ';
  import { Router } from '@angular/router';

  const colors: Record<string, EventColor> = {
    red: {
      primary: '#fb977d',
      secondary: '#ffede9',
    },
    blue: {
      primary: '#0085db',
      secondary: '#e5f3fb',
    },
    yellow: {
      primary: '#f8c076',
      secondary: '#fff6ea',
    },
    violet: { 
        primary: 'rgb(187 129 240)',
        secondary: '#e6e6fa',
    },
  };

  @Component({
    selector: 'app-programme',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      CalendarModule,
      FlatpickrModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
      `
        h3 {
          margin: 0 0 10px;
        }

        pre {
          // background-color: #f5f5f5;
          padding: 15px;
        }
      `,
    ],
    templateUrl: './programme.component.html',
    styleUrls: ['../../../../node_modules/angular-calendar/css/angular-calendar.css'],
  })

  export class AppProgrammeComponent {

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

    view: CalendarView = CalendarView.Week;

    CalendarView = CalendarView;

    viewDate: Date = new Date();
    message="";
    minDate = startOfWeek(this.viewDate);
    maxDate = endOfWeek(this.viewDate);
      modalData: {
        action: string;
        event: CustomCalendarEvent;
      } | undefined;
    
    actions: CalendarEventAction[] = [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
          this.handleEvent('Deleted', event);
        },
      },
    ];

    refresh = new Subject<void>();

    events: CustomCalendarEvent[] = [];

    activeDayIsOpen: boolean = true;
  EventColor: any;

  isLoading: boolean = false;

    constructor(private modal: NgbModal ,private edtService: EdtService , private router:Router) {
      this.setEmployeDuTemps();
    }

    private getRandomColorKey(): string {
      const colorKeys = Object.keys(colors); // Get all color keys
      const randomIndex = Math.floor(Math.random() * colorKeys.length); // Generate a random index
      return colorKeys[randomIndex]; // Return a random color key
  }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }

    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event?: CalendarEvent): void {
      if (!event) {
        console.warn('Event is undefined, cannot handle the event.');
        return;
      }

      console.log(event);
    
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }  


    estCoursDans48heures(event: CalendarEvent | undefined): boolean {
      
      if (!event) {
        return false; // Event is undefined, so return false
      }
    
      const currentTime = new Date();
    
      if (isBefore(event.start, currentTime) && !isSameDay(event.start, currentTime)) {
        return true;
      }
    
      const hoursDifference = differenceInHours(event.start, currentTime);
    
      return hoursDifference <= 48;
    }

    deleteEvent(eventToDelete: CalendarEvent) {
      this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
      this.view = view;
      this.setDateMinDateMax();
    }

    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
      this.setDateMinDateMax();
    }
    setDateMinDateMax(){
      if (this.view === CalendarView.Day) {
        this.minDate = startOfDay(this.viewDate);
        this.maxDate = endOfDay(this.viewDate);
      } else if (this.view === CalendarView.Week) {
        this.minDate = startOfWeek(this.viewDate);
        this.maxDate = endOfWeek(this.viewDate);
      } else if (this.view === CalendarView.Month) {
        this.minDate = startOfMonth(this.viewDate);
        this.maxDate = endOfMonth(this.viewDate);
      }
      this.setEmployeDuTemps();
    }


    private setEmployeDuTemps(){
      this.message="";
      this.isLoading = true;
      this.edtService.getEdt(this.minDate,this.maxDate).subscribe(
        (data: any)=> {
          this.events =[];
          for(let item of data){
            const randomColorKey = this.getRandomColorKey(); // Get a random color key
            const randomColor = colors[randomColorKey];
            this.events.push(
              {
                start:new Date(`${item.date}T${item.debut}`),  // Specific date and time: January 1, 2024, 07:00 AM
                end:new Date(`${item.date}T${item.fin}`),    // Specific date and time: January 1, 2024, 09:00 AM
                title: `${item.salle} - ${item.matiere}` ,
                color: { ...randomColor },
                actions: this.actions,
                allDay: false,  // Change to false if you want to specify the time
                resizable: {
                  beforeStart: false, // tsy afaka ovaina ny start anle programme
                  afterEnd: false,
                },
                draggable: false,
                  detail:{
                    "matiere":item.matiere,
                    "enseignant":item.enseignant,
                    "salle":item.salle,
                    "classe":item.classe,
                    "idSalle":item.idSalle,
                    "id": item.id,
                    "estAnnule":item.estAnnule,
                    "debut": item.debut,
                    "fin": item.fin
                }
              }
            );
            this.refresh.next();
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        },
        () => {
          // `finally` callback to ensure `isLoading` is set to false
          this.isLoading = false;
        }
      );
    }

    verifierSalle(edt:{
      "matiere":string,
      "enseignant":string,
      "salle":string,
      "classe":string,
      "idSalle":number,
      "id":number,
      "estAnnule":boolean
  }){
      if(edt.estAnnule){
        return false;
      }
      return parseInt(localStorage.getItem("salle")||"0")==edt.idSalle;
    }

    redirectToFichePresence(idEdt:number) {
      
      this.router.navigate(['/fiche-presence'], { queryParams: { id_edt: idEdt } }).then(() => {
        window.location.reload(); // Recharger la page après la redirection
      });
    }

    annulerCours(event:CustomCalendarEvent){
      const confirmed = confirm("Voulez-vous annulé ce cours?");
      if (confirmed) {
        var idEdt=event.detail?.id!
        this.edtService.annulerEdt(idEdt).subscribe(
          success=>{
              const index = this.events.findIndex(objet => objet.detail?.id === idEdt);

              if (index !== -1) {
                const eventDetail = this.events[index].detail;
                if (eventDetail) {
                  eventDetail.estAnnule = true;  // Affecte la valeur si detail est non nul
                }
              }
            },error => {
              this.message=error.error.erreurs[0].messageErreur
              alert(this.message);
          });
      }
    }
  }
