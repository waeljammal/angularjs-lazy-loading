package com.rs.rest;

import com.rs.model.user.Role;
import com.rs.model.user.User;
import com.rs.repository.RoleRepository;
import com.rs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Wael Jammal on 10/09/2014.
 */
@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(method = RequestMethod.GET, produces={"application/json"})
    public java.util.List<User> getAll()
    {
        return (java.util.List<User>) userRepository.findAll();
    }

    @RequestMapping(value = "/role/{id}", method=RequestMethod.GET, produces={"application/json"})
    public java.util.List<User> getByRole(@PathVariable("id") long id, HttpServletResponse response) throws IOException
    {
        Role role = roleRepository.findOne(id);

        if(role == null)
        {
            response.sendError(HttpServletResponse.SC_NO_CONTENT, "Role not found");
            return null;
        }

        return userRepository.findByRole(role);
    }
}