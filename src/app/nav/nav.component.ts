import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  accountData : Array<{ SAV_ID: number, customerName: string }>;
  themeToggle : boolean = false;
  textToSearch =  new FormControl();
  matchedResults : Array<{ SAV_ID: number, customerName: string }>;
  smartSearchText
  constructor(private commonService : CommonService , private router : Router) {
   }

  ngOnInit(): void {
    this.commonService.accountData.subscribe((accountData)=>{
      this.accountData = accountData;
    })
  }
 
  themeToggleFn(){
    this.themeToggle = !this.themeToggle; 
    document.getElementsByTagName("body")[0]["dataset"]["theme"] = this.themeToggle?"dark" : "light"
  }

  smartSearch(term){
    //const regex = new RegExp('/'+term+'\\b', 'g');
    if(term && term != ""){
      term = term.toUpperCase();
      this.matchedResults = this.accountData.filter(x=>{
        return x.customerName.includes(term);
      })
    }else{
      this.matchedResults = [];
    }
    
  }

  searchItemClicked(item){
    this.smartSearchText = item.customerName;
    this.matchedResults = [];
    this.router.navigate(['cim/' + item.SAV_ID]);
    setTimeout(()=>{
      this.smartSearchText = "";
    }, 1000)
  }

}
