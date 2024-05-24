import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from './api-end-point';
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

  invalidDiscount(discountCode: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.invalid + '?discountCode=' + discountCode)
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

  phoneNumber(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.verifyPhoneNumber, data)
  }

  getIntialPayment(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.intialPayment, data)
  }

  getOrderConfirmation(bookingId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderConfirmation + '?bookingId=' + bookingId)

  }

  confirmationSummary(bookingId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.confirmationSummary + '?bookingId=' + bookingId)
  }

  authorizePayment(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.authorizeCard, data)
  }

}
