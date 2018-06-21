import { Component } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { Observable } from 'rxjs/Observable';
import { MiBandService } from 'src/app/mi-band.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Injector } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Mi Smart band AR experience';
  pedoStats:PedoMeterResult;
  miBandService:MiBandService;
  bleNotSupported:boolean;
  ifPaired:boolean=false;
  devicePairedSubscription:Subscription;
  StepsSubscription:Subscription;

  constructor(private injector: Injector){
    if (!navigator.bluetooth) {
      this.bleNotSupported=true;
    }
    else {
      this.miBandService = <MiBandService>this.injector.get(MiBandService);
      this.devicePairedSubscription=this.miBandService.devicepaired.subscribe((event:string)=>{
        this.ifPaired=true;
       });
       this.StepsSubscription=this.miBandService.pedoMeterStats.subscribe((value:PedoMeterResult)=>{      
        this.pedoStats=value;
      });
    }
  }
  ngOnInit(){
   
  }
  ngOnDestroy(){
  if(this.devicePairedSubscription)
  this.devicePairedSubscription.unsubscribe();
  if(this.StepsSubscription)
  this.StepsSubscription.unsubscribe();
  }
  getSteps(){
    
    if(this.miBandService)
    this.miBandService.getSteps();
    
  }

  doPairing(){
    this.ifPaired=false;
    if(this.miBandService){
     this.miBandService.startPairing();
  }
}
}
