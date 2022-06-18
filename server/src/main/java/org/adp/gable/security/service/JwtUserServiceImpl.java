package org.adp.gable.security.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.security.dao.RolePermissionRepository;
import org.adp.gable.security.dao.RoleRepository;
import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.entity.RoleEntity;
import org.adp.gable.security.entity.UserEntity;
import org.adp.gable.security.utils.JwtConst;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Example;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author zzq
 */
@Service
@Slf4j
public class JwtUserServiceImpl implements UserDetailsService {

    @Resource
    private UserRepository userRepository;

    @Resource
    private RoleRepository roleRepository;

    @Resource
    private RolePermissionRepository rolePermissionRepository;

    /**
     * this method will search the authority
     * @return UserDto with authority
     * */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Example<UserEntity> example = Example.of(new UserEntity(email));
        final UserEntity userEntity = userRepository.findOne(example).orElse(null);
        if (userEntity == null) {
            return null;
        }
        log.info("find user detail for username: {} user: {}", email, userEntity);
        final UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userEntity, userDto);
        final List<RoleEntity> roles = roleRepository.getRoleByUserId(userDto.getId());
        Set<SimpleGrantedAuthority> authorities = Collections.EMPTY_SET;
        if (CollectionUtils.isNotEmpty(roles)) {
            authorities = new HashSet<>();
            List<Long> roleIds = new ArrayList<>();
            for (RoleEntity role : roles) {
                authorities.add(new SimpleGrantedAuthority(JwtConst.ROLE_PREFIX + role.getName()));
                roleIds.add(role.getId());
            }
            final List<String> permissionsByRoleIds = rolePermissionRepository.getPermissionsByRoleIds(roleIds);
            for (String permissionCode : permissionsByRoleIds) {
                authorities.add(new SimpleGrantedAuthority(permissionCode));
            }
        }
        userDto.setAuthorities(authorities);
        return userDto;
    }
}
