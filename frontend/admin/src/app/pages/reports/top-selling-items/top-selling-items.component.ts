import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'top-selling-items',
  templateUrl: './top-selling-items.component.html',
  styleUrls: ['./top-selling-items.component.scss']
})
export class TopSellingItemsComponent implements OnInit {

  reportData;
  from;
  to;

  topItemsQtyChart;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  showReport(filters){
    this.from = filters.from;
    this.to = filters.to;

    let fromStr = moment(filters.from).format("YYYY-MM-DD HH:mm:ss");
    let toStr = moment(filters.to).format("YYYY-MM-DD HH:mm:ss");
    this.http.get(BaseEndPointService.getBaseEndPoint() + 
      '/api/top-selling-items-report?from=' + fromStr + '&to=' + toStr)
      .subscribe(resp => {
        this.reportData = resp;
        
        this.createCharts();
      });

  }

  createCharts() {
    let qtyData = {
      datasets: [{
        data: [],
        backgroundColor: []
      }],
      labels: [],
    };

    let amountData = {
      datasets: [{
        data: [],
        backgroundColor: []
      }],
      labels: [],
    };

    if(this.reportData && this.reportData['top_selling_items_qty']) {

      this.createDataForChart(qtyData, 'top_selling_items_qty', 'quantity');

      this.topItemsQtyChart = new Chart('topItemsQtyChart', {
          type: 'pie',
          data: qtyData
          //options: null
      });
    }

    if(this.reportData && this.reportData['top_selling_items_amount']) {

      this.createDataForChart(qtyData, 'top_selling_items_amount', 'amount');

      this.topItemsQtyChart = new Chart('topItemsAmountChart', {
          type: 'pie',
          data: amountData,
          //options: null
      });
    }
  }


  private createDataForChart(reportData: { datasets: { data: any[]; backgroundColor: any[]; }[]; labels: any[]; },
    reportDataName: string, reportColumnName: string) {
    this.reportData[reportDataName].forEach(row => {
      reportData.datasets[0].data.push(row[reportColumnName]);
      let r = Math.floor(Math.random() * 200);
      let g = Math.floor(Math.random() * 200);
      let b = Math.floor(Math.random() * 200);
      let color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      reportData.datasets[0].backgroundColor.push(color);
      reportData.labels.push(row['item_name']);
    });
  }
}
