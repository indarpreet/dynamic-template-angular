import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.css']
})
export class SmartSearchComponent implements OnInit {

  constructor(private renderer: Renderer2) { }
  @ViewChild("search" , {"static" : false}) smartSearchRef : ElementRef;
  @Input() form;
  @Input() formType;
  @Input() type;
  @Input() dropDownList;
   items : Array<{key : string}>;
   smartSearch : boolean = false;
   searchText : string;
   multiSelectArr : Array<{key : string}> = [];
   multiSelectWorkArr : Array<{key : string}> = [];
   results : string;
   sliderData ;
   min = 0 ;
   max = 100;
   dropDownElements : Array<{selected : boolean , text : string}>;
   filterDropDown;
  ngOnInit() {
    // ["My" , "Mine", "Myself","My" , "Mine", "Myself","My" , "Mine", "Myself","My" , "Mine", "Myself","My" , "Mine", "Myself"];
    this.dropDownElements = [];
    this.dropDownList.forEach(element => {
      if(this.form[this.formType]){
        if(this.form[this.formType].find(dataElement => dataElement == element)){
          this.dropDownElements.push({selected : true , text : element});
        }else{
          this.dropDownElements.push({selected : false , text : element});
        }
      }else{
        this.dropDownElements.push({selected : false , text : element});
      }
     
    });

    this.filterDropDown = _.clone(this.dropDownElements);
    console.log(this.form);
    
      if(this.form[this.formType] && this.form[this.formType].length > 0){
        if(this.type == "custom"){
          this.display();
        }else{
          this.multiSelectArr = _.cloneDeep(this.form[this.formType]);
        }
        
      }else{
        this.form[this.formType] = [];
      }
    
  }

  searching(searchText){
    event.stopPropagation();
    // console.log(searchText);
    // this.items = [
    //   {"key" : "Cisco"} ,
    //   {"key" : "Meraki"},
    //   {"key" : "Refresh"},
    //   {"key" : "Losing Install Base"} ,
    //   {"key" : "0-25%"}
    // ];
    if(searchText != undefined && searchText 
      != '' ){
      this.filterDropDown =  this.dropDownElements.filter(word => word.text.toLowerCase().includes(searchText.toLowerCase()));
    }else{
      this.filterDropDown = _.clone(this.dropDownElements)
    }
    //const result =
  }

  focusFunction(){
    this.smartSearch = true;
    setTimeout(()=>{
      this.smartSearchRef.nativeElement.focus();
      
    },5)
    
  }

  focusOutFunction(){
    this.smartSearch = false;
  }

  // multi select save
  multiSelect(item){
   // this.multiSelectArr.push(item);
   this.form[this.formType].indexOf(item.text) > -1 ?
   this.form[this.formType].splice(this.form[this.formType].indexOf(item.text) , 1) : this.form[this.formType].push(item.text); 
  }
  
  // delete chip
  deleteChip(i , item){
    event.stopPropagation();
    // this.multiSelectArr.splice(item , 1);
    this.form[this.formType].splice(i , 1);
    if(this.filterDropDown){
      this.filterDropDown.find(ele => ele.text == item).selected = false;
    }
  }

  // multi select save
  save(){
    event.stopPropagation();
    //this.results = "<p>" + this.multiSelectArr.join(" ") + "</p>";
    this.multiSelectArr.push(...this.multiSelectWorkArr);
    this.smartSearch = false;
    this.searchText = "";
    this.items = [];
    this.multiSelectWorkArr = [];
    let lastElementId = this.multiSelectArr.length - 1;
    setTimeout(()=>{
      document.getElementById(lastElementId.toString()).scrollIntoView();
    } , 100)
    this.form[this.formType] =  _.cloneDeep(this.multiSelectArr);
  }

  // custom select save
  customSelect(){
    this.cancel();
    this.multiSelectArr = [];
    this.display();
   
  }

  // display in the chip custom select
  private display(){
    this.form[this.formType].forEach(ele => {
      this.multiSelectArr.push({
        'key' :  ele.itemName + "|Base Share: " +
         ele.installBaseShare + "%|losingShare: " + 
         ele.losingShare + "|Competition: " + 
         ele.pickCompetition.map(function(elem){
          return elem.key;
          }).join()});
    });
  }

  cancel(){
    event.stopPropagation();
    this.smartSearch = false;
    this.searchText = "";
    this.items= [];
  }
 
  setSlider(event){
    let newValue =  Number(((event - this.min) * 100) / (this.max - this.min));
    let newPosition = 10 - (newValue * 0.2);      
    this.sliderData = `calc(${newValue}% + (${newPosition}px))`;
    console.log(this.sliderData);
  }

  onClickedOutside(){
    this.smartSearch = false;
    this.filterDropDown = _.clone(this.dropDownElements);
    this.searchText = "";
  }
}
