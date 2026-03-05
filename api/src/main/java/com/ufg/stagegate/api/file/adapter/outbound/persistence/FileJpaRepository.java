package com.ufg.stagegate.api.file.adapter.outbound.persistence;

import com.ufg.stagegate.api.file.domain.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FileJpaRepository extends JpaRepository<File, UUID> {

    boolean existsByBucketAndStoragePath(String bucket, String storagePath);
}
