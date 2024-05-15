package com.vkv.backend.repository;

import com.vkv.backend.model.ConfirmationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationCodeRepository extends JpaRepository<ConfirmationCode, Integer> {
    ConfirmationCode findByCode(String confirmationCode);
}
