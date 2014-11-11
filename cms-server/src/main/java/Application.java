import com.rs.model.user.Role;
import com.rs.model.user.User;
import com.rs.repository.RoleRepository;
import com.rs.repository.UserRepository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by Wael Jammal on 10/09/2014.
 */
@ComponentScan
@EnableAutoConfiguration
public class Application
{
    public static void main(String[] args)
    {
        ConfigurableApplicationContext context =SpringApplication.run(Application.class, args);

        RoleRepository roleRepository = context.getBean(RoleRepository.class);

        Role role = new Role();
        role.setRole("Admin");

        roleRepository.save(role);

        role = new Role();
        role.setRole("Guest");

        role = roleRepository.save(role);

        UserRepository userRepository = context.getBean(UserRepository.class);

        User user = new User();
        user.setEmail("waeljammal@msn.com");
        user.setFirstName("Wael");
        user.setLastName("Jammal");
        user.setNickName("Wael Jammal");
        user.setPassword("jammal123");
        user.setRole(role);

        userRepository.save(user);
    }
}
