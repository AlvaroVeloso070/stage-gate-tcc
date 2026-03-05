package com.ufg.stagegate.api.file.application.usecase;

import com.ufg.stagegate.api.core.config.FileStorageProperties;
import com.ufg.stagegate.api.file.adapter.inbound.rest.dto.FileUploadResponse;
import com.ufg.stagegate.api.file.domain.exception.FileStorageException;
import com.ufg.stagegate.api.file.domain.model.File;
import com.ufg.stagegate.api.file.domain.model.StorageTypeEnum;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileRepository;
import com.ufg.stagegate.api.file.domain.port.outbound.FileUploadResult;
import com.ufg.stagegate.api.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UploadFileUseCase {

    private final FileManipulator fileManipulator;
    private final FileRepository fileRepository;
    private final FileStorageProperties storageProperties;

    /**
     * Uploads a file using streaming (no full buffering in memory).
     *
     * @param inputStream  raw file stream from the HTTP request
     * @param originalName original filename provided by the client
     * @param contentType  MIME type of the file
     * @param size         exact byte size
     * @param entityPath   logical path within the bucket (e.g. "projects/uuid" or
     *                     "reports/uuid")
     * @param uploadedBy   user performing the upload (nullable)
     * @return FileUploadResponse with metadata of the saved file
     */
    @Transactional(rollbackFor = Exception.class)
    public FileUploadResponse execute(InputStream inputStream,
            String originalName,
            String contentType,
            long size,
            String entityPath,
            User uploadedBy) {
        String extension = extractExtension(originalName);
        String storedName = UUID.randomUUID() + (extension.isBlank() ? "" : "." + extension);
        String storagePath = entityPath + "/" + storedName;
        String bucket = resolveBucket();

        FileUploadResult uploadResult = fileManipulator.upload(bucket, storagePath, inputStream, size, contentType);

        File file = buildEntity(originalName, storedName, contentType, size, bucket,
                storagePath, uploadResult, uploadedBy);

        try {
            File saved = fileRepository.save(file);
            log.info("File '{}' saved with id={}", storagePath, saved.getId());
            return toResponse(saved);
        } catch (Exception dbEx) {
            // compensating action: remove orphan from storage if DB save fails
            log.error("DB save failed after upload. Attempting to remove orphan file '{}'", storagePath, dbEx);
            tryDeleteFromStorage(bucket, storagePath);
            throw new FileStorageException("Failed to persist file metadata after upload", dbEx);
        }
    }

    private String resolveBucket() {
        boolean isMinio = !"local".equalsIgnoreCase(storageProperties.type());
        return isMinio ? storageProperties.minio().bucket() : storageProperties.local().basePath();
    }

    private File buildEntity(String originalName, String storedName, String contentType,
            long size, String bucket, String storagePath,
            FileUploadResult result, User uploadedBy) {
        File file = new File();
        file.setOriginalName(originalName);
        file.setStoredName(storedName);
        file.setContentType(contentType);
        file.setSizeBytes(size);
        file.setBucket(bucket);
        file.setStoragePath(storagePath);
        file.setStorageType(resolveStorageType());
        file.setChecksumSha256(result.checksumSha256());
        file.setUploadedBy(uploadedBy);
        return file;
    }

    private StorageTypeEnum resolveStorageType() {
        return "local".equalsIgnoreCase(storageProperties.type()) ? StorageTypeEnum.LOCAL : StorageTypeEnum.MINIO;
    }

    private void tryDeleteFromStorage(String bucket, String storagePath) {
        try {
            fileManipulator.delete(bucket, storagePath);
        } catch (Exception cleanupEx) {
            log.error("Orphan file '{}' could NOT be removed from storage: {}", storagePath, cleanupEx.getMessage());
        }
    }

    private FileUploadResponse toResponse(File file) {
        return new FileUploadResponse(
                file.getId(),
                file.getOriginalName(),
                file.getContentType(),
                file.getSizeBytes(),
                file.getStoragePath(),
                file.getChecksumSha256(),
                file.getCreatedAt());
    }

    private String extractExtension(String filename) {
        if (filename == null || !filename.contains("."))
            return "";
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
}
