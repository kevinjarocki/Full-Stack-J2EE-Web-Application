package com.info5059.casestudy.PurchaseOrder;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue
    private Long Id;
    private Long vendorid;
    private BigDecimal amount;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date podate;
    @OneToMany(mappedBy = "poid", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PurchaseOrderLineitem> items = new ArrayList<PurchaseOrderLineitem>();

    public void setDatecreated(Date date) {
        podate = date;
    }

    public Long getVendorid() {
        return vendorid;
    }

    public void setVendorid(Long vendorid) {
        this.vendorid = vendorid;
    }

    public List<PurchaseOrderLineitem> getItems() {
        return items;
    }

    public Long getId() {
        return Id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

}
