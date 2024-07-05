import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  isMenuOpen = false;
  terms: any;

  data!: string | null;
  name!: any;
  name1!: string | null;
  constructor( private router : Router,
    private content:ContentService,
    private auth: AuthService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
    this.data = localStorage.getItem('token');
    this.getTerms();
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
      this.router.navigate(['/home']); // Redirect to login if token is missing
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
      this.router.navigate(['/service']); // Redirect to login if token is missing
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
  getTerms(){
    this.content.getTermsCondition().subscribe(response => {
      if(response.status == true){
this.terms = response.data.termsAndConditions
      } else {

      }
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
      this.renderer.addClass(header, 'sticky');
    } else {
      this.renderer.removeClass(header, 'sticky');
    }
  }

  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
}
