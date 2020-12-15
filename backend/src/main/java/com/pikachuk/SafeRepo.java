package com.pikachuk;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SafeRepo extends MongoRepository<Safe, String> {
}
