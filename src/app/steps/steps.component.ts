import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {environment} from '../../environments/environment';
import { CommonService } from '../services/common.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  questionare : Array<any>;
  step : string;
  stepId : number = 0;
  userId : string = "isokhi";
  formData : any;
  resetFormData : any;
  percentage : number = 0;
  savId : number;
  customerName: string;
  loggedInUser : string;
  constructor(private route : ActivatedRoute, private commonService : CommonService ,private http : HttpClient) { 
    this.route.data.subscribe((res)=>{
      this.loggedInUser = res['user']['loggedInUser'];
      this.commonService.setUserData(res);
    })
  }

  ngOnInit() {
    this.commonService.submitForm.subscribe(()=>{
      this.commonService.loadingFlag.next(true);
      this.saveProgressAndSubmit();
     // this.http.post(environment.url + "questionnaire/isokhi" , this.formData); 
    })
    //this.commonService.loadingFlag.next(true);
    this.commonService.accountItem.subscribe(accountItem=>{
      this.savId = accountItem.SAV_ID;
      this.customerName = accountItem.customerName;
      this.commonService.loadingFlag.next(true);
      const url = environment.url  + "questionnaire/" + this.loggedInUser + "/" + accountItem.SAV_ID;
      this.http.get<JsonModel>(url).subscribe((data : JsonModel)=>{
        this.loadData(data);
        this.commonService.success("questionnaire loaded successfully.");
      } , (error : JsonModel)=>{
        this.commonService.error(error['error'].message);
      });
      

    })
    
  }
  

  loadData(data){
    this.formData = data.data;
    this.resetFormData = _.cloneDeep(data.data);
    this.questionare = [
      {
        id: 'accountInformation', name: 'Account Information', active: true, visited: false,
         class: 'account-information'
      },
      {
        id: 'customerIntimacy', name: 'Customer Intimacy', active: false, visited: false,
         class: 'customer-intimacy'
      },
      {
        id: 'reinventNetwork', name: 'Reinvent the Network', active: false, visited: false,
        class: 'reinvent-network'
      },
      {
        id: 'embraceMulticloud', name: 'Embrace a Multicloud World', active: false, visited: false,
         class: 'embrace-multicloud'
      },
      {
        id: 'unlockPower', name: 'Unlock Power of Data', active: false, visited: false,
        class: 'unlock-power'
      },
      {
        id: 'security', name: 'Security is Foundational', active: false, visited: false,
         class: 'security'
      },
      {
        id: 'experience', name: 'Create Meaningful Experiences', active: false, visited: false,
         class: 'experience'
      },
      { id: 'complete', name: 'Complete', active: false, visited: false , class: 'complete' }];
  
    this.step = this.questionare[0].id;
    this.questionare.forEach(ele => {
      ele[ele.id] = this.formData[ele.id];
      if(ele.id == 'complete' && ele[ele.id][0].data == undefined){
        ele[ele.id][0].data = 0;
      } 
    });
  }

  fulfilled = false;
 
    sortPosition(array : Array<any>){
      return array.sort((a,b)=>{
        if(a.position < b.position){
          return -1;
        }
      })
    }

  showJson() {
    console.log(this.questionare);
  }

  saveProgressAndSubmit(){
    this.calculatePer();
    console.log(this.formData);
    this.http.post<JsonModel>(environment.url + "questionnaire/save/"+ this.savId +"/"+this.customerName, this.formData).subscribe((data : JsonModel)=>{
      const prevStep = this.step;
      const prevStepId = this.stepId;
      this.loadData(data);
      this.commonService.success("questionnaire saved successfully.")
      this.step = prevStep;
      this.stepId = prevStepId;
    });
  } 

  calculatePer(){
    let result = 0;
    this.questionare.forEach(ele => {
       let formDataArr = ele[ele.id];
      if(ele.id != 'complete'){
        let count = 0;
         formDataArr.forEach(ele => {
           if(ele.data){
             if(typeof ele.data == "object" && Object.keys(ele.data).length > 0){
              count++;
             }
             if(typeof ele.data != "object" ){
               count++;
             }
           }
         }); 
         let formPer = ((count /formDataArr.length ) * 100);
         console.log(ele.id + "--->>> " + formPer);
         result = formPer  + result
      } 
    });
       this.formData['complete'][0].data = Math.floor((result/(this.questionare.length-1)));
  }
  reset(){
 
    
    this.questionare.forEach(ele => {
      if(ele['id'] == this.step){
        ele[this.step] = _.cloneDeep(this.resetFormData[this.step]);
        ele[this.step].forEach(ele => {
          if (ele.formType == 'range') {
            if (ele.data) {
              this.commonService.setSlider(ele , 0 , 500);
            } else {
              ele.data = 0;
              this.commonService.setSlider(ele , 0 , 500);
            }
          }
        });
      } 
    });
    console.log(this.questionare);
    console.log(this.formData[this.step]);
    console.log(this.resetFormData[this.step]);
    this.calculatePer();
  }


  saveAndContinue(){
    
    console.log(this.questionare)
    if(this.stepId <= this.questionare.length - 1 ){
       this.calculatePer();
        this.stepId ++;
        this.step = this.questionare[this.stepId]['id'];
    }
  }
}
