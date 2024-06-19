import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  isMenuOpen = false;
  privacy: any;
  constructor( private router : Router,
    private content:ContentService
  ) { }

  ngOnInit(): void {
    this.getPrivacy();
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

  getPrivacy(){
    this.content.getPrivacyPolicy().subscribe(response => {
      if(response.status == true){
this.privacy = response.data.privacyPolicy
      } else {

      }
    });
  }
}
