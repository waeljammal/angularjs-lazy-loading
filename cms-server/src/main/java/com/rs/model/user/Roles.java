package com.rs.model.user;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by Wael Jammal on 11/09/2014.
 *
 * Wraps the Skill objects for transport.
 */
@XmlRootElement(name="roles")
@SuppressWarnings("serial")
public final class Roles
{
    private List<Role> data;

    public Roles() {} // Keep JAXB happy

    public Roles(List<Role> data)
    {
        this.data = data;
    }

    @XmlElement(name="role")
    public List<Role> getData()
    {
        return data;
    }
}
