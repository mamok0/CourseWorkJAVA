package com.pikachuk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin()
@RestController
@RequestMapping("users")
@Validated
public class UsersController {
    private final UserRepo repository;

    @Autowired
    public UsersController(UserRepo repository) {
        this.repository = repository;
    }

    @PostMapping()
    public ResponseEntity<HttpStatus> findUser(@RequestBody User user) {
        List<User> users = repository.findAll();

        if (users.contains(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}