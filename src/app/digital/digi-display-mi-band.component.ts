import { Component, OnInit,Injector,OnDestroy } from '@angular/core';
import { MiBandService } from 'src/app/mi-band.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { PedoMeterResult } from 'src/app/PedoMeterResult';

@Component({
  selector: 'app-digi-display-mi-band',
  templateUrl: './digi-display-mi-band.component.html',
  styleUrls: ['./digi-display-mi-band.component.css']
})
export class DigiDisplayMiBandComponent implements OnInit,OnDestroy{
  title = 'Mi Smart band AR experience';
  pedoStats:PedoMeterResult;
  miBandService:MiBandService;
  bleNotSupported:boolean;
  scanStarted:boolean=false;
  devicePairedSubscription:Subscription;
  StepsSubscription:Subscription;
  hideAllButARDisplay:boolean=false;
  resultsArrived:boolean=false;
  constructor(private injector: Injector){
    if (!navigator.bluetooth) {
      this.bleNotSupported=true;
    }
    else {
      this.miBandService = <MiBandService>this.injector.get(MiBandService);
      this.devicePairedSubscription=this.miBandService.devicepaired.subscribe((event:string)=>{
       
        this.getSteps();
       });
       this.StepsSubscription=this.miBandService.pedoMeterStats.subscribe((value:PedoMeterResult)=>{ 
         this.resultsArrived=true;     
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
    this.scanStarted=true;
    if(this.miBandService){
     this.miBandService.startPairing();
  }
}

}