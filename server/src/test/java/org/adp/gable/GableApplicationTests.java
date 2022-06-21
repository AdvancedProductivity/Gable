package org.adp.gable;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.common.utils.I18nUtils;
import org.adp.gable.security.dao.RolePermissionRepository;
import org.adp.gable.security.dao.RoleRepository;
import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.entity.RoleEntity;
import org.adp.gable.security.entity.RolePermissionRelation;
import org.adp.gable.security.entity.UserEntity;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

	@Resource
	private MessageSource messageSource;

	@Test
	@DisplayName("test app start")

	void contextLoads() {
		assertNotNull(objectMapper);
	}

	@Test
	@DisplayName("test i18n resource working")
	public void testI18nWorking(){
		assertNotNull(messageSource);
		//
		final String message1 = I18nUtils.getMessage(SecurityErrorResult.USER_NOT_EXIST.getMessageI18nKey(), null);
		assertEquals("账号不存在", message1);
		LocaleContextHolder.setLocale(Locale.US);
		final String message = I18nUtils.getMessage(SecurityErrorResult.USER_NOT_EXIST.getMessageI18nKey(), null);
		assertEquals("Username Not Exist", message);
		LocaleContextHolder.resetLocaleContext();
	}

	@Test
	@DisplayName("test i18n key not exist")
	public void testI18nNotExist(){
		String randomSt = RandomStringUtils.random(10, true, true);
		final String message1 = I18nUtils.getMessage(randomSt, null);
		assertEquals(message1, randomSt);
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
