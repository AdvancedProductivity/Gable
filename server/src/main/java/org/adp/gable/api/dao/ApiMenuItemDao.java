package org.adp.gable.api.dao;

import org.adp.gable.api.entity.ApiMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zzq
 */
public interface ApiMenuItemDao extends JpaRepository<ApiMenuItem, Long> {
}
