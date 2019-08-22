import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'from-to-filter',
  templateUrl: './from-to-filter.component.html',
  styleUrls: ['./from-to-filter.component.scss']
})
export class FromToFilterComponent implements OnInit {

  fromDateTime;
  toDateTime;

  @Output() submitEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submitClicked(){

    if(this.fromDateTime == null || this.toDateTime == null){
      alert("Please select From and To Dates");
      return;
    }

    this.submitEvent.emit({
      from : this.fromDateTime,
      to: this.toDateTime
    });
  }

}
