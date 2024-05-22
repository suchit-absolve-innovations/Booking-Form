import { Injectable } from '@angular/core';
declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: any;
  private elements: any;
  private card: any;

  constructor() {
    this.stripe = Stripe('pk_live_51P8a67L8TMFzydR937xJXJACJ8tz9HjJzC1CGsqvtPVCEM8Tq3WDbChJo2V9s7Ogp4bEHy6Bp7WkNNiaPXhI7bcE00ObIa4bS6'); // Replace with your Stripe publishable key
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
  }

  mountCard(elementId: string) {
    this.card.mount(elementId);
  }

  createToken() {
    debugger
    return this.stripe.createToken(this.card);
  }
}