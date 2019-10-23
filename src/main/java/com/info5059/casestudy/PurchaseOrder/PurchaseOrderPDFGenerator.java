package com.info5059.casestudy.PurchaseOrder;
import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.vendor.VendorRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.aspectj.weaver.ast.Or;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
/**
 * Generator - a class for testing how to create dynamic output in PDF
 * format using the iText library
 */
public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {
    public static ByteArrayInputStream generatePurchaseOrder(String poid,
                                                      PurchaseOrderDAO purchaseOrderDAO,
                                                      VendorRepository vendorRepository,
                                                      ProductRepository productRepository) {

       // URL imageUrl = com.info5059.exercises.Report.ReportPDFGenerator.class.getResource("/public/images/Expenses.png");
        URL imageUrl = com.info5059.casestudy.PurchaseOrder.PurchaseOrderPDFGenerator.class.getResource("/public/images/SmallIcon.PNG");
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Font catFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD);
        Font subFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
        Font smallBold = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        Locale locale = new Locale("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

        try {
            PurchaseOrder po = purchaseOrderDAO.findOne(Long.parseLong(poid));
            Optional<Vendor> opt = vendorRepository.findById(po.getVendorid());

            PdfWriter.getInstance(document, baos);
            document.open();
            Paragraph preface = new Paragraph();
            // add the logo here
            Image image1 = Image.getInstance(imageUrl);
            image1.setAbsolutePosition(55f, 750f);
            image1.setWidthPercentage(15);
            preface.add(image1);
            preface.setAlignment(Element.ALIGN_RIGHT);
            // Lets write a big header
            Paragraph mainHead = new Paragraph(String.format("%55s", "PURCHASE ORDER"), catFont);
            preface.add(mainHead);
            preface.add(new Paragraph(String.format("%90s", "PO#:" + poid), subFont));
            addEmptyLine(preface, 3);
            // 3 column table
            if (opt.isPresent()){
                Vendor vendor = opt.get();
                PdfPTable empTable = new PdfPTable(2);
                PdfPCell cell = new PdfPCell(new Phrase("Vendor:",subFont));
                cell.setBorder(0);
                empTable.addCell(cell);
                cell = new PdfPCell(new Phrase(vendor.getName()));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setBorder(0);
                empTable.addCell(cell);
                cell = new PdfPCell(new Phrase(""));
                cell.setBorder(0);
                empTable.addCell(cell); // add empty cell
                cell = new PdfPCell(new Phrase(vendor.getAddress1()));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setBorder(0);
                empTable.addCell(cell);
                cell = new PdfPCell(new Phrase(""));
                cell.setBorder(0);
                empTable.addCell(cell); // add empty cell
                cell = new PdfPCell(new Phrase(vendor.getCity()));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setBorder(0);
                empTable.addCell(cell);
                cell = new PdfPCell(new Phrase(""));
                cell.setBorder(0);
                empTable.addCell(cell); // add empty cell
                cell = new PdfPCell(new Phrase(vendor.getProvince()));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setBorder(0);
                empTable.addCell(cell);
                cell = new PdfPCell(new Phrase(""));
                cell.setBorder(0);
                empTable.addCell(cell); // add empty cell
                cell = new PdfPCell(new Phrase(vendor.getPostalcode()));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setBorder(0);
                empTable.addCell(cell);
                empTable.setHorizontalAlignment(PdfPTable.ALIGN_LEFT);
                empTable.setWidthPercentage(40);
                preface.add(empTable);
                addEmptyLine(preface, 1);
            }
            PdfPTable table = new PdfPTable(5);
            PdfPCell cell = new PdfPCell(new Paragraph("Product Code"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Product Description"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Quantity Sold"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Price"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Ext. Price"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            BigDecimal tot = new BigDecimal(0.0);
            BigDecimal tax = new BigDecimal(0.0);
            BigDecimal Ordertot = new BigDecimal(0.0);
            BigDecimal extprice = new BigDecimal(0.0);

            // dump out the line items
            for (PurchaseOrderLineitem line : po.getItems()) {
                Optional<Product> optx = productRepository.findById(line.getProductid());
                if (optx.isPresent()) {
                    Product prod = optx.get();
                    PdfPCell c1 = new PdfPCell(new Paragraph(prod.getId()));
                    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(c1);
                    c1 = new PdfPCell(new Paragraph(prod.getName()));
                    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(c1);
                    c1 = new PdfPCell(new Paragraph(BigDecimal.valueOf(line.getQty()).toString()));
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);
                    c1 = new PdfPCell(new Paragraph(formatter.format(prod.getCostprice())));
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);
                    extprice = prod.getCostprice().multiply(BigDecimal.valueOf(line.getQty()));
                    c1 = new PdfPCell(new Paragraph(formatter.format(extprice)));
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);

                    Ordertot = Ordertot.add(extprice, new MathContext(8,RoundingMode.UP));
                    tot = tot.add(extprice, new MathContext(8, RoundingMode.UP));
                }
            }
            BigDecimal decTax = new BigDecimal(0.13);
            tax = tot.multiply(decTax);
            Ordertot = Ordertot.add(tax);
            cell = new PdfPCell(new Phrase(""));
            cell.setBorder(0);
            cell.setColspan(3);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase("Total:"));
            cell.setBorder(0);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase(formatter.format(tot))));
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
           // cell.setBackgroundColor(BaseColor.YELLOW);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(""));
            cell.setBorder(0);
            cell.setColspan(3);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase("Tax:"));
            cell.setBorder(0);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(new Phrase(formatter.format(tax))));
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            //cell.setBackgroundColor(BaseColor.YELLOW);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(""));
            cell.setBorder(0);
            cell.setColspan(3);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase("Order Total:"));
            cell.setBorder(0);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
            //Ordertot = Ordertot.add(tax);
            cell = new PdfPCell(new Phrase(new Phrase(formatter.format(Ordertot))));
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setBackgroundColor(BaseColor.YELLOW);
            table.addCell(cell);
            preface.add(table);
            addEmptyLine(preface, 3);
            preface.setAlignment(Element.ALIGN_CENTER);
            Paragraph para = new  Paragraph((String.format("Purchase Order Generated on: %6s" ,new Date())));
            para.setAlignment(Paragraph.ALIGN_CENTER);
            preface.add(para);
            document.add(preface);
            document.close();
        } catch (Exception ex) {
            Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }
    private static void addEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }
}
