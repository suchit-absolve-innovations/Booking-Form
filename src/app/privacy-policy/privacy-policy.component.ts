import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  isMenuOpen = false;
  constructor( private router : Router,) { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  home(){
    localStorage.clear();
this.router.navigate(['/home'])
  }

  service(){
    localStorage.clear();
    this.router.navigate(['/service'])
  }


  book(){
    localStorage.clear();
    this.router.navigate(['/booking-form'])
  }
}
