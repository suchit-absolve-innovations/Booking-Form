import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContentService } from '../content.service';
import { DatePipe, formatDate } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  isMenuOpen = false;
  providerAreaslist: any[] = [];
  disableInput: boolean = false;
  yearId: any;
  typeCleaningId: any;
  eqId: any;
  workId: any;
  visaId: any;
  socialI: any;
  visas: any;
  postcode: any;
  suburbList: any;
  discountForm: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  yearsList: any;
  joinForm!: FormGroup;
  typeCleaning: any;
  workAdm: any;
  equipment: any;
  havecar!: number;
  police: any;
  libality: any;
  visaList: any;
  socialList: any;
  cleaningTypeId: any;
  equipmentId: any;
  yearOfExperienc: any;
  socialId: any;
  areaId: any;
  selectedExtras: any[] = [];
  providerEquipments: any[] = [];
  submitted: boolean | any = false;
  emailTouched: boolean = false;
  phoneTouched: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private content: ContentService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.form();
    this.getYearsList();
    this.getCleaningType();
    this.getadmLike();
    this.getEquipmentList();
    this.getVisaTypeList();
    this.getAdmSocial();
    this.getSuburdList();
    this.coupanForm();
    this.typeCleaningId = this.typeCleaning[0].cleaningTypeId;
  }

  
  onphoneBlur() {
    this.phoneTouched = true;
  }

  form() {
    this.joinForm = this.formBuilder.group({
      providerFname: ['', Validators.required], // Example validation for required fields
      providerLname: ['', Validators.required],
      providerEmail: ['', [Validators.required, Validators.email,  Validators.pattern("^[A-Za-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]], // Email validation
      providerMobile: ['', [Validators.required, Validators.pattern('04[0-9]{8}')]], // Phone number field
      providerSuburb: ['', Validators.required],
      providerPostCode: ['', Validators.required],
      providerAbn:  ['', [Validators.required, Validators.pattern('[0-9]{11}')]], // Example of a non-required field
      providerCompanyName: ['', Validators.required],
      providerTypeId: [0, Validators.required],
      yearsofCleaningExpId: [''],
      haveCar: ['public_transport'],
      visaTypeId: ['' , Validators.required],
      policeCheck: ['1'],
      publicLiabilityInsurance: ['1'],
      socialId: [0 , Validators.required],
      providerServices: this.formBuilder.array([
        this.createServiceGroup(), // Create the nested service group
      ], Validators.required),
      providerEquipments: this.formBuilder.array([
        this.createEquipmentGroup(), // Create the nested equipment group
      ], Validators.required),
      providerAreas: this.formBuilder.array([
        this.createAreaGroup(), // Create the nested area group
      ], Validators.required),
      availability: this.formBuilder.group({
        providerId: [0],
        sunday: [0],
        monday: ['1'],
        tuesday: [0],
        wednesday: [0],
        thursday: [0],
        friday: [0],
        saturday: [0],
        morning7to12: ['1'],
        afternoons125: [0],
        after6m: [0]
      })
    });
    this.addProviderService(this.typeCleaningId);
  }

    // Function to add a service to the FormArray
    addProviderService(cleaningTypeId: number) {
      const formArray = this.joinForm.get('providerServices') as FormArray;
      const newControl = this.formBuilder.group({
        cleaningTypeId: [cleaningTypeId, Validators.required], // Set default value with validation
      });
  
      formArray.push(newControl); // Add to the FormArray
    }

  createServiceGroup(): FormGroup {
    return this.formBuilder.group({
      cleaningTypeId: ['', Validators.required], // Default value
    });
  }

  createEquipmentGroup(): FormGroup {
    return this.formBuilder.group({
      equipmentId: ['', Validators.required], // Default value
    });
  }

  createAreaGroup(): FormGroup {
    return this.formBuilder.group({
      areaId: ['', Validators.required], // Default value
    });
  }


  ///coupan///

  coupanForm() {
    this.discountForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 4 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }
  onKeyDown1(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 10 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }


  onKeyDownABN(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 11&& event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  onEmailBlur() {
    this.emailTouched = true;
  }
  getYearsList() {

    this.content.getYearsList().subscribe(response => {
      if (response.status == true) {
        this.yearsList = response.data;
        this.yearId = this.yearsList[0].cleaningExpId
      } else {

      }
    });
  }

  getCleaningType() {

    this.content.getCleaningType().subscribe(response => {
      if (response.status == true) {
        this.typeCleaning = response.data;
        this.typeCleaningId = this.typeCleaning[0].cleaningTypeId
      } else {

      }
    })
  }

  getadmLike() {
    this.content.getLikeWork().subscribe(response => {
      if (response.status == true) {
        this.workAdm = response.data
        this.workId = this.workAdm[0].areaId
      } else {

      }
    });
  }


  getEquipmentList() {
    this.content.getEquipmentList().subscribe(response => {
      if (response.status == true) {
        this.equipment = response.data
        this.eqId = this.equipment[0].equipmentId
      } else {

      }
    })
  }


  // have car

  haveCar(data: any) {
    debugger
    this.havecar = data;
  }

  policeCheck(data: any) {
    this.police = data
  }

  publicLibality(data: any) {
    this.libality = data;
  }


  getVisaTypeList() {
    this.content.getVisaType().subscribe(response => {
      if (response.status == true) {
        this.visaList = response.data
        debugger
        this.visaId = this.visaList[0].visaTypeId
      } else {

      }
    })
  }
  isInvalid(controlName: string): boolean {
    const control = this.joinForm.get(controlName);
    return control?.invalid && this.submitted; // Only invalid after form is submitted
  }
  get f() {
    return this.joinForm.controls;
  }



  getAdmSocial() {

    this.content.getAdmSocial().subscribe(response => {
      if (response.status == true) {
        this.socialList = response.data
        this.socialI = this.socialList[0].socialId
      }
    })
  }

  // Function to handle checkbox change
  onCheckboxChange(item: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // If the checkbox is checked, add to selectedExtras
      this.selectedExtras.push(item);
    } else {
      // If it's unchecked, remove from selectedExtras
      this.selectedExtras = this.selectedExtras.filter(
        (extra) => extra.cleaningTypeId !== item.cleaningTypeId
      );
    }


  }


  // Function to handle checkbox change
  onCheckboxChange1(item: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // If the checkbox is checked, add to selectedExtras
      this.providerEquipments.push(item);
    } else {
      // If it's unchecked, remove from selectedExtras
      this.providerEquipments = this.providerEquipments.filter(
        (extra) => extra.equipmentId !== item.equipmentId
      );
    }


  }


  // Function to handle checkbox change
  onCheckboxChange2(item: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // If the checkbox is checked, add to selectedExtras
      this.providerAreaslist.push(item);
    } else {
      // If it's unchecked, remove from selectedExtras
      this.providerAreaslist = this.providerAreaslist.filter(
        (extra) => extra.areaId !== item.areaId
      );
    }


  }



  yearOfExperience(data: any) {
    this.yearOfExperienc = data

  }

  social(data: any) {
    this.socialId = data
  }

  area(data: any) {
    this.areaId = data
  }

  visa(data:any){
    this.visas = data
  }

  getSuburdList() {
    this.content.suburb().subscribe((response) => {
      if (response.status == true) {
        this.suburbList = response.data;
      } else {
      }
    });
  }

  getPostCodepost(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.value) {
      const enteredValue = inputElement.value.trim(); // Trim leading/trailing spaces

      // Check if the input is valid (at least one character)
      if (enteredValue.length > 0) {
        this.content.suburbpost(enteredValue).subscribe((response) => {
          if (response.status && response.data.length > 0) {
            const newSuburb = response.data[0]?.locality || ''; // Handle optional chaining and provide default value

            // Update the `providerSuburb` form control with the correct value
            this.joinForm.get('providerSuburb')?.patchValue(newSuburb);
          } else {
            console.warn('No data found for entered postal code');
            this.clearCustomerInfo(); // Clear the related fields
          }
        });
      } else {
        this.clearCustomerInfo(); // Clear the related fields if invalid
      }
    } else {
      console.warn('Invalid input');
      this.clearCustomerInfo(); // Clear the related fields
    }
  }


  clearCustomerInfo(): void {
    // Clear the related form controls
    this.joinForm.get('providerSuburb')?.patchValue({
      providerSuburb: '',
    });
  }
  
  getPostCode(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    // Ensure selectElement has a valid value
    if (selectElement && selectElement.value) {
      // Extract the suburb name (assuming it's after ':')
      const selectedValue = selectElement.value.split(': ')[1]; // Get the second part after splitting by ': '
debugger
      if (selectedValue) {
        this.content.suburbpost(selectedValue).subscribe((response) => {
          if (response.status) {
            this.postcode = response.data[0].postCode;

            // Use patchValue to update the specific form control
           // Update the form control with the new postcode
this.joinForm.get('providerPostCode')?.patchValue(this.postcode);

          } else {
            // Handle the error case
          }
        });
      }
    } else {
      console.warn('No valid value selected');
    }
  }

  joinNow() {
   
    this.submitted = true;
    // if (this.joinForm.invalid) {
    //   return;
    // }

    const parseFormValue = (controlName: string): number =>
      parseInt(this.joinForm.get(controlName)?.value, 10) || 0;


  //  this.selectedExtras.push(this.typeCleaning[0]);
// type of cleaning

    const alreadyExists = this.selectedExtras.some(
      (existingItem) => existingItem.cleaningTypeId === this.typeCleaning[0].cleaningTypeId
    );
  
    // If it doesn't exist, add it to the array
    if (!alreadyExists) {
      this.selectedExtras.push(this.typeCleaning[0]); // Push only unique items
    }

// equipment

    
    const alreadyExists1 = this.providerEquipments.some(
      (existingItem) => existingItem.equipmentId === this.equipment[0].equipmentId
    );
  
    // If it doesn't exist, add it to the array
    if (!alreadyExists1) {
      this.providerEquipments.push(this.equipment[0]); // Push only unique items
    }

    // work

    const alreadyExists2 = this.providerAreaslist.some(
      (existingItem) => existingItem.areaId === this.workAdm[0].areaId
    );
  
    // If it doesn't exist, add it to the array
    if (!alreadyExists2) {
      this.providerAreaslist.push(this.workAdm[0]); // Push only unique items
    }

    // police

    if (this.police === undefined || this.police === null) {
      this.police = 1; // Set default value for police
    }

    if (this.libality === undefined || this.libality === null) {
      this.libality = 1; // Set default value for police
    }

    let payload = {
      providerFname: this.joinForm.value.providerFname,
      providerLname: this.joinForm.value.providerLname,
      providerEmail: this.joinForm.value.providerEmail,
      providerMobile: this.joinForm.value.providerMobile,
      providerSuburb: this.joinForm.value.providerSuburb,
      providerPostCode: this.joinForm.value.providerPostCode,
      providerAbn: this.joinForm.value.providerAbn,
      providerCompanyName: this.joinForm.value.providerCompanyName, //
      // createdOn: this.joinForm.value.createdOn,
      // createdBy: this.joinForm.value.createdBy,
      // modifiedOn: this.joinForm.value.modifiedOn,
      // modifiedBy: this.joinForm.value.modifiedBy,
      providerTypeId: this.joinForm.value.providerTypeId,
      yearsofCleaningExpId: this.yearOfExperienc || this.yearId,
      haveCar: this.havecar || 0,
      visaTypeId: this.visas || this.visaId,
      policeCheck: this.police,
      publicLiabilityInsurance: this.libality,
      socialId: this.socialId || this.socialI,
      providerServices:this.selectedExtras,
      providerEquipments: this.providerEquipments,
      providerAreas: this.providerAreaslist,
      availability: {
        sunday: Number(this.joinForm.value.availability.sunday), // Explicitly convert to number
        monday: Number(this.joinForm.value.availability.monday),
        tuesday: Number(this.joinForm.value.availability.tuesday),
        wednesday: Number(this.joinForm.value.availability.wednesday),
        thursday: Number(this.joinForm.value.availability.thursday),
        friday: Number(this.joinForm.value.availability.friday),
        saturday: Number(this.joinForm.value.availability.saturday),
        morning7to12: Number(this.joinForm.value.availability.morning7to12),
        afternoons125: Number(this.joinForm.value.availability.afternoons125),
        after6m: Number(this.joinForm.value.availability.after6m),
      }
    }
    debugger
 // Function to check if a value is empty or invalid
const isValid = (value: any) => {
  return value !== undefined && value !== null && value !== "";
};

// Function to validate the entire payload
const validatePayload = (payload: any) => {
  for (const key in payload) {
    const value = payload[key];
    
    // If the field is an object (like availability), check its keys
    if (typeof value === "object" && !Array.isArray(value)) {
      for (const subkey in value) {
        if (!isValid(value[subkey])) {
          console.error(`Invalid value for ${key}.${subkey}:`, value[subkey]);
          return false;
        }
      }
    } else {
      // Check top-level values
      if (!isValid(value)) {
        console.error(`Invalid value for ${key}:`, value);
        return false;
      }
    }
  }

  // If all values are valid
  return true;
};

// Validate the payload
if (!validatePayload(payload)) {
  console.error("Payload validation failed. Check the values and try again.");
  return;
}
this.spinner.show();
    this.content.JoinNOw(payload).subscribe(response => {
      if (response.status == true) {
        this.spinner.hide();
        this.showModal();
      } else {
        this.spinner.hide();
      }
    });
  }
  showModal() {
    $('#myModal').modal('show');
  }


  navigateToExternalSite() {
    this.spinner.show();
    window.location.href = 'https://blissfulhomes-staging.azurewebsites.net/'
  }



  // menu 

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateTo(path: string): void {
    this.closeMenu(); // Close menu on navigation
    this.router.navigateByUrl(path);
  }

  disount() {
    debugger
    this.submitted = true
    if (this.discountForm.invalid) {
      return;
    }
    let payload = {
      email: this.discountForm.value.email,

    };

    this.content.discountCoupan(payload).subscribe((response) => {
      if (response.status == true) {
        // this.toaster.success(response.message);
      } else {
        // this.toaster.error(response.message);
      }
    });
  }
}