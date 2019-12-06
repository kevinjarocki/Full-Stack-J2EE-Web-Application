package com.info5059.casestudy.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class LoginController {
    // dummy url that will only get hit if authenticated
    @PostMapping("/login")
    public ResponseEntity<Boolean> login() {
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
