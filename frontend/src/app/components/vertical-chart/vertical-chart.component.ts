import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss'],
})
export class VerticalChartComponent implements OnInit {

  @Input() view: any;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Income';
  animations = false;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single: any[] = [];

  constructor() { }

  ngOnInit() {
    this.generateRandomData();
  }

  generateRandomData() {
    const data = [];
    const startDate = new Date(2024, 4, 1); // Starting from June 1, 2024 (months are zero-indexed)
    for (let i = 0; i < 30; i++) { // Generating data for 30 days
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      data.push({
        name: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        value: Math.floor(Math.random() * 1000) // Random income value
      });
    }
    this.single = data;
  }

  onSelect(event: any) {
    console.log(event);
  }

}
