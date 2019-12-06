package com.info5059.casestudy.product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class ProductController {
    @Autowired
    private QRCodeGenerator qrGenerator;
    @Autowired
    private ProductRepository productRepository;
    @GetMapping("/api/qrcode/{txt}")
    public ResponseEntity<byte[]> getQRCode(@PathVariable String txt) {
        byte[] qrcodebin = qrGenerator.generateQRCode(txt);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<byte[]>(qrcodebin, headers, HttpStatus.CREATED);
    }
    @GetMapping(value = "/api/pagedproducts", params = {"p", "s"})
    public Page<Product> findPaginated(@RequestParam("p") int page, @RequestParam("s") int size)
    {
        Page<Product> resultPage = productRepository.findAll(PageRequest.of(page, size));
        if (page > resultPage.getTotalPages()) {
            throw new ProductNotFoundException("");
        }
        return resultPage;
    }
    @PutMapping("api/products")
    public ResponseEntity<Product> addOne(@RequestBody Product dto) {
        Product original = productRepository.getOne(dto.getId());
        original.setCostprice(dto.getCostprice());
        original.setEoq(dto.getEoq());
        original.setMsrp(dto.getMsrp());
        original.setName(dto.getName());
        original.setQoh(dto.getQoh());
        original.setQoo(dto.getQoh());
        original.setRop(dto.getRop());
        original.setQrcodetxt(dto.getQrcodetxt());
        original.setQrcode(qrGenerator.generateQRCode(dto.getQrcodetxt()));
        Product updatedProduct = productRepository.saveAndFlush(original);
        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }
    @PostMapping("api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product dto) {
        dto.setQrcode(qrGenerator.generateQRCode(dto.getQrcodetxt()));
        Product newProduct = productRepository.saveAndFlush(dto);
        return new ResponseEntity<Product>(newProduct, HttpStatus.OK);
    }
}
