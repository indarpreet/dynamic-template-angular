import { Component, OnInit, ViewChild, Input, Renderer2, ElementRef, APP_INITIALIZER } from '@angular/core';
import { CustomSmartSearch } from '../smart-search-models/CustomSmartSearch';
import * as _ from 'lodash';

@Component({
  selector: 'app-smart-search-custom',
  templateUrl: './smart-search-custom.component.html',
  styleUrls: ['../smart-search.component.css' , './smart-search-custom.component.css']
})
export class SmartSearchCustomComponent implements OnInit {

  constructor(private renderer: Renderer2) { }
  @ViewChild("search" , {"static" : false}) smartSearchRef : ElementRef;
  @Input() form;
  @Input() type;
   items : Array<{key : string}>;
   smartSearch : boolean = false;
   searchText : string;
   multiSelectArr : Array<{key : string}> = [];
   multiSelectWorkArr : Array<{key : string}> = [];
   results : string;
   sliderData ;
   min = 0 ;
   max = 100;
   dropDownElements : Array<CustomSmartSearch>;
   filterDropDown;
   filterIndex = -1;

  ngOnInit() {

    this.initializeSearch();
  
  }

  initializeSearch(){
    this.dropDownElements = [];
    this.form.dropdownValues.dropDownList.forEach(element => {
      if(this.form.data && this.form.data.length > 0){
        let dataItem = this.form.data.find(dataElement => dataElement.itemName == element)
        if(dataItem){
          dataItem.selected = true;
          this.dropDownElements.push(dataItem);
        }else{
          this.dropDownElements.push({selected : false , itemName : element , competition : []});
        }
      }else{
        this.dropDownElements.push({selected : false , itemName : element , competition : []});
      }
     
    });

    this.filterDropDown = this.dropDownElements;
    if(!this.form.data || this.form.data.length == 0){
      this.form.data = new Array<CustomSmartSearch>();
    }
  }

  searching(searchText){
    event.stopPropagation();
    if(searchText != undefined && searchText 
      != '' ){
      this.filterDropDown =  this.dropDownElements.filter(word => word.itemName.toLowerCase().includes(searchText.toLowerCase()));
      this.filterIndex =-1;
    }else{
      this.filterDropDown = this.dropDownElements;
      this.filterIndex =-1;
    }
    //const result =
  }

  focusFunction(){
    this.smartSearch = true;
    this.initializeSearch();
    setTimeout(()=>{
      this.smartSearchRef.nativeElement.focus();
      
    },5)
    
  }

  focusOutFunction(){
    this.smartSearch = false;
  }

  expand(index){
    if(this.filterIndex == index){
      this.filterIndex = -1;
    }else{
      this.filterIndex= index;
    }
    
  }

  // multi select save
  multiSelect(item , index){
   // this.multiSelectArr.push(item);
   let findIndex = this.form.data.findIndex(dataElement => dataElement.itemName == item.itemName);
   if(findIndex != -1){
    this.form.data.splice(findIndex , 1);
   }else{
    this.form.data.push(item); 
   }
  this.filterIndex =-1;
    

  }

  // dislay
  display(selected){
    if(selected.itemName == 'Competition'){
      return selected.itemName +
      "|Targeted take out: " + selected.targetedTakeOut +
      "|Competition: " + selected.competition?.join();
    }
    return selected.itemName +
                "|Base Share: " + selected.installBaseShare + 
                "|Losing Share: " + selected.losingShare +
                "|Refresh: " + selected.refresh;
  }
  
  // delete chip
  deleteChip(i , item){
    event.stopPropagation();
    // this.multiSelectArr.splice(item , 1);
    this.form.data.splice(i , 1);
    if(this.filterDropDown){
      let obj = this.filterDropDown.find(ele => ele.itemName == item.itemName);
      obj.selected = false;
      obj = {};
      obj.itemName = item.itemName;
    }
    this.filterIndex =-1;
  }


  // cancel(){
  //   event.stopPropagation();
  //   this.smartSearch = false;
  //   this.searchText = "";
  //   this.items= [];
  // }


  onClickedOutside(){
    this.smartSearch = false;
    this.filterDropDown = _.clone(this.dropDownElements);
    this.searchText = "";
    this.filterIndex =-1;
  }


  // CUSTOM METHODS 
 
  closePopUp2() {
    this.dropDownElements.forEach(element => {
      element['popUp2'] = false;
    });
  }

  onSelectionChange(text , item){
    item.installBaseShare = text;
  }

}
