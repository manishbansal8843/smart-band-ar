import { Component, OnInit } from '@angular/core';
import { MiBandService2Service } from 'src/app/mi-band-service-2.service';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { NgZone } from '@angular/core';
import { Injector } from '@angular/core';

@Component({
  selector: 'app-display-mi-band-stats',
  templateUrl: './display-mi-band-stats.component.html',
  styleUrls: ['./display-mi-band-stats.component.css']
})
export class DisplayMiBandStatsComponent implements OnInit {
  pedoMeterStat: PedoMeterResult;
  device: any = {};
  miBandService:MiBandService2Service;
  bleNotSupported:boolean;
  resultsArrived:boolean=false;
  scanStarted:boolean=false;
  constructor(private _zone: NgZone,private injector: Injector) {
    if (!navigator.bluetooth) {
      this.bleNotSupported=true;
    }
    else {
      this.miBandService = <MiBandService2Service>this.injector.get(MiBandService2Service);
     
    }
   }

  ngOnInit() {
    if(!this.bleNotSupported){
    this.getDeviceStatus();
    this.streamValues();
    this.pedoMeterStat=this.miBandService.initialPedoMeterResult;
    }
  }

  streamValues() {
    this.miBandService.streamValues().subscribe((data)=>{
     // console.log('got the data in stream.'+JSON.stringify(data));
              //let data1 = Buffer.from(data.buffer);
             // console.log('got the data in stream:'+data.getUint16(1,true));
             // console.log('got the data in stream:'+data.getUint32(5,true));
             // console.log('got the data in stream:'+data.getUint32(9,true));
              console.log('from streaming');
              this.showPedometerStats( new PedoMeterResult(data.getUint16(1,true),data.getUint32(5,true),data.getUint32(9,true)));
           
    });
  }

  getDeviceStatus() {
    this.miBandService.getDevice().subscribe(device => {
      if (device) {
        this.device = device;
      } else {
        // device not connected or disconnected
        this.device = null;
        this.pedoMeterStat = null;
      }
    });
  }

  /*getPedometerStats() {
    this.scanStarted=true;
    return this.miBandService.getBatteryLevel().subscribe(this.showPedometerStats.bind(this));
  }*/

  showPedometerStats(value: PedoMeterResult) {
    // force change detection
    this._zone.run(() => {
      console.log('Reading pedo results level:'+JSON.stringify(value));
      this.resultsArrived=true;
      this.pedoMeterStat =  value;
    });
  }

}
