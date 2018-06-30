import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { NgZone, Injector } from '@angular/core';
import { MiBandService2Service } from 'src/app/mi-band-service-2.service';
import { timer } from 'rxjs/Observable/timer';

@Component({
  selector: 'app-ar-display-mi-band',
  templateUrl: './ar-display-mi-band.component.html',
  styleUrls: ['./ar-display-mi-band.component.css']
})
export class ArDisplayMiBandComponent implements OnInit {

  @ViewChild('leftPlane')
  leftPlaneEle: ElementRef;
  @ViewChild('frontPlane')
  frontPlaneEle: ElementRef;
  @ViewChild('rightPlane')
  rightPlaneEle: ElementRef;
  @ViewChild('backPlane')
  backPlaneEle: ElementRef;
  bleDate:string;
  days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  pedoMeterStat: PedoMeterResult;
  device: any = {};
  miBandService: MiBandService2Service;
  bleNotSupported: boolean;
  constructor(private _zone: NgZone, private injector: Injector, private renderer: Renderer2) {
    if (!navigator.bluetooth) {
      this.bleNotSupported = true;
    }
    else {
      this.miBandService = <MiBandService2Service>this.injector.get(MiBandService2Service);

    }
  }

  updateBLEDate(){
    console.log('updating ble date');
    let today = new Date();
    this.bleDate=''+today.getHours();//+':'+today.getMinutes()+'\n'+this.days[today.getDay()]+','+this.months[today.getMonth()]+' '+today.getDate();

  }
  ngOnInit() {
    if (!this.bleNotSupported) {
      this.getDeviceStatus();
      this.streamValues();
      this.pedoMeterStat = this.miBandService.initialPedoMeterResult;
     
       timer(0,5000).subscribe(this.updateBLEDate);
     
    }
  }

  streamValues() {
    this.miBandService.streamValues().subscribe((data) => {
      //console.log('from streaming');
      this.showPedometerStats(new PedoMeterResult(data.getUint16(1, true), data.getUint32(5, true), data.getUint32(9, true)));

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


  showPedometerStats(value: PedoMeterResult) {
    // force change detection
    this._zone.run(() => {
      console.log('Reading pedo results level:'+JSON.stringify(value));
      this.pedoMeterStat = value;
    });
  }

 /* ngDoCheck(): void {
    let today = new Date();
    if (this.leftPlaneEle && this.rightPlaneEle && this.backPlaneEle && this.frontPlaneEle) {
      this.renderer.setAttribute(this.leftPlaneEle.nativeElement, 'value', `Step Count\n\n${this.pedoMeterStat.steps}`);
      this.renderer.setAttribute(this.rightPlaneEle.nativeElement, 'value', `Calories\n\n${this.pedoMeterStat.calories}`);
      this.renderer.setAttribute(this.backPlaneEle.nativeElement, 'value', `Distance\n\n${this.pedoMeterStat.distance}`);
      this.renderer.setAttribute(this.frontPlaneEle.nativeElement, 'value', `${today.getHours()}:${today.getMinutes()}\n${this.days[today.getDay()]}, ${this.months[today.getMonth()]} ${today.getDate()}`);

    }

  }*/
}
