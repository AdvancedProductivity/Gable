package org.adp.gable.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author zzq
 */
@Configuration
@Slf4j
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${local.filepath}")
    private String localFilepath;

    /**
     * static resource
     *
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String filePath = "file:" + localFilepath;
        log.info("static file location: {}", filePath);
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/", filePath);
    }

}
