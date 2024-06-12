import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContentService } from '../content.service';
import { DatePipe, formatDate } from '@angular/common';
import { emailUniqueValidator } from '../email';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AccessMethods } from 'src/shared/types';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import html2canvas from 'html2canvas';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  @ViewChild('summaryDiv', { static: false }) summaryDiv!: ElementRef;
  @ViewChild('myModal', { static: true }) modal!: ElementRef;
  @ViewChild('myModal1', { static: true }) modal1!: ElementRef;
  @ViewChild('myModal2', { static: true }) modal2!: ElementRef;
  @ViewChild('myModal3', { static: true }) modal3!: ElementRef;
  @ViewChild('myModal5', { static: true }) modal5!: ElementRef;
  title = 'blissful';
  isMenuOpen = false;
  isChecked: boolean = false;
  isCheckedstep5: boolean = false;
  remaindercheck: boolean = false;
  units: number = 0; // Default initial value
  rootUrl: any;
  bookingForm!: FormGroup;
  bedroomList: any;
  bathroomList: any;
  kitchenList: any;
  livingAreaList: any;
  timingList: any;
  extraList: any[] = [];
  serviceTypeList: any;
  selectedServiceTypeId!: number;
  oftendata: any;
  defaultBedroomId: any;
  defaultBathroomId: any;
  summaryData: any;
  // Current list of extra services
  selectedExtras: any[] = [];
  howOften: any;
  equipmentValue!: number;
  remaindervalue!: number;
  bookFreq: any;
  accessHomevalue: any;
  defaultkitchenId: any;
  defaultLeavingId: any;
  todayDate!: string;
  submitted: boolean | any = false; // Initialized to false

  submitted1: boolean | any = false; // Initialized to false
  australianStates: any[] = ['VIC', 'NSW', 'NT', 'WA', 'SA', 'ACT', 'TAS'];
  suburbList: any;
  postcode: any;
  accountform!: FormGroup;
  email1: any;
  loginform!: FormGroup;
  formattedDate1!: any;
  timingId: any;
  // Assuming a default value
  minDate!: Date;
  bsConfig!: Partial<BsDatepickerConfig>;
  displayDate!: any;
  minToDate!: Date;
  emailTouched: boolean = false;
  mobile: any;
  message: any;
  selectedFrequency: 'o' | undefined;

  // Use the AccessMethods type to initialize the object
  accessMethods: AccessMethods = {
    atHome: 0,
    leaveKey: 0,
    buildingAccessCode: 0,
    other: 0,
  };
  cleaners: any;
  cleaners1: any;
  cleaners2: any;
  cleaners3: any;
  cleaners4: any;
  home: any;
  homes: any;
  homes1!: number;
  homes2!: number;
  homes3!: any;
  showOtherInput = false; // Initially, the input field is hidden
  error!: string;
  selectedOption!: string;
  extradata: any;
  phoneTouched: boolean = false;
  bookId!: any;
  subutbId: any;
  suburbId: any;
  discountForm!: FormGroup;
  scheduleId: any;
  constructor(private formBuilder: FormBuilder,
    private content: ContentService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getBadroom();
    this.getBathroomList();
    this.getKitchenList();
    this.getLivingAreaList();
    this.getTimingList();
    this.getextraServiceList();
    this.getServiceTypeList();
    this.getSuburdList();
    this.accountForm();
    this.loginForm();
    this.coupanForm();

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 2);

    // Configure date picker
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      minDate: this.minDate,
    };
    this.rootUrl = environment.apiUrl;
    this.home1(1);
    this.cleaner(1);
  }

  createForm(): void {
    this.bookingForm = this.formBuilder.group({
      frequency: ['O'],
      serviceTypeId: ['', [Validators.required]], // Add validations as needed
      estimatedHours: [0, [Validators.required]],
      bookingDate: [
        '',
        [
          Validators.required, // Ensure the field isn't empty
        ],
      ],
      equipments: [0], // Example boolean field
      remainder: [0],
      discount: [0],
      noOfBedrooms: [this.defaultBedroomId],
      noOfBathrooms: [this.defaultBathroomId],
      noOfLivingAreas: [this.defaultLeavingId],
      noOfKitchens: [this.defaultkitchenId],
      hours: [''],
      bookingTime: [this.timingId],
      regCleaningFreq: [''],
      regCleaningDiscount: [0],
      bookingDateFlexibility: ['Yes, day and time'],
      accessCustomerAtHome: ['1'],
      accessCustomerWillLeaveKey: [0],
      accessCustomerBuildingAccessCode: [0],
      accessOther: [''],
      parkingInDriveway: ['1'],
      parkingFreeUnlimitedStreet: [0],
      parkingFreeMetered: [0],
      parkingVisitors: [0],
      parkingPaid: [0],
      pets: ['1'],
      furniture: ['0'],
      specialInstructions: [''],
      bookingStatus: [''],
      bookedBy: [''],
      bookingMethod: [''],
      paymentStatus: [''],
      discountCode1: ['', Validators.required],
      extrasServices: this.formBuilder.array([this.createExtraService()]),
      customerInfo: this.formBuilder.group({
        customerFname: ['', [Validators.required]],
        customerLname: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.pattern("^[A-Za-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")],
          [emailUniqueValidator(this.content)],
        ],
        mobile: ['', [Validators.required, Validators.pattern('^04\\d{8}$')]],
        streetNo: ['', [Validators.required]],
        streetName: ['', [Validators.required]],
        state: ['VIC', [Validators.required]],
        suburb: ['Mentone'],
        postCode: ['3194', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        discountCode: [''],
      }),
      serviceTotal: [0],
      extraTotal: [0],
      subTotal: [0],
      discountAmount: [0],
      total: [0],
      discountCode: [''],
    });

    const today = new Date(); // Get today's date
    const formattedDate = new Date(today); // Create a new Date object from today
    formattedDate.setDate(formattedDate.getDate() + 2);

    // Patch the date into the form control
    this.bookingForm.patchValue({ bookingDate: formattedDate });
    const formattedDateString = this.formatDateToDDMMYYYY(formattedDate);
    this.displayDate = formattedDateString;
  }

  formatDateToDDMMYYYY(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // Return formatted date
  }


  restrictInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumber = /^[0-9]$/.test(event.key); // Allow only digits

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Prevent non-digit input
    }
  }

  // Handle the change event to convert and validate the date
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const dateString = input.value.trim();

    // Attempt to parse the date in 'dd-mm-yyyy' format
    const [day, month, year] = dateString.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (!isNaN(parsedDate.getTime())) {
      console.log('Valid date:', dateString);
    } else {
      console.error('Invalid date:', dateString);
    }
  }

  onInputChange(event: any) {
    this.phone(event.target.value);
  }

  phone(value: any) {

    let payload = {
      phone: value,
    };
    this.content.phoneNumber(payload).subscribe((response) => {
      if (response.message == true) {

      } else {

        this.message = response.message

      }
    });

  }

  // CREATE account form

  accountForm() {
    this.accountform = this.formBuilder.group({
      email: [''],
      password: ['', [Validators.required]],
    });
  }

  // Login  form

  loginForm() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // form group function

  createExtraService(): FormGroup {
    return this.formBuilder.group({
      extrasPricingId: [0],
      units: [0],
    });
  }

  ///coupan///

  coupanForm() {
    this.discountForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }
  // add array

  addExtraService(): void {
    const extraServices = this.bookingForm.get('extrasServices') as FormArray;
    extraServices.push(this.createExtraService());
  }

  // list functions

  getBadroom() {
    this.content.getBadroomList().subscribe((response) => {
      if (response.status === true) {
        this.bedroomList = response.data;
        this.defaultBedroomId = this.bedroomList[0].noOfBedrooms;

        // Update the form with new bedroom data
        this.bookingForm.patchValue({
          noOfBedrooms: this.defaultBedroomId,
        });

        this.getSummary(); // Recompute summary
      }
    });
  }

  // bathroom list

  getBathroomList() {
    this.content.getBathroomList().subscribe((response) => {
      if (response.status === true) {
        this.bathroomList = response.data;
        this.defaultBathroomId = this.bathroomList[0].noOfBathrooms;

        // Update the form with new bathroom data
        this.bookingForm.patchValue({
          noOfBathrooms: this.defaultBathroomId,
        });

        this.getSummary(); // Recompute summary
      }
    });
  }

  // kitchen list

  getKitchenList() {
    this.content.getKitchenList().subscribe((response) => {
      if (response.status == true) {
        this.kitchenList = response.data;
        this.defaultkitchenId = this.kitchenList[0].noofKitchens;

        // Update the form with new bedroom data
        this.bookingForm.patchValue({
          noOfKitchens: this.defaultkitchenId,
        });
        this.getSummary();
      } else {
      }
    });
  }

  // living area list

  getLivingAreaList() {
    this.content.getLivingAreaList().subscribe((response) => {
      if (response.status == true) {
        this.livingAreaList = response.data;
        this.defaultLeavingId = this.livingAreaList[0]?.livingAreas;

        // Update the form with new bedroom data
        this.bookingForm.patchValue({
          noOfLivingAreas: this.defaultLeavingId,
        });
        this.getSummary();
      }
    });
  }

  // timming list

  getTimingList() {
    this.content.getTimeList().subscribe((response) => {
      if (response.status == true) {
        this.timingList = response.data;
        this.timingId = this.timingList[0];
      }
    });
  }

  // extra service list

  getextraServiceList() {

    const serviceTypeId = this.selectedServiceTypeId || 1

    this.content.getExtraServiceList(serviceTypeId).subscribe((response) => {
      if (response.status == true) {
        this.extraList = response.data;
      } else {
      }
    });
  }

  // service type list

  getServiceTypeList() {
    this.content.getServiceType().subscribe((response) => {
      if (response.status == true) {
        this.serviceTypeList = response.data;
        this.selectedServiceTypeId = this.serviceTypeList[0]?.serviceTypeId;

        this.getOften();
        this.createForm();
        this.getSummary();
      } else {
      }
    });
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  // how often

  getOften() {

    const today = new Date();
    const formattedDate = new Date(today); // Create a new Date object from today
    formattedDate.setDate(formattedDate.getDate() + 2); // Increment the date by one day
    const date = formatDate(formattedDate, 'yyyy-MM-dd', 'en');

    let payload = {
      serviceTypeId: this.serviceTypeList[0]?.serviceTypeId,
      bookingDate: date, // Default to today's date
    };

    this.content.getServiceOften(payload).subscribe((response) => {
      if (response.status === true) {
        this.oftendata = response.data;
      }
    });
  }
  // discount

  discount(data: any) {
    this.howOften = data;
    this.getSummary();
  }
  onKeyDown1(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 10 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  // summary data

  setToDateMinDate(event: Date) {
    this.minToDate = event; // Set the minimum date for the "toDate" field
    this.getSummary();
  }

  getTime(data: any) {
    this.timingId = data
  }

  getSummary() {

    const rawDate = this.minToDate;
    const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en');

    console.log('Formatted date:', formattedDate);

    const serviceTypeId = this.bookingForm.get('serviceTypeId')?.value || 1;
    const noOfBedrooms = this.bookingForm.get('noOfBedrooms')?.value || 1;
    const noOfBathrooms = this.bookingForm.get('noOfBathrooms')?.value || 1;
    const noOfKitchens = this.bookingForm.get('noOfKitchens')?.value || 1;
    const noOfLivingAreas = this.bookingForm.get('noOfLivingAreas')?.value || 1;

    const payload = {
      serviceTypeId,
      noOfBedrooms,
      noOfBathrooms,
      noOfKitchens,
      noOfLivingAreas,
      bookingDate: formattedDate,
      discountCode: this.bookingForm.get('discountCode1')?.value || null,
      equipments: this.equipmentValue,
      discount: this.howOften || 0,
      hours: 0,
      extrasServices: this.selectedExtras || [], // Use the updated selectedExtras list
    };
    this.content.postSummary(payload).subscribe((response) => {
      if (response.status === true) {
        this.summaryData = response.data;
        this.extradata = this.summaryData.extraBookings
      } else {
        this.showModal5();
      }
    });
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
        (extra) => extra.extrasPricingId !== item.extrasPricingId
      );
    }

    // Call getSummarycheck with the updated list of selected extras
    this.getSummarycheck(this.selectedExtras);
  }

  // Function to handle increment and decrement for count-based items
  increment(item: any): void {
    item.count++; // Increase the count
    if (
      item.count > 0 &&
      !this.selectedExtras.find(
        (extra) => extra.extrasPricingId === item.extrasPricingId
      )
    ) {
      // If the item is not in selectedExtras, add it
      this.selectedExtras.push(item);
    }

    // Call getSummarycheck with updated list
    this.getSummarycheck(this.selectedExtras);
  }

  // decrement function

  decrement(item: any): void {
    if (item.count > 0) {
      item.count--; // Decrement the count
      if (item.count === 0) {
        // If count reaches zero, remove from selectedExtras
        this.selectedExtras = this.selectedExtras.filter(
          (extra) => extra.extrasPricingId !== item.extrasPricingId
        );
      }
    }

    // Call getSummarycheck with updated list
    this.getSummarycheck(this.selectedExtras);
  }

  // Function to send data to server with updated list of selected extras
  getSummarycheck(data: any[]): void {
    const rawDate = this.bookingForm.get('bookingDate')?.value;
    const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en');

    const serviceTypeId = this.bookingForm.get('serviceTypeId')?.value || 1;
    const noOfBedrooms = this.bookingForm.get('noOfBedrooms')?.value || 0;
    const noOfBathrooms = this.bookingForm.get('noOfBathrooms')?.value || 0;
    const noOfKitchens = this.bookingForm.get('noOfKitchens')?.value || 0;
    const noOfLivingAreas = this.bookingForm.get('noOfLivingAreas')?.value || 0;

    const payload = {
      serviceTypeId,
      noOfBedrooms,
      noOfBathrooms,
      noOfKitchens,
      noOfLivingAreas,
      bookingDate: formattedDate,
      equipments: this.equipmentValue || 0,
      discount: this.howOften || 0,
      hours: 0,
      extrasServices: data, // Use the updated selectedExtras list
      discountCode: this.bookingForm.get('discountCode1')?.value.toString() || null,
    };

    this.content.postSummary(payload).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.summaryData = response.data; // Update with new summary data
        } else {
          console.warn('Unexpected response status:', response.status);
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
  }

  // checkbox

  toggleCheck(serviceTypeId: number) {
    this.selectedExtras = [];
    this.selectedServiceTypeId = serviceTypeId; // Update when clicked

    this.getSummary();
    this.getextraServiceList();
  }
  // coupan discount

  coupanDiscount() {
    this.getSummary();
  }

  // empty and wrong discount code

  invalidClick() {
    // Mark form as submitted to trigger validation checks
    if (this.bookingForm.get('discountCode1')?.value == '') {
      this.showModal1();
      return;
    }

    let payload = {
      discountCode: this.bookingForm.get('discountCode1')?.value.toString(),
      streetNo: this.bookingForm.value.customerInfo.streetNo, // Default street number
      streetName: this.bookingForm.value.customerInfo.streetName, // Default street name
      state: this.bookingForm.value.customerInfo.state, // Default state
      suburb: this.bookingForm.value.customerInfo.suburb, // Default suburb
      email: this.bookingForm.value.customerInfo.email,
      serviceTypeId: this.selectedServiceTypeId
    }


    this.content.invalidDiscount(payload).subscribe(
      (response) => {
        debugger
        if (response.status == true) {
          this.toaster.success('Applied Successfully')
          this.coupanDiscount(); // Apply discount logic if valid
        } else {
          this.message = response.message;
          this.showModal(); // Show an error modal if invalid
        }
      }
    );
  }

  // for form control

  get f() {
    return this.bookingForm['controls'];
  }

  // for modal 1

  showModal() {
    const modalElement = this.modal.nativeElement;
    if (modalElement) {
      $(modalElement).modal('show'); // Use jQuery to show the modal
    }
  }

  // for modal 2

  showModal1() {
    const modalElement = this.modal1.nativeElement;
    if (modalElement) {
      $(modalElement).modal('show'); // Use jQuery to show the modal
    }
  }

  // check value

  checkvaluestep5(): void {
    this.equipmentValue = this.isCheckedstep5 ? 1 : 0;
    this.getSummary();
  }

  // check value

  remainder(): void {
    this.remaindervalue = this.remaindercheck ? 1 : 0;
  }

  // booking frequency

  bookingFrequency(data: any) {
    this.bookFreq = data;
  }



  home1(data: any) {
    this.showOtherInput = false;
    // this.home =  this.bookingForm.get('noOfBedrooms')?.value;
    this.homes = data;
    this.homes1 = 0,
      this.homes2 = 0,
      this.homes3 = null
  }


  home2(data: any) {
    this.showOtherInput = false;
    //2this.home =  this.bookingForm.get('noOfBedrooms')?.value;
    this.homes = 0;
    this.homes1 = data,
      this.homes2 = 0,
      this.homes3 = null
  }

  home3(data: any) {
    this.showOtherInput = false;
    //2this.home =  this.bookingForm.get('noOfBedrooms')?.value;
    this.homes = 0;
    this.homes1 = 0,
      this.homes2 = data,
      this.homes3 = null
  }


  home4(data: any) {

    this.showOtherInput = true; // Set to true to show the input field


    this.homes = 0;
    this.homes1 = 0,
      this.homes2 = 0
    //   this.homes3 =  this.bookingForm.get('accessOther')?.value

  }


  home5(data: any) {
    this.homes3 = data;

  }




  // creaners radio

  cleaner(data: any) {
    this.cleaners = data
    this.cleaners1 = 0
    this.cleaners2 = 0
    this.cleaners3 = 0
    this.cleaners4 = 0
  }

  cleaner1(data: any) {
    this.cleaners = 0
    this.cleaners1 = data
    this.cleaners2 = 0
    this.cleaners3 = 0
    this.cleaners4 = 0
  }

  cleaner2(data: any) {
    this.cleaners = 0
    this.cleaners1 = 0
    this.cleaners2 = data
    this.cleaners3 = 0
    this.cleaners4 = 0
  }


  cleaner3(data: any) {
    this.cleaners = 0
    this.cleaners1 = 0
    this.cleaners2 = 0
    this.cleaners3 = data
    this.cleaners4 = 0
  }

  cleaner4(data: any) {
    this.cleaners = 0
    this.cleaners1 = 0
    this.cleaners2 = 0
    this.cleaners3 = 0
    this.cleaners4 = data
  }


  // Method to check if required fields are filled in
  isApplyButtonVisible(): boolean {
    const customerInfo = this.bookingForm.get('customerInfo');

    if (customerInfo) {
      const { streetNo, streetName, suburb, email } = customerInfo.value;

      // Return true if all required fields have values, false otherwise
      return streetNo && streetName && suburb && email;
    }
    return false; // If customerInfo is undefined
  }

  // booking function

  booking() {
    if (this.showOtherInput && this.bookingForm.get('accessOther')?.value.trim() === '') {
      this.error = 'Please provide additional instructions.';
      return; // Prevent form submission
    }

    this.error = ''; // Clear error if the form is valid
    this.submitted = true; // Mark form as submitted for validation checks
    const discountControl = this.bookingForm.get('discountCode1');
    this.remaindervalue;
    if (discountControl) {
      discountControl.clearValidators(); // Remove validator to avoid validation
      discountControl.updateValueAndValidity(); // Trigger validation
    }
    // Check other form controls
    if (this.bookingForm.invalid) {
      console.log('Form has validation errors.');
      return;
    }
    const rawDate = this.minToDate;
    const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en');
    const parseFormValue = (controlName: string): number =>
      parseInt(this.bookingForm.get(controlName)?.value, 10) || 0;

    let payload = {
      serviceTypeId: this.bookingForm.get('serviceTypeId')?.value || 1, // Default value for serviceTypeId
      estimatedHours: 0, // Default estimated hours
      bookingDate: formattedDate, // Example default date
      equipments: this.equipmentValue, // Default to true
      remainder: this.remaindervalue,
      discount: this.howOften || 0, // No discount by default
      noOfBedrooms: this.bookingForm.get('noOfBedrooms')?.value || 0, // No bedrooms initially
      noOfBathrooms: this.bookingForm.get('noOfBathrooms')?.value || 0, // No bathrooms initially
      noOfLivingAreas: this.bookingForm.get('noOfLivingAreas')?.value || 0, // No living areas initially
      noOfKitchens: this.bookingForm.get('noOfKitchens')?.value || 0, // No kitchens initially
      hours: 0, // Default hours
      bookingTime: this.bookingForm.get('bookingTime')?.value || '', // Default booking time
      regCleaningFreq: this.bookFreq || 'O', // Default cleaning frequency
      regCleaningDiscount: this.summaryData.discount, // Default regular cleaning discount
      bookingDateFlexibility: this.bookingForm.get('bookingDateFlexibility')
        ?.value, // Default flexibility
      accessCustomerAtHome: this.homes, // Convert to integer
      accessCustomerWillLeaveKey: this.homes1, // Convert to integer
      accessCustomerBuildingAccessCode: this.homes2, // Convert to integer
      accessOther: this.homes3, // Default other access
      parkingInDriveway: this.cleaners, // Default parking in driveway
      parkingFreeUnlimitedStreet: this.cleaners1, // Default parking free on street
      parkingFreeMetered: this.cleaners2, // Default parking free at meter
      parkingVisitors: this.cleaners3, // Default parking for visitors
      parkingPaid: this.cleaners4, // Default paid parking
      pets: parseFormValue('pets'), // Default pets
      furniture: parseFormValue('furniture'), // Default furniture
      specialInstructions:
        this.bookingForm.get('specialInstructions')?.value || '', // Default special instructions
      bookingStatus: 'confirmed', // Default booking status
      bookedBy: '', // Default booked by
      bookingMethod: '', // Default booking method
      paymentStatus: 'Pending', // Default payment status
      discountCodeDiscount: this.summaryData.discountCodeDiscount,
      extrasServices: this.selectedExtras || [],
      customerInfo: {
        customerFname:
          this.bookingForm.value.customerInfo.customerFname || null, // Example default first name
        customerLname:
          this.bookingForm.value.customerInfo.customerLname || null, // Example default last name
        email: this.bookingForm.value.customerInfo.email || null, // Default email
        mobile: this.bookingForm.value.customerInfo.mobile || null, // Default mobile
        streetNo: this.bookingForm.value.customerInfo.streetNo || null, // Default street number
        streetName: this.bookingForm.value.customerInfo.streetName || null, // Default street name
        state: this.bookingForm.value.customerInfo.state || null, // Default state
        suburb: this.bookingForm.value.customerInfo.suburb || null, // Default suburb
        postCode: this.bookingForm.value.customerInfo.postCode || null, // Default postal code
        discountCode: this.bookingForm.get('discountCode1')?.value || null, // Default discount code
      },
      serviceTotal: this.summaryData.serviceTotal || 0, // Default total
      extraTotal: this.summaryData.extraTotal || 0, // Default extra total
      subTotal: this.summaryData.subTotal || 0, // Default subtotal
      discountAmount: this.summaryData.discount || 0, // Default discount amount
      total:
        this.summaryData.total || 0, // Default total
    };
    this.spinner.show();
    this.content.book(payload).subscribe((response) => {
      if (response.status) {
        debugger
        //     this.showModal2(); // Show the modal after success
        localStorage.setItem('fname', response.data.customerInfo.customerFname);
        localStorage.setItem('lname',response.data.customerInfo.customerLname);
        this.bookId = response.data.bookingId;
        this.scheduleId = response.data.scheduleId;
        window.scrollTo(0, 20); // Scroll to the top of the page
        // customerInfo
        // : 
        // {customerFname: "yujfghvn", customerLname: "ftgvb", email: "par11@gmail.com", mobile: "0456785875",…}
        // discount
        // : 
        // 10
        // discountAmount
        const emailControl = this.accountform.get('email'); // Get the form control reference

        if (emailControl) {
          // Ensure form control exists before patching
          const email = response.data?.customerInfo?.email;

          if (email) {
            emailControl.patchValue(email); // Correctly patch the form control
          } else {
            console.warn('Email in response data is undefined');
          }
          this.spinner.hide();

          this.showModal3();
          this.bookingForm.reset();
        } else {
          debugger
          this.spinner.hide();
          console.warn('Form control "email" is undefined'); // Handle missing form control
        }


      } else {
        this.spinner.hide();
        console.warn('Booking failed');
      }
    });
  }



  // for modal 2

  showModal2() {
    const modalElement = this.modal2.nativeElement;
    if (modalElement) {
      $(modalElement).modal('show'); // Use jQuery to show the modal
    }
  }

  // for modal 2

  showModal3() {
    const modalElement = this.modal3.nativeElement;
    if (modalElement) {
      $(modalElement).modal('show'); // Use jQuery to show the modal

    }
  }

  getSuburdList() {
    this.content.suburb().subscribe((response) => {
      if (response.status == true) {
        debugger
        this.suburbList = response.data;
        this.suburbId = this.suburbList[0]?.postCodeId
      } else {
      }
    });
  }

  getPostCode(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    // Ensure selectElement has a valid value
    if (selectElement && selectElement.value) {
      // Extract the suburb name (assuming it's after ':')
      const selectedValue = selectElement.value.split(': ')[1]; // Get the second part after splitting by ': '

      if (selectedValue) {
        this.content.suburbpost(selectedValue).subscribe((response) => {
          if (response.status) {
            this.postcode = response.data[0].postCode;

            // Use patchValue to update the specific form control
            this.bookingForm.get('customerInfo')?.patchValue({
              postCode: this.postcode, // Correctly update the form control
              state: response.data[0].state,
            });
          } else {
            // Handle the error case
          }
        });
      }
    } else {
      console.warn('No valid value selected');
    }
  }

  getPostCodestate(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    // Ensure selectElement has a valid value
    if (selectElement && selectElement.value) {
      // Extract the suburb name (assuming it's after ':')
      const selectedValue = selectElement.value.split(': ')[1]; // Get the second part after splitting by ': '

      if (selectedValue) {
        this.content.suburbpost(selectedValue).subscribe((response) => {
          if (response.status) {
            this.postcode = response.data[0].postCode;

            // Use patchValue to update the specific form control
            this.bookingForm.get('customerInfo')?.patchValue({
              postCode: this.postcode, // Correctly update the form control
              suburb: response.data[0].locality,
            });
          } else {
            // Handle the error case
          }
        });
      }
    } else {
      console.warn('No valid value selected');
    }
  }

  getPostCodepost(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.value) {
      const enteredValue = inputElement.value.trim(); // Trim leading/trailing spaces

      // Check if the input is valid (at least one character)
      if (enteredValue.length > 0) {
        this.content.suburbpost(enteredValue).subscribe((response) => {
          if (response.status && response.data.length > 0) {
            this.bookingForm.get('customerInfo')?.patchValue({
              state: response.data[0]?.state,
              suburb: response.data[0]?.locality,
            });
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
    this.bookingForm.get('customerInfo')?.patchValue({
      state: '',
      suburb: '',
    });
  }

  // unique Email

  // postUniqueEmail(){
  //   let paylaod  = {
  //     email : this.bookingForm.value.customerInfo.email
  //   }

  //   this.content.uniqueEmail(paylaod).subscribe(response => {
  //     if(response.status == true) {

  //     } else {

  //     }
  //   })
  // }

  // create account

  postAccount() {
    // Collect data from the form to create the payload

    if (this.accountform.value.password == '') {
      return
    }
    const payload = {
      email: this.accountform.value.email,
      password: this.accountform.value.password,
    };

    // Make a POST request to create the account
    debugger
    this.content.createAccount(payload).subscribe((response) => {
      if (response.status == true) { // Check if the response indicates success
        // Inform the user of successful account creation
        debugger
        localStorage.setItem('token', response.data.token);
        this.postIntialPayment();
        // alert('Service booked successfully.'); // Basic alert with success message
        //  this.bookingForm.reset();
        //  window.location.reload()
        //this.router.navigateByUrl('/booking-form/summary/' + this.bookId);
        debugger
        this.router.navigate(['/booking-form/summary', this.bookId, this.scheduleId]).then(() => {
          window.location.reload();
        });

      } else {
        this.bookingForm.reset();
        window.location.reload()
      }
    });
  }
  onEmailBlur() {
    this.emailTouched = true;
  }

  onphoneBlur() {
    this.phoneTouched = true;
  }

  // login

  login() {


    this.submitted = true
    if (this.loginform.invalid) {
      return;
    }
    let payload = {
      email: this.loginform.value.email,
      password: this.loginform.value.password,
    };

    this.content.login(payload).subscribe((response) => {
      if (response.status == true) {
      } else {
      }
    });
  }

  // get summarry error

  showModal5() {
    const modalElement = this.modal5.nativeElement;
    if (modalElement) {
      $(modalElement).modal('show'); // Use jQuery to show the modal
    }
  }


  cross() {
    window.location.reload();
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


  route() {
    this.router.navigate(['/booking-summary']);
  }


  postIntialPayment() {

    let payload = {
      bookingId: this.bookId,
      scheduleId :this.scheduleId
    }
    this.spinner.show();
    debugger
    this.content.getIntialPayment(payload).subscribe(response => {
      if (response.status == true) {
        //     localStorage.setItem('bookId',this.bookId);
        this.spinner.hide();
        //    window.location.href = response.data

      } else {
        this.spinner.hide();
      }
    });
  }

  pop() {
    this.showModal3();
  }


  downloadSummaryDivAsImage() {
    const summaryDiv = this.summaryDiv.nativeElement;
    const rect = summaryDiv.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    html2canvas(summaryDiv, { width, height }).then((canvas: HTMLCanvasElement) => {
      const imageDataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'summary.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
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
        this.toaster.success(response.message);
      } else {
        this.toaster.error(response.message);
      }
    });
  }


  // createToken(): void {
  //   debugger
  //   const name = "Stripe create token test";
  //   this.stripeService
  //     .createToken(this.card.element, { name })
  //     .subscribe((result) => {
  //       if (result.token) {
  //         // Use the token
  //         console.log(result.token.id);

  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }
}





