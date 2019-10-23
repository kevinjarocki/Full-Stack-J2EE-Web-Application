import {PurchaseOrderLineItem} from './purchase-order-line-item';
export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  items: PurchaseOrderLineItem[];
}
