package com.pikachuk.controller;

import com.pikachuk.model.User;
import com.pikachuk.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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