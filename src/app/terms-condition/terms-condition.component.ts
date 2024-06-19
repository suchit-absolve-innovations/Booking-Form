import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  isMenuOpen = false;
  terms: any;
  constructor( private router : Router,
    private content:ContentService
  ) { }

  ngOnInit(): void {
    this.getTerms();
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

  getTerms(){
    this.content.getTermsCondition().subscribe(response => {
      if(response.status == true){
this.terms = response.data.termsAndConditions
      } else {

      }
    });
  }
}
