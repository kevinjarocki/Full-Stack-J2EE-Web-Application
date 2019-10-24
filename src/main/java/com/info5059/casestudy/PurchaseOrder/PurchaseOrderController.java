package com.info5059.casestudy.PurchaseOrder;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
//@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;
    @PostMapping("/productorders")
    public ResponseEntity<Long> addOne(@RequestBody PurchaseOrder clientrep) {
        Long purchaseorderId = purchaseOrderDAO.create(clientrep);
        return new ResponseEntity<Long>(purchaseorderId, HttpStatus.OK);
    }
}
