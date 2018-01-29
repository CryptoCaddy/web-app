package com.cryptocaddy.services.auditing.model.attributes;

public class CreateAccountRequestBody {
    private String firstName;
    private String lastName;
    private String language;
    private String country;
    private String emailAddress;
    private String userName;
    private String password;

    public CreateAccountRequestBody(String firstName, String lastName, String language, String country, String emailAddress, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.language = language;
        this.country = country;
        this.emailAddress = emailAddress;
        this.userName = userName;
        this.password = password;
    }

    public CreateAccountRequestBody() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
