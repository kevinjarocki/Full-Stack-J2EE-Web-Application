INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Un Trusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Un Trusted','Kevin Jarocki','ss@underthetable.com');

-- add some expenses to seed the table
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('12X45',1,'Widget',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('13X45',1,'Gadget',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('14X45',2,'Doo Hickey',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('15X45',2,'Thingamabob',329.98,359.99,5,5,10,0);
INSERT INTO Product (Id,VendorId,Name,CostPrice,MSRP,ROP,EOQ,QOH,QOO)
VALUES ('16X45',2,'Widget',329.98,359.99,5,5,10,0);
