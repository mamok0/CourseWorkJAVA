package com.pikachuk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("safes")
@Validated
public class SafesController {
  private final SafeRepo repository;

  @Autowired
  public SafesController(SafeRepo repository) {
    this.repository = repository;
  }

  @GetMapping()
  @ResponseStatus(HttpStatus.OK)
  public List<Safe> getAll() {
    return repository.findAll();
  }

  @GetMapping("{id}")
  public ResponseEntity<Safe> getSafeById(@PathVariable("id") String id) {
    Optional<Safe> safeData = repository.findById(id);

    if (safeData.isPresent()) {
      return ResponseEntity.ok(safeData.get());
    }
    return ResponseEntity.notFound().build();
  }

  @PutMapping("{id}")
  public ResponseEntity<Safe> updateSafe(@PathVariable("id") String id, @RequestBody Safe safe) {
    Optional<Safe> editSafe = repository.findById(id);

    if (editSafe.isPresent()) {
      Safe _safe = editSafe.get();
      _safe.setTitle(safe.getTitle());
      _safe.setDescription(safe.getDescription());
      _safe.setPrice(safe.getPrice());
      _safe.setImage(safe.getImage());
      repository.save(_safe);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public void createSafe(@RequestBody Safe safe) {
    Safe _safe = new Safe();
    _safe.setTitle(safe.getTitle());
    _safe.setDescription(safe.getDescription());
    _safe.setPrice(safe.getPrice());
    _safe.setImage(safe.getImage());
    repository.insert(safe);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<HttpStatus> deleteSafe(@PathVariable("id") String id) {
    try {
      repository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




}
