import { Injectable } from '@angular/core';
import * as MiBand from 'miband/src/miband';
import { map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { PedoMeterResult} from './PedoMeterResult';

@Injectable({
  providedIn: 'root'
})
export class MiBandService {
  private miband:MiBand;
  constructor(public ble: BluetoothCore) {
   }
   getDevice() {
    // call this method to get the connected device
    return this.ble.getDevice$();
  }

  streamValues() {
    // call this method to get a stream of values emitted by the device
    return this.ble.streamValues$().pipe(map((value: DataView) => value.getUint8(0)));
  }
   getSteps(){
    try {
      console.log('calling getsteps');
      return (
        this.ble

          // 1) call the discover method will trigger the discovery process (by the browser)
          .discover$({
            filters: [
              { services: [ MiBand.advertisementService ] }
            ],
            optionalServices: MiBand.optionalServices
          })
          .pipe(
            // 2) get that service
            mergeMap((gatt: BluetoothRemoteGATTServer) => {
              console.log('Got the gatt server');
              this.miband = new MiBand(gatt);
               this.miband.init().then(result=>console.log('mi-band initialized'));
               return from(this.miband.getPedometerStats());
            }),
           
            // 5) on that DataView, get the right value
            map((value: any) => new PedoMeterResult(value.steps,value.distance|0,value.calories|0))
          )
      );
    } catch (e) {
      console.error('Oops! can not read value from '+e);
    }
   }
}
