package com.pikachuk.repository;

import com.pikachuk.model.Safe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SafeRepo extends MongoRepository<Safe, String> {
}
