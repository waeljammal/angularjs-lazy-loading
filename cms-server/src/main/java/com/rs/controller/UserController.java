package com.rs.controller;

import com.rs.repository.UserRepository;

import javax.annotation.Resource;

/**
 * Created by waeljammal on 08/10/2014.
 */
//@Controller
//@RequestMapping("/users")
public class UserController
{
    @Resource
    private UserRepository userRepository;

//    @RequestMapping(value = "/all",
//                    method = RequestMethod.GET,
//                    produces={"application/json", "application/xml"})
//    @ResponseStatus(HttpStatus.OK)
//    public @ResponseBody
//    Users getAllUsers(Model model)
//    {
//        return new Users((java.util.List<User>) userRepository.findAll());
//    }
}