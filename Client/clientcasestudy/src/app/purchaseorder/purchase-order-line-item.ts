/**
 * ReportItem - container class for expense report item
 */
export interface PurchaseOrderLineItem {
  id: number;
  poid: number;
  productid: string;
  qty: number;
  price: number;
  tax: number;
  subtotal: number;
  extended: number;
}
