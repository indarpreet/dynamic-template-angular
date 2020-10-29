import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepsComponent } from './steps/steps.component';
import { CommonTemplateComponent } from './common-template/common-template.component';
import { HeaderComponent } from './header/header.component';
import { DatepickerComponent } from './utils/datepicker/datepicker.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NavComponent } from './nav/nav.component';
import {SmartSearchComponent} from './smart-search/smart-search.component';
import { MessageComponent } from './message/message.component';
import { CimComponent } from './cim/cim.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SmartSearchCustomComponent } from './smart-search/smart-search-custom/smart-search-custom.component';


@NgModule({
  declarations: [
    AppComponent,
    StepsComponent,
    CommonTemplateComponent,
    HeaderComponent,
    DatepickerComponent,
    TimelineComponent,
    NavComponent,
    SmartSearchComponent,
    MessageComponent,
    CimComponent,
    SmartSearchCustomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
