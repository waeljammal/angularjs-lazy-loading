package com.rs.model.user;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * Created by waeljammal on 08/10/2014.
 */
@Entity
@Table(name="roles")
@XmlRootElement(name="role")
public final class Role implements Serializable
{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    private String role;

    public Role() {} // Keep JAXB happy

    @JsonIgnore
    @JsonManagedReference
    @OneToMany
    @JoinTable(name="user_roles",
               joinColumns = {@JoinColumn(name="role_id", referencedColumnName="id")},
               inverseJoinColumns = {@JoinColumn(name="user_id", referencedColumnName="id")})
    private List<User> userList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<User> getUserList()
    {
        return userList;
    }

    public void setUserList(List<User> userList)
    {
        this.userList = userList;
    }
}
