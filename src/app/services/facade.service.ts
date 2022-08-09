import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private router: Router) {
  }

  navigateToHome() {
    console.log('navega a home')
    this.router.navigate(['/layout/home'])
  }

  navigateToNewGame() {
    console.log('navega a new game')
    this.router.navigate(['/layout/new-game'])
  }

  navigateToPodium() {
    console.log('navega a podium')
    this.router.navigate(['/layout/podium'])
  }
}
