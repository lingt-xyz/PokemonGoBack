package dao;

import models.User;

public class UserDAO {

    public static User login(User bean) {

        String username = bean.getUsername();
        String password = bean.getPassword();

        // "System.out.println" prints in the console; Normally used to trace the process
        System.out.println("Your user name is " + username);
        System.out.println("Your password is " + password);

        if ("test".equals(username) && "COMP354".equals(password)) {
            String firstName = username;
            String lastName = ("Lastname");

            System.out.println("Welcome " + firstName);
            bean.setFirstName(firstName);
            bean.setLastName(lastName);
            bean.setValid(true);
        } else {
            bean.setValid(false);
        }

        return bean;
    }
}
