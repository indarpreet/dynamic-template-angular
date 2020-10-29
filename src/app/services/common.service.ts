import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public accountData = new Subject<Array<{SAV_ID : number , customerName : string}>>();

  public accountItem = new Subject<{SAV_ID : number , customerName : string}>();

  public resetSearch = new Subject<boolean>();

  public submitForm  = new Subject<boolean>();

  public loadingFlag = new BehaviorSubject<boolean>(true);

  public message = new Subject<MessageModel>();

  userData :  any;
  constructor(private http : HttpClient) { }

  public setSlider(event , min , max):void {
    let newValue = Number(((event.data - min) * 100) / (max - min));
    let newPosition = 10 - (newValue * 0.2);
    event.sliderData = `calc(${newValue}% + (${newPosition}px))`;
  }

  public success(msg){
    let message : MessageModel = {msg : msg , type : "success"};
    this.message.next(message);
    this.loadingFlag.next(false);
  }

  public error(msg){
    let message : MessageModel = {msg : msg , type : "error"};
    this.message.next(message);
    this.loadingFlag.next(false);
  }

  public getUser(){
    const url = "/api/user/me";
    return this.http.get(url);
  }

  public setUserData(userData){
    this.userData = userData;
  }

  public getUserData(){
    return this.userData;
  }

}
