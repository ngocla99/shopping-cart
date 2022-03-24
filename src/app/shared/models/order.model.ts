export interface OrderDetail {
  id: number;
  userId: number;
  totalPrice: number;
  address: string;
  contact: string;
  isPaid: boolean;
  status: string;
  paymentMethod: string;
  updatedAt: string;
  createdAt: string;
  paidAt: string;
}

export interface OrdersData extends OrderDetail {
  total: number;
  result: OrderDetail[];
}

export interface OrderUpdate {
  address?: string;
  contact?: string;
  paymentMethod?: string;
  isPaid?: boolean;
  paidAt?: string;
  status?: string;
}
