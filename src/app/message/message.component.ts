import { Component, Input, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit , AfterViewInit {
 @Input() message :MessageModel;



 ngOnInit(){
  
 }

 ngAfterViewInit(){
 }
}
