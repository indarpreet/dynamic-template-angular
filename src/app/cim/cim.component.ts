import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cim',
  templateUrl: './cim.component.html',
  styleUrls: ['./cim.component.css']
})
export class CimComponent implements OnInit {

  title = 'cim';
  type = "radio";
  loading : boolean;
  message : MessageModel;
  toggle : boolean = false;
  @ViewChild('scrollTop') scrollTop;
  constructor(private http : HttpClient ,private commonService : CommonService){}

  ngOnInit(){
    this.commonService.message.subscribe(value=>{
      this.message = value;
      this.toggle = true;
      this.scrollTop.nativeElement.scrollIntoView();
      setTimeout(()=>{
        this.toggle = false;
      } , 3000);
     })
    this.commonService.loadingFlag.subscribe(value=>{
      this.loading = value;
    })

    
  }

}
