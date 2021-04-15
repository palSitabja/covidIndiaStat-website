import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatewiseDataComponent } from './statewise-data/statewise-data.component';
import { VaccinationComponent } from './vaccination/vaccination.component';

const routes: Routes = [
  {path:'state',component:StatewiseDataComponent},
  {path:'vaccination',component:VaccinationComponent},
  { path: '**', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
