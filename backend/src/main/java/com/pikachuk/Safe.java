package com.pikachuk;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("safes")
public class Safe {
  @Id
  private String id;
  private String title;

  private String description;
  private String image;

  private Integer price;

  public Safe(String title, String description, Integer price, String image){
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
  }

  public Safe(){ }


  public String getTitle() {return title;}

  public void setTitle(String title) {this.title = title;}

  public String getDescription() {return description;}

  public void setDescription(String description) {this.description = description;}

  public Integer getPrice() {return price;}

  public void setPrice(Integer price) {this.price = price;}

  public String getImage() {return image;}

  public void setImage(String image) {this.image = image;}


}
