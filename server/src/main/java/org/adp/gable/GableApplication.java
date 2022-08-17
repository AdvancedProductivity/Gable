package org.adp.gable;


import lombok.Generated;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * @author zzq
 */
@SpringBootApplication
@EnableAsync
public class GableApplication {

	@Generated
	public static void main(String[] args) {
		SpringApplication.run(GableApplication.class, args);
	}

}
