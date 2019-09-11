package com.info5059.casestudy.vendor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

    @Repository
    @RepositoryRestResource(collectionResourceRel = "vendors", path = "vendors")
    public interface VendorRepository extends CrudRepository<Vendor, Long> {
    }

