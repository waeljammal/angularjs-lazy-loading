package com.rs.rest;

import com.rs.model.user.Role;
import com.rs.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Wael Jammal on 10/09/2014.
 */
@RestController
@RequestMapping("/roles")
public class UserRoleController
{
    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(method = RequestMethod.GET,
                    produces={"application/json"})
    public java.util.List<Role> getAll()
    {
        return (java.util.List<Role>) roleRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST,
                    consumes = {"application/json"},
                    produces={"application/json"})
    public Role create(@RequestBody @Valid Role role)
    {
        return roleRepository.save(role);
    }

    @RequestMapping(value="/{id}",
                    method=RequestMethod.POST,
                    consumes = {"application/json"},
                    produces={"application/json"})
    public Role update(@PathVariable("id") long id, @RequestBody @Valid Role role)
    {
        return roleRepository.save(role);
    }

    @RequestMapping(value="/{id}",
                    method=RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable("id") long id)
    {
        roleRepository.delete(id);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
}
