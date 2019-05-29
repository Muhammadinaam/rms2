import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { from } from 'rxjs';

@Component({
  selector: 'sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  from;
  to;
  reportData;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  showReport(){
    this.http.get(BaseEndPointService.getBaseEndPoint() + 
      '/api/sales-report?from=' + this.from + '&to=' + this.to)
      .subscribe(resp => {
        this.reportData = resp;
      });
  }

}
