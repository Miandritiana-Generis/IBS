import { CommonModule, Time } from '@angular/common';
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
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MaterialModule } from '../../material.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Page } from 'src/app/modeles/Page';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IconPhotoQuestion } from 'angular-tabler-icons/icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  id_niveau: number;
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

export interface ListAbsentTotalH {
  nom: string;
  prenom: string;
  imagePath: string;
  classe: string;
  matiere: string;
  totalH: string
}

export interface Search{
  name: string;
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
    MaterialModule,
    PaginationModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
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
  filteredClasseItems: any[] = [];
  niveauItems: NiveauItem[] = [];

  totalAbsence: number | undefined;
  selectedDate: string | undefined;
  selectedClasseId: number | undefined = undefined;
  selectedClasseName: string | undefined;

  selectedClasseTaux: string = '';
  idClasseTaux: number | undefined;
  selectedNiveauTaux: string = '';
  idNiveauTaux: number | undefined;
  monthYear: string = new Date().toISOString().slice(0, 7);

  displayedColumns: string[] = ['etu', 'classe', 'totalH'];
  dataSource: any[] = [];
  AlldataSource: any[] = [];
  expandedElement: any | null = null;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchs: Search[] = [];

  idAnneeScolaire = 0;

  page = 1;
  itemsPerPage: number = 10;
  totalElements = 0;
  totalPages: number = 0;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.searchs.push({ name: value });
      this.applySearchFilter();
    }

    event.chipInput!.clear();
    this.loadAbsentTotalH();
  }

  remove(search: Search): void {
    const index = this.searchs.indexOf(search);

    if (index >= 0) {
      this.searchs.splice(index, 1);
      this.dataSource = [...this.dataSource];
      this.applySearchFilter();
      this.loadAbsentTotalH();
    }
  }

  edit(search: Search, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(search);
      return;
    }

    // Edit existing fruit
    const index = this.searchs.indexOf(search);
    if (index >= 0) {
      this.searchs[index].name = value;
    }

  
  }

  constructor(private dashService: DashService) {

    this.loadAbsentTotalH();

    this.profitExpanceChart = {
      series: [
        {
          name: 'Taux d\'absence',
          data: [0, 0, 0, 0, 0],
          color: '#0085db',
        },
        {
          name: 'Taux de présence',
          data: [0, 0, 0, 0, 0],
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
        categories: ['', '', '', '', ''],
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
    this.loadAbsentTotalH();
  }
  // Method to fetch class list and update classeItems
  getClasseList(): void {
    this.dashService.getListClasse().subscribe(
      (data: any) => {
        this.classeItems = data.map((item: any) => ({
          id: item.id,
          classe: item.classe,
          id_niveau: item.id_niveau
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
    this.dashService.getTaux(
      this.selectedClasseTaux ? this.idClasseTaux : undefined,
      this.selectedNiveauTaux ? this.idNiveauTaux : undefined,
      this.monthYear
    ).subscribe(response => {
      this.updateTaux(response);
    }, error => {
      console.error('Error fetching taux data:', error);
    });
  }
  
  updateTaux(data: TauxData[]) {
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

  onNiveauSelectTaux(selectedNiveau: any): void {
    this.filteredClasseItems = this.classeItems.filter(item => item.id_niveau === selectedNiveau.id);
    this.selectedNiveauTaux = selectedNiveau.nom;
    this.idNiveauTaux = selectedNiveau.id;
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

  clearMonthYearTaux(): void {
    this.monthYear = '';
  }
  
  clearDateTotal(): void {
    this.selectedDate = ''; 
  }

  clearMonthYearList(): void {
    this.idAnneeScolaire = 0; 
    this.loadAbsentTotalH();
  }

  onMonthChangeTotalH(event: any): void {
    this.idAnneeScolaire = event.target.value;
    
    this.loadAbsentTotalH();
  }

  public changerPage(event: any): void {
    console.log("clicked");
    
    this.page = event.page;
    console.log(this.page);
    this.loadAbsentTotalH(); // Reload data based on the new page
  }

  // Method to get the current page data for display
  getPaginatedData(): any[] {
    const start = this.page * this.itemsPerPage;
    return this.dataSource.slice(start, start + this.itemsPerPage);
  }


  toggleRow(row: any): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }


  loadAbsentTotalH(): void {
    const idAnneeScolaire = this.idAnneeScolaire || 0;
    this.dashService.getAbsentTotalH(idAnneeScolaire, this.page).subscribe(
      (data: Page<any>) => {
        this.totalElements = data.totalElements!;
        this.totalPages = data.size!;
        this.dataSource = data.content.map(item => ({
          nom: item.nom || 'N/A',
          prenom: item.prenom || 'N/A',
          photo: item.photo ? 'http://' + item.photo : '',  // Ensure valid photo URL
          classe: item.classe || 'N/A',
          totalHeureAbsence: item.totalHeureAbsence || 'N/A',
          details: item.details && item.details.length > 0 ? item.details : []  // Ensure `details` is an array
        }));
  
        this.applySearchFilter();
        console.log(data);
      },
      (error) => {
        console.error('Error loading absent total hours:', error);
      }
    );
  }

  
  applySearchFilter() {
    let filteredList = [...this.dataSource]; // Use this.dataSource
  
    if (this.searchs.length > 0) {
      const searchTerms = this.searchs.map(search => search.name.toLowerCase());
  
      filteredList = filteredList.filter(item => {
        const nom = item.nom?.toLowerCase() || '';
        const prenom = item.prenom?.toLowerCase() || '';
  
        return searchTerms.some(term =>
          nom.includes(term) || prenom.includes(term)
        );
      });
    }
  
    // Update the filtered data source
    this.dataSource = filteredList; // Assuming you have this property to hold results
  }
  
}
