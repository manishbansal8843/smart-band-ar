import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
  childRoutesEnabled:boolean=false;

  constructor(private router:Router) { }
  
  canActivate(): boolean {

    if(this.childRoutesEnabled)
    return true;
    else
    this.router.navigate(['']);

  }
}
