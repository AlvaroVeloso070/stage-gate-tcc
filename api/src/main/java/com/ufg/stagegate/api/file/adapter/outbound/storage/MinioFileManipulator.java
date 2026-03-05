package com.ufg.stagegate.api.file.adapter.outbound.storage;

import com.ufg.stagegate.api.file.domain.exception.FileStorageException;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileUploadResult;
import io.minio.*;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.HexFormat;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "file.storage.type", havingValue = "minio", matchIfMissing = true)
public class MinioFileManipulator implements FileManipulator {

    private final MinioClient minioClient;

    @Override
    public FileUploadResult upload(String bucket, String storagePath, InputStream data,
            long size, String contentType) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            DigestInputStream digestInputStream = new DigestInputStream(data, digest);

            ObjectWriteResponse response = minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(storagePath)
                            .stream(digestInputStream, size, -1)
                            .contentType(contentType)
                            .build());

            String checksum = HexFormat.of().formatHex(digest.digest());
            log.debug("Uploaded '{}' to bucket '{}', etag={}", storagePath, bucket, response.etag());
            return new FileUploadResult(response.etag(), checksum);

        } catch (Exception e) {
            throw new FileStorageException("Failed to upload file '%s' to bucket '%s'".formatted(storagePath, bucket),
                    e);
        }
    }

    @Override
    public InputStream download(String bucket, String storagePath) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucket)
                            .object(storagePath)
                            .build());
        } catch (Exception e) {
            throw new FileStorageException(
                    "Failed to download file '%s' from bucket '%s'".formatted(storagePath, bucket), e);
        }
    }

    @Override
    public void delete(String bucket, String storagePath) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(storagePath)
                            .build());
            log.debug("Deleted '{}' from bucket '{}'", storagePath, bucket);
        } catch (Exception e) {
            throw new FileStorageException("Failed to delete file '%s' from bucket '%s'".formatted(storagePath, bucket),
                    e);
        }
    }

    @Override
    public String generatePresignedDownloadUrl(String bucket, String storagePath, Duration expiry) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .bucket(bucket)
                            .object(storagePath)
                            .method(Method.GET)
                            .expiry((int) expiry.toSeconds(), TimeUnit.SECONDS)
                            .build());
        } catch (Exception e) {
            throw new FileStorageException("Failed to generate presigned URL for '%s'".formatted(storagePath), e);
        }
    }

    @Override
    public boolean exists(String bucket, String storagePath) {
        try {
            minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(bucket)
                            .object(storagePath)
                            .build());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
