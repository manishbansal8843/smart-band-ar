import { Component } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { Observable } from 'rxjs/Observable';
import { MiBandService } from 'src/app/mi-band.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Injector } from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mi Smart band AR experience';
  pedoStats:Observable<PedoMeterResult>;
  miBandService:MiBandService;
  bleNotSupported:boolean;
  constructor(private injector: Injector){
    if (!navigator.bluetooth) {
      this.bleNotSupported=true;
    }
    else {
      this.miBandService = <MiBandService>this.injector.get(MiBandService);
    }
  }
  ngOnInit(){
   
  }
  getSteps(){
    
    if(this.miBandService)
    this.pedoStats=this.miBandService.getSteps();
    
  }
}
