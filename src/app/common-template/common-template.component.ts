import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-common-template',
  templateUrl: './common-template.component.html',
  styleUrls: ['./common-template.component.css']
})
export class CommonTemplateComponent implements OnInit {

  constructor(private commonService : CommonService , private eleRef: ElementRef) { }
  min = 0;
  max = 500;
  @Input() formObject: any = [];

  ngOnInit(): void {
    if (this.formObject) {
      this.formObject.forEach(ele => {
        if (ele.formType == 'range') {
          if (ele.data) {
            this.commonService.setSlider(ele , this.min , this.max);
          } else {
            ele.data = 0;
            this.commonService.setSlider(ele , this.min , this.max);
          }
        }
      });
    }
  }

  setSlider(ele){
    this.commonService.setSlider(ele , this.min , this.max);
  }
  

}
