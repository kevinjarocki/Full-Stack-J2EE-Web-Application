package com.info5059.casestudy.PurchaseOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.PurchaseOrder.PurchaseOrder;
import com.info5059.casestudy.vendor.VendorRepository;
import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
@CrossOrigin
@RestController
public class PurchaseOrderPDFController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ProductRepository productRepository;
    @RequestMapping(value = "/PurchaseOrderPDF", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> streamPDF(HttpServletRequest request) throws IOException {
        String poid = request.getParameter("poid");
        // get formatted pdf as a stream
        ByteArrayInputStream bis = PurchaseOrderPDFGenerator.generatePurchaseOrder(poid,
                purchaseOrderDAO,
                vendorRepository,
                productRepository);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=PurchaseOrderPDF.pdf");
        // dump stream to browser
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
