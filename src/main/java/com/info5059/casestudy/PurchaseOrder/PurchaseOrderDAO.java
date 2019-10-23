package com.info5059.casestudy.PurchaseOrder;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.util.Date;
@Component
public class PurchaseOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Transactional
    public Long create(PurchaseOrder clientrep) {
        PurchaseOrder pOrder = new PurchaseOrder();
        pOrder.setDatecreated(new Date());
        pOrder.setVendorid(clientrep.getVendorid());
        pOrder.setAmount(clientrep.getAmount());
        entityManager.persist(pOrder);
        for(PurchaseOrderLineitem item :clientrep.getItems()) {
            PurchaseOrderLineitem realItem = new PurchaseOrderLineitem();
            realItem.setPOid(pOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setPrice(item.getPrice());
            realItem.setQty(item.getQty());
            entityManager.persist(realItem);
        }
        return pOrder.getId();
    }
    public PurchaseOrder findOne(Long id) {
        PurchaseOrder report = entityManager.find(PurchaseOrder.class, id);
        if (report == null) {
            throw new EntityNotFoundException("Can't find PO for ID "
                    + id);
        }
        return report;
    }
}
