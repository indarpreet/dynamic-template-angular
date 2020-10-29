import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CimComponent } from './cim/cim.component';
import { CimResolverService } from './services/cim-resolver.service';

const routes: Routes = [
  { path: 'cim/:id', component : CimComponent  , resolve : { user : CimResolverService}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
