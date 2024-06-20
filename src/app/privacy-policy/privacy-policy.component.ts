import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  isMenuOpen = false;
  data!: string | null;
  name!: any;
  name1!: string | null;
  constructor( private router : Router,
    private content:ContentService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
    this.data = localStorage.getItem('token');
    this.getPrivacy();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

 
  home() {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/home']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/login']); // Redirect to login if token is missing
    }
  }
  

  service(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/service']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/login']); // Redirect to login if token is missing
    }
  }

  term(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/terms-&-condition']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/terms-&-condition']); // Redirect to login if token is missing
    }
  }


  privacy(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/privacy-policy']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/privacy-policy']); // Redirect to login if token is missing
    }
  }

  book(){
    debugger
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/book-form']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/booking-form']); // Redirect to login if token is missing
    }
  }
  getPrivacy(){
    this.content.getPrivacyPolicy().subscribe(response => {
      if(response.status == true){
this.privacy = response.data.privacyPolicy
      } else {

      }
    });
  }

  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
}
