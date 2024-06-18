import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-privacy',
  templateUrl: './edit-privacy.component.html',
  styleUrls: ['./edit-privacy.component.css']
})
export class EditPrivacyComponent implements OnInit {
  isMenuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

    // menu 

    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
    closeMenu(): void {
      this.isMenuOpen = false;
    }

}
