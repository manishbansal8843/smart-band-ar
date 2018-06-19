import { Component } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { Observable } from 'rxjs/Observable';
import { MiBandService } from 'src/app/mi-band.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mi Smart band AR expirience';
  pedoStats:Observable<PedoMeterResult>;
  constructor(private miBandService:MiBandService){

  }
  ngOnInit(){
    this.pedoStats=this.miBandService.getSteps();
  }
}
