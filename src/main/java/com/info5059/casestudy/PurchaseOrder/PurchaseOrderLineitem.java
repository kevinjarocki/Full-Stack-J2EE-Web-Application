package com.info5059.casestudy.PurchaseOrder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrderLineitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long poid;
    private String productid;
    private int qty;
    private BigDecimal price;


    public void setPOid(Long id) {
        poid = id;
    }

    public String getProductid() {
        return productid;
    }

    public void setProductid(String productid) {
        this.productid = productid;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public BigDecimal getPrice() {
        return price;
    }



    public int getQty() {
        return this.qty;
    }
}
