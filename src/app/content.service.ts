import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from './api-end-point';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }


  getBadroomList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.bedRoomList)
  }

  getBathroomList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.bathRoomList)
  }

  getKitchenList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.kitchenList)
  }

  getLivingAreaList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.livingAreaList)
  }

  getExtraServiceList(serviceId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.extraServiceList + '?serviceId=' + serviceId)
  }

  getTimeList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.timings)
  }

  getServiceType() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceTyptList)
  }


  getServiceOften(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.howOftenDiscount + '?serviceTypeId=' + data.serviceTypeId + '&bookingDate=' + data.bookingDate)
  }


  postSummary(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.summary, data)
  }
  discountCoupan(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.discountCode, data)
  }

  invalidDiscount(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.invalid + '?discountCode=' + data.discountCode
      + '&streetNo=' + data.streetNo + '&streetName=' + data.streetName + '&state=' + data.state + '&suburb=' + data.suburb
      + '&email=' + data.email + '&serviceTypeId=' + data.serviceTypeId
    )
  }

  book(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.bookService, data)
    
  }

  suburb() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSuburb)
  }

  suburbpost(searchQuery: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSuburb + '?searchQuery=' + searchQuery)
  }

  uniqueEmail(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.uniqueEmail, data)
  }

  createAccount(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.accountCreate, data) 
  }

  login(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.login, data)
  }
  resetPasswords(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.resetPassword, data)
  }
  changedPassword(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.changePassword, data)
  }

  phoneNumber(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.verifyPhoneNumber, data)
  }

  getIntialPayment(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.intialPayment, data)
  }

  getOrderConfirmation(bookingId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderConfirmation + '?bookingId=' + bookingId)

  }

  confirmationSummary(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.confirmationSummary + '?bookingId=' +  data.bookingId + '&scheduleId=' + data.scheduleId )
  }

  authorizePayment(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.authorizeCard, data)
  }
  getBookingList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.bookingList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }
  getProfileDetail(data: any): Observable<any>  {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.profileDetails, data)
  }
  rescheduleBookings(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.rescheduleBooking, data)
  }
  emailVerify(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.verifyEmail, data);
  }
  cancelBookings(bookingId: number, scheduleId: number) {
    const payload = {
      bookingId: bookingId,
      scheduleId: scheduleId
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.cancelBooking, payload);
  }

  getHome(){
    return  this.http.get<any>(environment.apiUrl + ApiEndPoint.home)
  }
  


  
getYearsList(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.yearsCleaning)
}

getCleaningType(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.typeCleaning)
}


getLikeWork(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.admlist)

}


getEquipmentList(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.equipmentList)
}

getVisaType(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.visaType)
}


getAdmSocial(){
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.admSocial)
}


JoinNOw(data:any){
  return this.http.post<any>(environment.apiUrl +  ApiEndPoint.join,data)
}




}
