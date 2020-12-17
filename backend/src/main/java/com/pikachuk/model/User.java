package com.pikachuk.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("logins")
public class User {
    @Id
    private String id;
    private String username;

    private String password;

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public User(){ }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return this.username.equals(user.getUsername()) && this.password.equals(user.getPassword());
    }

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

}
