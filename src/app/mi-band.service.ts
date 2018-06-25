import { Injectable } from '@angular/core';
import * as MiBand from 'miband/src/miband';
import { map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
//import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { PedoMeterResult} from './PedoMeterResult';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class MiBandService {
  private miband:MiBand;
  public pedoMeterStats:EventEmitter<PedoMeterResult>=new EventEmitter() ;
  public devicepaired:EventEmitter<string>=new EventEmitter() ;
  private bleDiscoverySubscription:Subscription;
  constructor(/*public ble: BluetoothCore*/) {
   }
  /*  getDevice() {
    return this.ble.getDevice$();
  }

  streamValues() {
    return this.ble.streamValues$().pipe(map((value: DataView) => value.getUint8(0)));
  } */

  async startPairing2(){
    try {
      console.log('Requesting Bluetooth Device...');
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [ MiBand.advertisementService ] }
        ],
        optionalServices: MiBand.optionalServices
      });
  
      device.addEventListener('gattserverdisconnected', () => {
        console.log('Device disconnected');
      });
  
      await device.gatt.disconnect();
  
      console.log('Connecting to the device...');
      const server = await device.gatt.connect();
      console.log('Connected');
      return server;
     // let miband = new MiBand(server);
  
      //await miband.init();
  
  
    } catch(error) {
      console.log('Argh!', error);
    }
  }

  startPairing(){
    try {
      console.log('calling getsteps');
      //return (
        if(this.bleDiscoverySubscription){
          this.bleDiscoverySubscription.unsubscribe();
        }
       this.bleDiscoverySubscription= 
       
       /*this.ble
          .discover$({
            filters: [
              { services: [ MiBand.advertisementService ] }
            ],
            optionalServices: MiBand.optionalServices
          }).subscribe((gatt: BluetoothRemoteGATTServer) => {
            console.log('Got the gatt server');
            this.miband = new MiBand(gatt);
             this.miband.init().then(result=>{
               console.log('mi-band initialized');
             this.devicepaired.emit('Paired');
              
             }
            );
          });*/
          from(this.startPairing2()).subscribe((gatt: BluetoothRemoteGATTServer) => {
            console.log('Got the gatt server');
            this.miband = new MiBand(gatt);
             this.miband.init().then(result=>{
               console.log('mi-band initialized');
             this.devicepaired.emit('Paired');
              
             }
            );
          });
          /* .pipe(
            mergeMap((gatt: BluetoothRemoteGATTServer) => {
              console.log('Got the gatt server');
              this.miband = new MiBand(gatt);
               this.miband.init().then(result=>{
                 console.log('mi-band initialized');
               this.devicepaired.emit('Paired');
                
               }
              );
               return this.devicepaired;
            })
           
            
          ) */
     // );
    } catch (e) {
      console.error('Oops! can not pair device '+e);
    }
  }

  getSteps(){
    let pedoResult:Promise<any>= this.miband.getPedometerStats();
                pedoResult.then(res=>{
                  this.pedoMeterStats.emit(new PedoMeterResult(res.steps,res.distance|0,res.calories|0));
                });
               // return this.pedoMeterStats;      
  }
   /* getSteps(){
    try {
      console.log('calling getsteps');
      return (
        this.ble

          .discover$({
            filters: [
              { services: [ MiBand.advertisementService ] }
            ],
            optionalServices: MiBand.optionalServices
          })
          .pipe(
            mergeMap((gatt: BluetoothRemoteGATTServer) => {
              console.log('Got the gatt server');
              this.miband = new MiBand(gatt);
               this.miband.init().then(result=>{
                 console.log('mi-band initialized');
                let pedoResult:Promise<any>= this.miband.getPedometerStats();
                pedoResult.then(res=>{
                  this.pedoMeterStats.emit(new PedoMeterResult(res.steps,res.distance|0,res.calories|0));
                });
                
               }
              );
               return this.pedoMeterStats;
            }),
           
           
          )
      );
    } catch (e) {
      console.error('Oops! can not read value from '+e);
    }
   } */
}
