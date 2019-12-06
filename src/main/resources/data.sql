INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Un Trusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Un Trusted','Kevin Jarocki','ss@underthetable.com');

-- add some expenses to seed the table
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('12X45',1,'Company Car',1329.98,1359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('13X45',1,'Office Computer',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('14X45',2,'Office Laptop',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('15X45',2,'Company Meal Plan',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('16X45',2,'Technical Equipment',329.98,359.99,5,5,10,0);

-- add some expenses to seed the table
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('17X45',1,'Company Van',1329.98,1359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('18X45',1,'Personal Computer',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('19X45',2,'Assistant Laptop',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('20X45',2,'Mcdonald Meal Plan',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('21X45',2,'Resource Equipment',1329.98,359.99,5,5,10,0);

-- -- -- adding purchaseorders
 INSERT INTO PURCHASE_ORDER (ID,VENDORID,AMOUNT ,PODATE) VALUES ( 1,4, 2713.12,CURRENT_TIMESTAMP );
--  --INSERT INTO Purchase_Order (VendorId, Amount,DateCreated) VALUES ( 3, CURRENT_TIMESTAMP );
--  --INSERT INTO Purchase_Order (VendorId, Amount,DateCreated) VALUES ( 3, CURRENT_TIMESTAMP );
--
--
--
INSERT INTO PURCHASE_ORDER_LINEITEM (ID,POID,PRODUCTID,QTY, PRICE)
VALUES ( 1,1, '12X45',2,2719.98);
INSERT INTO PURCHASE_ORDER_LINEITEM (ID, POID,PRODUCTID,QTY, PRICE)
VALUES (2, 1, '17X45',2,2719.98);
INSERT INTO PURCHASE_ORDER_LINEITEM (ID,POID,PRODUCTID,QTY, PRICE)
VALUES ( 3,1, '13X45',2,719.98);
-- INSERT INTO PURCHASE_ORDER_LINEITEM (ID, POID,PRODUCTID,QTY, PRICE)
-- VALUES (3, 1, '18X45',2,719.98‬);
-- INSERT INTO PURCHASE_ORDER_LINEITEM (ID, POID,PRODUCTID,QTY, PRICE)
-- VALUES (3, 1, '15X45',4,439.96‬);
-- INSERT INTO PurchaseOrderLineItem (POID,ProductId,QTY, PRICE)
-- VALUES ( 3, '12X45',2,2719.98);
-- INSERT INTO PurchaseOrderLineItem (POID,ProductId,QTY, PRICE)
-- VALUES ( 3, '17X45',2,2719.98);
-- INSERT INTO PurchaseOrderLineItem (POID,ProductId,QTY, PRICE)
-- VALUES ( 3, '15X45',4,439.96‬);
