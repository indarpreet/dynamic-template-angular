import { Component, OnInit, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() form;
  @Input() label;
  date : NgbDateStruct
  constructor() { }

  ngOnInit(): void {
    if(this.form.data[this.label]){
      this.date = this.form.data[this.label];
    }
  }

  onChange(event){
    if(typeof this.form.data == 'string'){
      this.form.data = {};
    }
    this.form.data[this.label] = this.date;
  }
}
