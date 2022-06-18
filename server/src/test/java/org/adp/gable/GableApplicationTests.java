package org.adp.gable;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.security.dao.RolePermissionRepository;
import org.adp.gable.security.dao.RoleRepository;
import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.entity.RoleEntity;
import org.adp.gable.security.entity.RolePermissionRelation;
import org.adp.gable.security.entity.RoleUserRelation;
import org.adp.gable.security.entity.UserEntity;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GableApplicationTests {

	@Resource
	ObjectMapper objectMapper;

	@Resource
	private UserRepository userRepository;

	@Resource
	private RoleRepository roleRepository;

	@Resource
	private RolePermissionRepository rolePermissionRepository;


	@Test
	@DisplayName("test app start")

	void contextLoads() {
		assertNotNull(objectMapper);
	}

	@Test
	@DisplayName("test created supper user")
	void testCreatedSupperUser() {
		assertDoesNotThrow(() -> {
			final UserEntity fastLoginUser = userRepository.findById(0L).orElse(null);
			assertNotNull(fastLoginUser);
			System.out.println("fastLoginUser = " + fastLoginUser);
			final List<RoleEntity> roleByUserId = roleRepository.getRoleByUserId(fastLoginUser.getId());
			assertNotNull(roleByUserId);
			assertNotEquals(roleByUserId.size(), 0);

			List<RolePermissionRelation> rolePermissionRelations = rolePermissionRepository.findAll();

			assertNotNull(rolePermissionRelations);
			assertNotEquals(rolePermissionRelations.size(), 0);

			final List<RoleEntity> allRole = roleRepository.findAll();
			assertNotNull(allRole);
			assertNotEquals(allRole.size(), 0);
			List<Long> roleIds = new ArrayList<>();
			int i = 0;
			for (RoleEntity roleEntity : allRole) {
				roleIds.add(roleEntity.getId());
				if (roleEntity.getAdminRole()) {
					break;
				}
				i++;
			}
			assertNotEquals(allRole.size(), i);
			i = 0;
			for (RoleEntity roleEntity : allRole) {
				if (StringUtils.startsWith(roleEntity.getName(), "SUPPER_ROLE")) {
					break;
				}
				i++;
			}
			assertNotEquals(allRole.size(), i);

			final List<String> permissionsByRoleIds = rolePermissionRepository.getPermissionsByRoleIds(roleIds);

			assertNotNull(permissionsByRoleIds);
			assertNotEquals(permissionsByRoleIds.size(), 0);

		});
	}


}
