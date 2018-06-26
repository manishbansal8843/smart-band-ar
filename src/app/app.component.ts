import { Component,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { Observable } from 'rxjs/Observable';
import { MiBandService2Service } from 'src/app/mi-band-service-2.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Injector } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';
import { AuthGaurdService } from 'src/app/auth-gaurd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Mi Smart band AR experience';
  @ViewChild('PairingButton') pairingButton:ElementRef;
  PairDeviceButtonLabel:string='Pair Device';
  disablePairingButton:boolean=false;
  //pedoStats:PedoMeterResult;
  miBandService:MiBandService2Service;
  errorDuringPairing:boolean=false;
  pairingErrorMssg:string;
  bleNotSupported:boolean;
  ifPaired:boolean=false;
  pairingStarted:boolean=false;
  //devicePairedSubscription:Subscription;
  //StepsSubscription:Subscription;
  hideAllButARDisplay:boolean=false;

  constructor(private injector: Injector,private router:Router,private authgaurd:AuthGaurdService,private renderer:Renderer2){
    if (!navigator.bluetooth) {
      this.bleNotSupported=true;
    }
   else {
      this.miBandService = <MiBandService2Service>this.injector.get(MiBandService2Service);
     /*  this.devicePairedSubscription=this.miBandService.devicepaired.subscribe((event:string)=>{
        this.ifPaired=true;
       });
       this.StepsSubscription=this.miBandService.pedoMeterStats.subscribe((value:PedoMeterResult)=>{      
        this.pedoStats=value;
      }); */
    }
  }
  ngOnInit(){
   
  }
  ngOnDestroy(){
 /* if(this.devicePairedSubscription)
  this.devicePairedSubscription.unsubscribe();
  if(this.StepsSubscription)
  this.StepsSubscription.unsubscribe();*/
  }
 /* getSteps(){
    
    if(this.miBandService)
    this.miBandService.getSteps();
    
  }*/

  doPairing(){
    this.PairDeviceButtonLabel='Pairing..Please Wait.';
    //this.renderer.setProperty(this.pairingButton.nativeElement,'disabled','true');
    this.disablePairingButton=true;
    this.renderer.setStyle(this.pairingButton.nativeElement,'background-color','grey');
    this.errorDuringPairing=false;
    this.pairingStarted=true;
    if(this.miBandService){
     this.miBandService.getPedoStats().subscribe(()=>{
      this.ifPaired=true;
      this.authgaurd.childRoutesEnabled=true;
     },error=>{
      this.pairingStarted=false;
      this.PairDeviceButtonLabel='Pair Device';
      this.renderer.setStyle(this.pairingButton.nativeElement,'background-color','green');
     // this.renderer.setProperty(this.pairingButton.nativeElement,'disabled','false');
     this.disablePairingButton=false;
      this.errorDuringPairing=true;
      this.pairingErrorMssg=error;
     });
  }
}
displayDigitalMiDisplay(){
  this.router.navigate(['digital-mi-display']);
}
displayARMiDisplay(){
  this.router.navigate(['ar-mi-display']);
  this.hideAllButARDisplay=true;
}
displayNewDigitalMiDisplay(){
  this.router.navigate(['new-digital-mi-display']);

}
}
