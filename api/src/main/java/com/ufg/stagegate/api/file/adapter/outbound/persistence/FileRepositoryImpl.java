package com.ufg.stagegate.api.file.adapter.outbound.persistence;

import com.ufg.stagegate.api.file.domain.model.File;
import com.ufg.stagegate.api.file.domain.port.outbound.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class FileRepositoryImpl implements FileRepository {

    private final FileJpaRepository jpaRepository;

    @Override
    public File save(File file) {
        return jpaRepository.save(file);
    }

    @Override
    public Optional<File> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsByBucketAndStoragePath(String bucket, String storagePath) {
        return jpaRepository.existsByBucketAndStoragePath(bucket, storagePath);
    }
}
