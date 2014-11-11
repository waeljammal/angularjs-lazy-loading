package com.rs.model.user;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by Wael Jammal on 11/09/2014.
 *
 * Wraps the Skill objects for transport.
 */
@XmlRootElement(name="users")
@SuppressWarnings("serial")
public final class Users
{
    private List<User> data;

    public Users() {} // Keep JAXB happy

    public Users(List<User> data)
    {
        this.data = data;
    }

    @XmlElement(name="user")
    public List<User> getData()
    {
        return data;
    }
}
