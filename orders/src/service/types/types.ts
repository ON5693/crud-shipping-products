export type ShippingEstimate = {
    cost: number;
    estimatedDays: number;
  }

  export type OrdersDto = {
    quantity: number;
    additionalInfo?: string;
  }