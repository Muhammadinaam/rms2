import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

@Component({
  selector: 'top-areacodes',
  templateUrl: './top-areacodes.component.html',
  styleUrls: ['./top-areacodes.component.scss']
})
export class TopAreacodesComponent implements OnInit {

  reportData;
  from;
  to;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  showReport(filters){
    this.from = filters.from;
    this.to = filters.to;

    let fromStr = moment(filters.from).format("YYYY-MM-DD HH:mm:ss");
    let toStr = moment(filters.to).format("YYYY-MM-DD HH:mm:ss");
    this.http.get(BaseEndPointService.getBaseEndPoint() + 
      '/api/top-areacodes-report?from=' + fromStr + '&to=' + toStr)
      .subscribe(resp => {
        this.reportData = resp['top_areacodes'];
      });

  }

}
