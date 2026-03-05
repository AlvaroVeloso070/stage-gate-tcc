package com.ufg.stagegate.api.file.adapter.outbound.storage;

import com.ufg.stagegate.api.core.config.FileStorageProperties;
import com.ufg.stagegate.api.file.domain.exception.FileStorageException;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileUploadResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestOutputStream;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.HexFormat;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "file.storage.type", havingValue = "local")
public class LocalFileManipulator implements FileManipulator {

    private final FileStorageProperties properties;

    @Override
    public FileUploadResult upload(String bucket, String storagePath, InputStream data,
            long size, String contentType) {
        Path targetPath = resolvePath(bucket, storagePath);
        try {
            Files.createDirectories(targetPath.getParent());

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            try (OutputStream out = new DigestOutputStream(Files.newOutputStream(targetPath), digest)) {
                data.transferTo(out);
            }

            String checksum = HexFormat.of().formatHex(digest.digest());
            log.debug("Uploaded file to local path '{}'", targetPath);
            return new FileUploadResult(null, checksum);

        } catch (Exception e) {
            throw new FileStorageException("Failed to write file to local path '%s'".formatted(targetPath), e);
        }
    }

    @Override
    public InputStream download(String bucket, String storagePath) {
        Path filePath = resolvePath(bucket, storagePath);
        try {
            return Files.newInputStream(filePath);
        } catch (IOException e) {
            throw new FileStorageException("Failed to read file from local path '%s'".formatted(filePath), e);
        }
    }

    @Override
    public void delete(String bucket, String storagePath) {
        Path filePath = resolvePath(bucket, storagePath);
        try {
            boolean deleted = Files.deleteIfExists(filePath);
            if (deleted) {
                log.debug("Deleted local file '{}'", filePath);
            }
        } catch (IOException e) {
            throw new FileStorageException("Failed to delete file at local path '%s'".formatted(filePath), e);
        }
    }

    @Override
    public String generatePresignedDownloadUrl(String bucket, String storagePath, Duration expiry) {
        throw new UnsupportedOperationException(
                "Presigned URLs are not supported by the local filesystem implementation. Use the download endpoint instead.");
    }

    @Override
    public boolean exists(String bucket, String storagePath) {
        return Files.exists(resolvePath(bucket, storagePath));
    }

    private Path resolvePath(String bucket, String storagePath) {
        String basePath = properties.local().basePath();
        return Paths.get(basePath, bucket, storagePath).normalize();
    }
}
