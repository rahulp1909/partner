import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private trafficStatusSub : Subscription;
  totalRequestCount = 0;
  partners = [];
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getTrafficDetails('');
    this.trafficStatusSub = this.provider.getTrafficUpdate().subscribe((data: any) => {
      this.totalRequestCount = data.totalRequest;
      this.partners = data.provider;
    })
  }

  updateTraffic(date) {
    const time = date.value.valueOf();
    this.provider.getTrafficDetails(time);
  }

}
