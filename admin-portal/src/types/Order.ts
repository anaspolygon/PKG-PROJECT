type Payment = {
  status: string;
  payment_gateway: string;
};
export type OrderDetails = {
  id: number;
  gift_order_id: string;
  delivery_amount: string;
  payment_gateway: string;
  order_number: string;
  total_original_price: string;
  total_discounted_price: string;
  final_amount: string;
  total_amount: number;
  total_points: number;
  order_items: { quantity: number }[];
  gift_payment: Payment;
  payment: Payment;
};

export type OrderDetailsResponse = {
  orders: OrderDetails;
  data: OrderDetails;
};
