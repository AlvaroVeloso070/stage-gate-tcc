package com.ufg.stagegate.api.file.adapter.outbound.storage;

import com.ufg.stagegate.api.file.domain.exception.FileStorageException;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileUploadResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.HexFormat;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "file.storage.type", havingValue = "s3", matchIfMissing = true)
public class S3FileManipulator implements FileManipulator {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Override
    public FileUploadResult upload(String bucket, String storagePath, InputStream data,
            long size, String contentType) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            DigestInputStream digestInputStream = new DigestInputStream(data, digest);

            PutObjectResponse response = s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucket)
                            .key(storagePath)
                            .contentType(contentType)
                            .build(),
                    RequestBody.fromInputStream(digestInputStream, size));

            String checksum = HexFormat.of().formatHex(digest.digest());
            log.debug("Uploaded '{}' to bucket '{}', etag={}", storagePath, bucket, response.eTag());
            return new FileUploadResult(response.eTag(), checksum);

        } catch (Exception e) {
            throw new FileStorageException("Failed to upload file '%s' to bucket '%s'".formatted(storagePath, bucket),
                    e);
        }
    }

    @Override
    public InputStream download(String bucket, String storagePath) {
        try {
            return s3Client.getObject(
                    GetObjectRequest.builder()
                            .bucket(bucket)
                            .key(storagePath)
                            .build());
        } catch (Exception e) {
            throw new FileStorageException(
                    "Failed to download file '%s' from bucket '%s'".formatted(storagePath, bucket), e);
        }
    }

    @Override
    public void delete(String bucket, String storagePath) {
        try {
            s3Client.deleteObject(
                    DeleteObjectRequest.builder()
                            .bucket(bucket)
                            .key(storagePath)
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
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucket)
                    .key(storagePath)
                    .build();

            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(expiry)
                    .getObjectRequest(getObjectRequest)
                    .build();

            PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);
            return presignedRequest.url().toString();
        } catch (Exception e) {
            throw new FileStorageException("Failed to generate presigned URL for '%s'".formatted(storagePath), e);
        }
    }

    @Override
    public boolean exists(String bucket, String storagePath) {
        try {
            s3Client.headObject(
                    HeadObjectRequest.builder()
                            .bucket(bucket)
                            .key(storagePath)
                            .build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        } catch (Exception e) {
            log.error("Error checking existence of '{}' in bucket '{}'", storagePath, bucket, e);
            return false;
        }
    }
}
