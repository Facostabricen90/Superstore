export interface Orders {
  rowId: number;
  orderId: string;
  orderDate: number | string;
  shipDate: number | string;
  shipMode: string;
  customerId: string;
  customerName: string;
  segment: string;
  countryRegion: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  region: string;
  productId: string;
  category: string;
  subCategory: string;
  productName: string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
}

export interface People {
  regionalManager: string;
  region: string;
}

export interface Returns {
  orderId: string;
  returned: string;
}

export interface ApiResponse {
  orders: Orders[];
  people: People[];
  returns: Returns[];
}
