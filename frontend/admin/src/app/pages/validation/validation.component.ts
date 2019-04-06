import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  @Input('field') field;
  @Input('fieldName') fieldName;
  @Input('min') min;
  @Input('max') max;

  constructor() { }

  ngOnInit() {
  }

}
