package db;

import models.User;

public interface IDatabase {

    boolean validateUser(User user);
}
