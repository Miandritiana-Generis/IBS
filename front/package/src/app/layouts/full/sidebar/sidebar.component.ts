import { Component, OnInit } from '@angular/core';
import { navItems, navItemsPAT } from './sidebar-data';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    if(!localStorage.getItem("isAutoriserDashPAT")){
      for(let item of navItemsPAT){
        navItems.push(item);
      }
    }
  }
}
