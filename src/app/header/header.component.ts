import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import  {environment} from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  questionnaireAccount ;

  constructor(private http : HttpClient ,private commonService : CommonService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.commonService.accountItem.subscribe(item=>{
      this.questionnaireAccount = item;
    })
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
       let found =false;
       this.http.get("assets/smart-search.json").subscribe((data : Array<{SAV_ID : number , customerName : string}>)=>{
         data.forEach(ele => {
           console.log(ele.SAV_ID);
           if(ele.SAV_ID  == id){
             found = true;
             this.questionnaireAccount = ele;
             this.commonService.accountItem.next(ele);
           }
         });
         this.commonService.accountData.next(data);
         if(!found){
           this.commonService.error("No such SAV ID found");
         }
       })
     });
  }
  
  saveProgressAndSubmit(){
    this.commonService.submitForm.next();
  }
}
