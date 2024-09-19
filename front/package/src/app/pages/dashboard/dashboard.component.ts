import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DashService } from 'src/app/services/dash.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface month {
  value: string;
  viewValue: string;
}

export interface profitExpanceChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface trafficChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface salesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface ClasseItem {
  id: number;
  classe: string;
}

export interface NiveauItem {
  id: number;
  nom: string;
}

export interface TauxData {
  monthYear: string;
  absentCount: number;
  presentCount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class AppDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public profitExpanceChart!: Partial<profitExpanceChart> | any;
  public salesChart!: Partial<salesChart> | any;

  // recent transaction
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];

  classeItems: ClasseItem[] = [];
  niveauItems: NiveauItem[] = [];

  totalAbsence: number | undefined;
  selectedDate: string | undefined;
  selectedClasseId: number | undefined = undefined;
  selectedClasseName: string | undefined;

  selectedClasseTaux: string = '';
  idClasseTaux: number | undefined;
  selectedNiveauTaux: string = '';
  idNiveauTaux: number | undefined;
  monthYear: string = '';

  constructor(private dashService: DashService) {

    this.profitExpanceChart = {
      series: [
        {
          name: 'Taux d\'absence',
          data: [1, 1, 1, 7, 1],
          color: '#0085db',
        },
        {
          name: 'Taux de présence',
          data: [6, 3, 9, 5, 4],
          color: '#fb977d',
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 6,
          endingShape: "rounded",
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: ['Jan 2024', 'Fev 2024', 'Mars 2024', 'Avril 2024', 'Mai 2024'],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
    
    // mohtly earnings chart
    this.salesChart = {
      series: [
        {
          name: '',
          color: '#8763da',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }

  ngOnInit(){
    this.monthYear = this.monthYear || '';
    this.getClasseList();
    this.getTotalAbsence();
    this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getNiveauList();
    this.getTaux();
  }
  // Method to fetch class list and update classeItems
  getClasseList(): void {
    this.dashService.getListClasse().subscribe(
      (data: any) => {
        this.classeItems = data.map((item: any) => ({
          id: item.id,
          classe: item.classe
        }));
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  getTotalAbsence(): void {
    this.dashService.getTotalAbsence(this.selectedDate, this.selectedClasseId).subscribe(
      (count: number) => {
        console.log('API response total abs:', count);
        this.totalAbsence = count;
      },
      (error) => {
        console.error('Error fetching total absence:', error);
      }
    );
  }

  // Called when the user changes the date
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.getTotalAbsence();
  }

  // Called when the user selects a class
  onSelectClasse(item: any): void {
    this.selectedClasseId = item.id;
    this.selectedClasseName = item.classe;
    this.getTotalAbsence();
  }

  clearSelectedClasse(): void {
    this.selectedClasseId = undefined;
    this.selectedClasseName = '';
    this.getTotalAbsence(); // Fetch total absence without idClasse
  }
  

  getNiveauList(): void {
    this.dashService.getListNiveau().subscribe(
      (data: any) => {
        this.niveauItems = data.map((item: any) => ({
          id: item.id,
          nom: item.nom
        }));
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }


  getTaux() {
    console.log('Request Parameters:');
    console.log('ID Classe:', this.idClasseTaux);
    console.log('ID Niveau:', this.idNiveauTaux);
    console.log('Month Year:', this.monthYear);
    this.dashService.getTaux(
      this.selectedClasseTaux ? this.idClasseTaux : undefined,
      this.selectedNiveauTaux ? this.idNiveauTaux : undefined,
      this.monthYear
    ).subscribe(response => {
      console.log('API Response:', response);
      this.updateTaux(response);
    }, error => {
      console.error('Error fetching taux data:', error);
    });
  }
  
  updateTaux(data: TauxData[]) {
    console.log('Data for Chart:', data);
    this.profitExpanceChart = {
      series: [
        {
          name: 'Nombre d\'absence',
          data: data.map(d => d.absentCount),
          color: '#fb977d',
        },
        {
          name: 'Nombre de présence',
          data: data.map(d => d.presentCount),
          color: '#0085db',
        },
      ],
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 6,
          endingShape: "rounded",
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: data.map(d => this.formatMonthYear(d.monthYear)),
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: { style: { cssClass: 'grey--text lighten-2--text fill-color' } },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
  }
  

  onClassSelectTaux(classe: any) {
    this.selectedClasseTaux = classe.classe;
    this.idClasseTaux = classe.id;
    this.getTaux();
  }

  onNiveauSelectTaux(niveau: any) {
    this.selectedNiveauTaux = niveau.nom;
    this.idNiveauTaux = niveau.id;
    this.getTaux();
  }

  onMonthChange(value: string) {
    this.monthYear = value;
    this.getTaux();
  }  

  clearSelection() {
    this.selectedClasseTaux = '';
    this.selectedNiveauTaux = '';
    this.idClasseTaux = undefined;
    this.idNiveauTaux = undefined;
    this.getTaux();
  }
  
  formatMonthYear(monthYear: string): string {
    const date = new Date(monthYear);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
  

}
