import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee System';
  items: MenuItem[];
  activeItem: MenuItem;

  constructor() {}

  ngOnInit() {
    this.items = [
        {label: 'Employees', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/employees']},
        {label: 'Highest Average Salaries', icon: 'fa fa-fw fa-calendar', routerLink: ['/highest-salaries']}
    ];

    this.activeItem = this.items[0];
  }
}
