import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ContentChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { debounceTime } from 'rxjs/operators'; 

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.css']
})
export class SmartSearchComponent implements OnInit , OnDestroy {
  filteredList : any;
  textToSearch =  new FormControl();
  @Output() onClickOfSearchItem : EventEmitter<any> = new EventEmitter();
  @Output() onClickOfResetSearch : EventEmitter<any> = new EventEmitter();
  @Input() postObject : any;
  @Input() holder : any;
  @Input() jsonField : string;
  @Input() required : boolean;
  @Input() labelToolTip : string;
  searchItem : string;
  isLoading : boolean =false;
  @ContentChild(TemplateRef) smartSearchTemplate;
  //@Input() smartSearchTemplate : TemplateRef<any>;

  constructor(private http : HttpClient , private commonService : CommonService ) { 

    // this.textToSearch.valueChanges
    // .debounceTime(500)
    // .distinctUntilChanged()
    // .filter(term => {
    //   if(term && term.length >= 3){
    //     if(this.searchItem != term){
    //       return term;
    //     }else{
    //       this.searchItem = '';
    //     }
     
    // }
    // else{this.filteredList=[];
    //   if(!term){
    //     this.resetSearch();
    //   }
    // }})
    // .switchMap(term => this.getSearchQueryResults(term))
    // .subscribe(filteredList => {
    //     this.filteredList = filteredList["response"]["item"];
    //     this.isLoading = false;
    // })
  }

  ngOnInit() {
    this.commonService.resetSearch.subscribe(value=>{
      if(value)this.resetSearch();
    }); 
  }

  getSearchQueryResults(searchValue){
      this.isLoading = true;
      this.postObject['searchValue'] = searchValue;
      //return this.http.post(, this.postObject).catch(this.handleError);
   
    
  }

  searchItemClicked(item){
    this.filteredList = [];
    if(typeof item != "string"){
      this.searchItem = item[this.jsonField];
      this.textToSearch.patchValue(item[this.jsonField]);
    }else{
      this.searchItem = item;
      this.textToSearch.patchValue(item);
    }
    this.onClickOfSearchItem.emit([item]);
  }

  resetSearch(){
    this.textToSearch.patchValue(undefined);
    this.filteredList = [];
    this.onClickOfResetSearch.emit();
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}

ngOnDestroy(){
  this.commonService.resetSearch.unsubscribe();
}

}
