import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'
import { DisplayMiBandStatsComponent } from 'src/app/digital/display-mi-band-stats.component';
import { ArDisplayMiBandComponent } from 'src/app/ar/ar-display-mi-band.component';
import { DigiDisplayMiBandComponent } from 'src/app/digital/digi-display-mi-band.component';
import { AuthGaurdService } from 'src/app/auth-gaurd.service';

const routes:Routes=[
  {path:'digital-mi-display',component:DisplayMiBandStatsComponent,canActivate:[AuthGaurdService]},
  {path:'ar-mi-display',component:ArDisplayMiBandComponent,canActivate:[AuthGaurdService]},
 // {path:'new-digital-mi-display',component:DigiDisplayMiBandComponent},
  {path: '',   redirectTo: '/', pathMatch: 'full'}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
