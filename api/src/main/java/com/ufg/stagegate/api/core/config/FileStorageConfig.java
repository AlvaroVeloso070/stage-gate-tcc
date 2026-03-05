package com.ufg.stagegate.api.core.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@EnableConfigurationProperties(FileStorageProperties.class)
public class FileStorageConfig {

    /**
     * Creates and configures a MinioClient bean.
     * Only active when file.storage.type=minio (or when property is absent, as
     * minio is the default).
     * On startup, verifies that the configured bucket exists and creates it if not.
     */
    @Bean
    @ConditionalOnProperty(name = "file.storage.type", havingValue = "minio", matchIfMissing = true)
    public MinioClient minioClient(FileStorageProperties properties) {
        FileStorageProperties.MinioProperties minio = properties.minio();

        MinioClient client = MinioClient.builder()
                .endpoint(minio.endpoint())
                .credentials(minio.accessKey(), minio.secretKey())
                .build();

        ensureBucketExists(client, minio.bucket());

        return client;
    }

    private void ensureBucketExists(MinioClient client, String bucket) {
        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!exists) {
                log.info("Bucket '{}' does not exist. Creating it...", bucket);
                client.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                log.info("Bucket '{}' created successfully.", bucket);
            } else {
                log.info("Bucket '{}' already exists.", bucket);
            }
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Failed to verify or create MinIO bucket '%s'. Check MinIO connectivity and credentials."
                            .formatted(bucket),
                    e);
        }
    }
}
