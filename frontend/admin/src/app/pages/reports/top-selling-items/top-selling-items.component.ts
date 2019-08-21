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
    this.createCharts();
  }

  showReport(filters){
    this.from = filters.from;
    this.to = filters.to;

    let fromStr = moment(filters.from).format("YYYY-MM-DD HH:mm:ss");
    let toStr = moment(filters.to).format("YYYY-MM-DD HH:mm:ss");
    this.http.get(BaseEndPointService.getBaseEndPoint() + 
      '/api/sales-report?from=' + fromStr + '&to=' + toStr)
      .subscribe(resp => {
        this.reportData = resp['sales_by_orders_data'];

        this.reportData.forEach(reportRow => {
          reportRow['order_amount_before_discount'] = +reportRow['order_amount_before_discount'];
          reportRow['discount_amount'] = +reportRow['discount_amount'];
          reportRow['sales_tax_amount'] = +reportRow['sales_tax_amount'];
          reportRow['receivable_amount'] = +reportRow['receivable_amount'];
        });

        
      });

    this.createCharts();
  }

  createCharts() {
    this.topItemsQtyChart = new Chart('topItemsQtyChart', {
        type: 'pie',
        data: {
            datasets: [{
                data: [10, 20, 30]
            }],
            backgroundColor: [

            ],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]
        },
        //options: null
    });
  }

}
