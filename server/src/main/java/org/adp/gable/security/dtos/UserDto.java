package org.adp.gable.security.dtos;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import org.adp.gable.security.utils.AuthoritiesSerializeUtil;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Set;

/**
 * @author zzq
 */
@Data
public class UserDto implements UserDetails {

    private Long id;

    private Long tenantId;

    private Long createdBy;

    private Date dateCreated;

    private Long modifiedBy;

    private Date dateModified;

    private String operationUrl;

    private String dataFrom;

    private String username;

    private String password;

    private String email;

    private String avatar;

    private Boolean accountNonExpired;

    private Boolean accountNonLocked;

    private Boolean credentialsNonExpired;

    private Boolean enabled;

    @JsonDeserialize(using = AuthoritiesSerializeUtil.class)
    private Set<SimpleGrantedAuthority> authorities;

    @Override
    public Set<SimpleGrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
