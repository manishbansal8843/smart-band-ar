import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PedoMeterResult } from 'src/app/PedoMeterResult';
import { Observable } from 'rxjs/Observable';
import { MiBandService2Service } from 'src/app/mi-band-service-2.service';
import { Injector } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthGaurdService } from 'src/app/auth-gaurd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Smart band AR experience';
  @ViewChild('PairingButton') pairingButton: ElementRef;
  PairDeviceButtonLabel: string = 'Search Device';
  disablePairingButton: boolean = false;
  miBandService: MiBandService2Service;
  errorDuringPairing: boolean = false;
  pairingErrorMssg: string;
  bleNotSupported: boolean;
  ifPaired: boolean = false;
  pairingStarted: boolean = false;
  hideAllButARDisplay: boolean = false;

  constructor(private injector: Injector, private router: Router, private authgaurd: AuthGaurdService, private renderer: Renderer2) {
    if (!navigator.bluetooth) {
      this.bleNotSupported = true;
    }
    else {
      this.miBandService = <MiBandService2Service>this.injector.get(MiBandService2Service);
    }
  }


  doPairing() {
    this.PairDeviceButtonLabel = 'Searching..Please Wait.';
    this.disablePairingButton = true;
    this.renderer.setStyle(this.pairingButton.nativeElement, 'background-color', 'grey');
    this.errorDuringPairing = false;
    this.pairingStarted = true;
    if (this.miBandService) {
      this.miBandService.getPedoStats().subscribe(() => {
        this.ifPaired = true;
        this.authgaurd.childRoutesEnabled = true;
      }, error => {
        this.pairingStarted = false;
        this.PairDeviceButtonLabel = 'Search Device';
        this.renderer.setStyle(this.pairingButton.nativeElement, 'background-color', 'green');
        this.disablePairingButton = false;
        this.errorDuringPairing = true;
        this.pairingErrorMssg = error;
      });
    }
  }
  displayDigitalMiDisplay() {
    this.router.navigate(['digital-mi-display']);
  }
  displayARMiDisplay() {
    this.router.navigate(['ar-mi-display']);
    this.hideAllButARDisplay = true;
  }
  displayNewDigitalMiDisplay() {
    this.router.navigate(['new-digital-mi-display']);

  }
}
