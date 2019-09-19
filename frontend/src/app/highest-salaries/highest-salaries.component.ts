import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HighestSalariesAPIService } from './highest-salaries-api.service';
import { HighestSalaries } from './highest-salaries.model'

@Component({
  selector: 'app-highest-salaries',
  templateUrl: './highest-salaries.component.html',
  styleUrls: ['./highest-salaries.component.css']
})
export class HighestSalariesComponent implements OnInit, OnDestroy {
  highestSalariesListSubs: Subscription;
  highestSalariesList: HighestSalaries[];

  constructor(private highestSalariesAPI: HighestSalariesAPIService) { }

  ngOnInit() {
    this.highestSalariesListSubs = this.highestSalariesAPI
      .getHighestAvgSalaries()
      .subscribe(res => {
        this.highestSalariesList = res;
      },
      console.error
    );
  }

  ngOnDestroy() {
      this.highestSalariesListSubs.unsubscribe();
  }

}
