import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { from } from 'rxjs';
import * as moment from 'moment';
import { OrderService } from '../../../common-services-components/services/order.service';

@Component({
  selector: 'sales-and-tax-report',
  templateUrl: './sales-and-tax-report.component.html',
  styleUrls: ['./sales-and-tax-report.component.scss']
})
export class SalesAndTaxReportComponent implements OnInit {

  startingNumber
  reportData;
  amountsSummary;
  from;
  to;

  constructor(private http: HttpClient, private orderService: OrderService) { }

  ngOnInit() {
  }

  showReport(filters){
    this.from = filters.from;
    this.to = filters.to;

    let fromStr = moment(filters.from).format("YYYY-MM-DD HH:mm:ss");
    let toStr = moment(filters.to).format("YYYY-MM-DD HH:mm:ss");
    this.http.get(BaseEndPointService.getBaseEndPoint() + 
      '/api/sales-and-tax-report?from=' + fromStr + '&to=' + toStr)
      .subscribe(resp => {
        this.startingNumber = resp['starting_number'];
        this.reportData = resp['sales_by_orders_data'];
        this.amountsSummary = resp['receipts_summary'];

        this.reportData.forEach(reportRow => {
          reportRow['order_amount_before_discount'] = +reportRow['order_amount_before_discount'];
          reportRow['discount_amount'] = +reportRow['discount_amount'];
          reportRow['sales_tax_amount'] = +reportRow['sales_tax_amount'];
          reportRow['receivable_amount'] = +reportRow['receivable_amount'];
        });

        
      });
  }


}
