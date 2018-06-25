import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { PedoMeterResult } from 'src/app/PedoMeterResult';

const UUID_BASE = (x) => `0000${x}-0000-3512-2118-0009af100700`

// TODO: eliminate UUID_SHORT when this is fixed:
// https://github.com/thegecko/webbluetooth/issues/5
const UUID_SHORT = (x) => `0000${x}-0000-1000-8000-00805f9b34fb`;
const STEP_CHAR=UUID_BASE('0007');
const UUID_SERVICE_GENERIC_ACCESS =     UUID_SHORT('1800')
const UUID_SERVICE_GENERIC_ATTRIBUTE =  UUID_SHORT('1801')
const UUID_SERVICE_DEVICE_INFORMATION = UUID_SHORT('180a')
const UUID_SERVICE_FIRMWARE =           UUID_BASE('1530')
const UUID_SERVICE_ALERT_NOTIFICATION = UUID_SHORT('1811')
const UUID_SERVICE_IMMEDIATE_ALERT =    UUID_SHORT('1802')
const UUID_SERVICE_HEART_RATE =         UUID_SHORT('180d')
const UUID_SERVICE_MIBAND_1 =           UUID_SHORT('fee0')
const UUID_SERVICE_MIBAND_2 =           UUID_SHORT('fee1')

@Injectable({
  providedIn: 'root'
})
export class MiBandService2Service {

  //static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  //static GATT_PRIMARY_SERVICE = 'battery_service';
  initialPedoMeterResult:PedoMeterResult;

  static get advertisementService() { return 0xFEE0; }

  static get optionalServices() { return [
    UUID_SERVICE_GENERIC_ACCESS,
    UUID_SERVICE_GENERIC_ATTRIBUTE,
    UUID_SERVICE_DEVICE_INFORMATION,
    UUID_SERVICE_FIRMWARE,
    UUID_SERVICE_ALERT_NOTIFICATION,
    UUID_SERVICE_IMMEDIATE_ALERT,
    UUID_SERVICE_HEART_RATE,
    UUID_SERVICE_MIBAND_1,
    UUID_SERVICE_MIBAND_2,
  ] }

  constructor(public ble: BluetoothCore) {}

  getFakeValue() {
    this.ble.fakeNext();
  }

  getDevice() {
    // call this method to get the connected device
    return this.ble.getDevice$();
  }

  streamValues() {
    // call this method to get a stream of values emitted by the device
    return this.ble.streamValues$();//.pipe(map((value: DataView) => value.getUint8(0)));
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return Emites the value of the requested service read from the device
   */
  getPedoStats() {
    console.log('getting pedo stats while discovery');

    try {
      return (
        this.ble

          // 1) call the discover method will trigger the discovery process (by the browser)
          .discover$({
            filters: [
              { services: [ MiBandService2Service.advertisementService ] }
            ],
            optionalServices: MiBandService2Service.optionalServices
          })
          .pipe(
            // 2) get that service
            mergeMap((gatt: BluetoothRemoteGATTServer) => {
              return this.ble.getPrimaryService$(gatt, UUID_SERVICE_MIBAND_1);
            }),
            // 3) get a specific characteristic on that service
            mergeMap((primaryService: BluetoothRemoteGATTService) => {
              return this.ble.getCharacteristic$(primaryService,STEP_CHAR);
            }),
            // 4) ask for the value of that characteristic (will return a DataView)
            mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
              console.log('got the characterisitc inside service');
              return this.ble.readValue$(characteristic);
            }),
            // 5) on that DataView, get the right value
            map((data: DataView) => {
              console.log('got the data. last.');
             // let data1 = Buffer.from(data.buffer);
              //console.log('got the data :'+data.buffer.length);
              this.initialPedoMeterResult=new PedoMeterResult(data.getUint16(1,true),data.getUint32(5,true),data.getUint32(9,true));
              return this.initialPedoMeterResult;
            }
          )
      ));
    } catch (e) {
      console.error('Oops! can not read value from %s');
    }
  }
}
