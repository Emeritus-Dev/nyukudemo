export type FulfillmentType = 'delivery' | 'pickup' | 'meetup';

export type DeliveryProvider =
  | 'paxi'
  | 'pudo_locker'
  | 'courier_guy_locker'
  | 'courier_guy_kiosk';

export type PaymentMethod =
  | 'card'
  | 'ozow_eft'
  | 'payflex'
  | 'payjustnow'
  | 'happypay'
  | 'mobicred';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  isGuest: boolean;
}

export interface FulfillmentDetails {
  type: FulfillmentType;
  deliveryProvider?: DeliveryProvider;
  destinationAddress?: string; // Street address, PEP Store point, or Pudo locker location
  city?: string;
  postalCode?: string;
  meetupLocationNotes?: string;
}

export interface OrderData {
  orderNumber: string;
  customer: CustomerDetails;
  fulfillment: FulfillmentDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  items: Array<{
    title: string;
    size: string;
    quantity: number;
    price: string;
    image: string;
  }>;
  createdAt: string;
}