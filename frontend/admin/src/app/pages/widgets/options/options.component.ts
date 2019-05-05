import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  @Input() options;
  @Output() optionsChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  addOption()
  {
    if(this.options == null)
    {
      this.options = [];
    }

    this.options.push({
      name: '',
      type: 'Single',
    });
    this.optionsChange.emit(this.options);
  }

  deleteOption(i)
  {
    if(confirm('Are you sure you want to delete this option') == true)
    {
      this.options.splice(i, 1);
    }
  }

  addOptionItem(i)
  {
    if(this.options[i].options_items == null)
    {
      this.options[i].options_items = [];
    }

    this.options[i].options_items.push({
      name: '',
      price: 0,
    });
  }

  deleteOptionItem(i, j)
  {
    this.options[i].options_items.splice(j, 1);
  }

}
