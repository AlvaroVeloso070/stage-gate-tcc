package com.ufg.stagegate.api.file.domain.port.outbound;

import com.ufg.stagegate.api.file.domain.model.File;

import java.util.Optional;
import java.util.UUID;

public interface FileRepository {

    File save(File file);

    Optional<File> findById(UUID id);

    void deleteById(UUID id);

    boolean existsByBucketAndStoragePath(String bucket, String storagePath);
}
