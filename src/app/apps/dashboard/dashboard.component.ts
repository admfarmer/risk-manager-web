import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // this.alertService.success();
  }
}
