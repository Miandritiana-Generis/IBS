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
  isBefore
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
  green: {
    primary: '#4bd08b',
    secondary: '#dffff3',
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

  modalData: {
    action: string;
    event: CalendarEvent;
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

  events: CalendarEvent[] = [
    {
      start: new Date(2024, 0, 1, 7, 0),  // Specific date and time: January 1, 2024, 07:00 AM
      end: new Date(2024, 0, 1, 9, 0),    // Specific date and time: January 1, 2024, 09:00 AM
      title: 'Tes matiere',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false, // tsy afaka ovaina ny start anle programme
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 0, 1, 9, 0),  // Specific date and time: January 1, 2024, 09:00 AM
      end: new Date(2024, 0, 1, 12, 0),    // Specific date and time: January 1, 2024, 12:00 PM
      title: 'Tes matiere',
      color: { ...colors['yellow'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 23, 7, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 23, 9, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['blue'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 24, 10, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 24, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 23, 9, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 23, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['yellow'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 23, 9, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 23, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['yellow'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 25, 9, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 25, 12, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['yellow'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 26, 13, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 26, 15, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['yellow'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: new Date(2024, 7, 22, 13, 0),  // Specific date and time: August 22, 2024, 09:00 AM
      end: new Date(2024, 7, 22, 15, 0),    // Specific date and time: August 24, 2024, 05:00 PM
      title: 'Tes matiere',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: false,  // Change to false if you want to specify the time
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
  ];

  activeDayIsOpen: boolean = true;
EventColor: any;

  constructor(private modal: NgbModal) {}

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
  
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }  

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  estCoursDans48heures(event: CalendarEvent | undefined): boolean {
    if (!event) {
      return false; // Event is undefined, so return false
    }
  
    const currentTime = new Date();
  
    // Check if the event date is in the past
    if (isBefore(event.start, currentTime) && !isSameDay(event.start, currentTime)) {
      return true;
    }
  
    // Calculate the difference in hours between the event start time and the current time
    const hoursDifference = differenceInHours(event.start, currentTime);
  
    // Return true if the event is within the next 48 hours
    return hoursDifference <= 48;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
