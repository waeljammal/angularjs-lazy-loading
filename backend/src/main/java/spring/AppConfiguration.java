package spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.hibernate.Hibernate;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateExceptionTranslator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.sql.DataSource;
import java.util.List;
import java.util.Properties;


/**
 * Created by Wael Jammal on 10/09/2014.
 *
 * Spring JavaConfig
 */
@EnableWebMvc
@Configuration
@ComponentScan(basePackages = { "com.rs" })
@EnableJpaRepositories(basePackages = { "com.rs.repository" })
@EnableTransactionManagement
@PropertySource(value = { "classpath:application.properties" })
public class AppConfiguration extends WebMvcConfigurerAdapter
{
    public static final String DB_NAME = "skillDb";

    @Autowired
    private Environment env;

    /////////////////////////////////////////////////////////////////
    // Datasource
    /////////////////////////////////////////////////////////////////

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer()
    {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public DataSource dataSource()
    {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(env.getProperty("jdbc.url"));
        dataSource.setUsername(env.getProperty("jdbc.username"));
        dataSource.setPassword(env.getProperty("jdbc.password"));

        return dataSource;
    }

    /////////////////////////////////////////////////////////////////
    // JPA Database & Adapter Config
    /////////////////////////////////////////////////////////////////

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory()
    {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(true);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource());
        factory.setPersistenceUnitName(DB_NAME);
        factory.setPackagesToScan("com.rs");
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setJpaProperties(jpaProperties());
        factory.afterPropertiesSet();


        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager()
    {
        return new JpaTransactionManager(entityManagerFactory().getObject());
    }

    @Bean
    public HibernateExceptionTranslator exceptionTranslator()
    {
        return new HibernateExceptionTranslator();
    }

    public Properties jpaProperties()
    {
        Properties properties = new Properties();

        properties.put(org.hibernate.cfg.Environment.HBM2DDL_AUTO, "create-drop");

        return properties;
    }

    /////////////////////////////////////////////////////////////////
    // REST Object Mapping and Tidy output
    /////////////////////////////////////////////////////////////////

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter()
    {
        MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
        mappingJackson2HttpMessageConverter.setObjectMapper(objectMapper());
        return mappingJackson2HttpMessageConverter;
    }

    @Bean
    public ObjectMapper objectMapper()
    {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        return mapper;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
    {
        converters.add(mappingJackson2HttpMessageConverter());
        converters.add(new StringHttpMessageConverter());
        converters.add(new Jaxb2RootElementHttpMessageConverter());
        super.configureMessageConverters(converters);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer)
    {
        configurer.favorPathExtension(true)
                .ignoreAcceptHeader(true)
                .defaultContentType(MediaType.APPLICATION_JSON)
                .useJaf(false)
                .mediaType("html", MediaType.TEXT_HTML)
                .mediaType("json", MediaType.APPLICATION_JSON)
                .mediaType("xml", MediaType.APPLICATION_XML);
    }
}