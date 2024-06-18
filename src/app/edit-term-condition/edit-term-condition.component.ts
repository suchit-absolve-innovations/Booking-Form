import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-term-condition',
  templateUrl: './edit-term-condition.component.html',
  styleUrls: ['./edit-term-condition.component.css']
})
export class EditTermConditionComponent implements OnInit {
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
