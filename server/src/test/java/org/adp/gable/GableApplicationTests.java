package org.adp.gable;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class GableApplicationTests {

	@Resource
	ObjectMapper objectMapper;

	@Test
	void contextLoads() {
		assertNotNull(objectMapper);
	}

}
