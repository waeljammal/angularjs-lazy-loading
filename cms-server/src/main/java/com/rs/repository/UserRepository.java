package com.rs.repository;

import com.rs.model.user.Role;
import com.rs.model.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Wael Jammal on 10/09/2014.
 */
public interface UserRepository extends CrudRepository<User, Long>
{
    List<User> findByRole(Role role);
}
