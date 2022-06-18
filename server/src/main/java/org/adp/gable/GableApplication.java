package org.adp.gable;

import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.entity.UserEntity;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * @author zzq
 */
@SpringBootApplication
public class GableApplication {

	public static void main(String[] args) {
		SpringApplication.run(GableApplication.class, args);
	}

}
