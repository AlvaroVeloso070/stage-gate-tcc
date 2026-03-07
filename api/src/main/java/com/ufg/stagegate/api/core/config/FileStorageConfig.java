package com.ufg.stagegate.api.core.config;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.NoSuchBucketException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.URI;

@Slf4j
@Configuration
@EnableConfigurationProperties(FileStorageProperties.class)
public class FileStorageConfig {

    /**
     * Creates and configures an S3Client bean.
     * Only active when file.storage.type=s3 (or when property is absent, as
     * s3 is the now the default).
     */
    @Bean
    @ConditionalOnProperty(name = "file.storage.type", havingValue = "s3", matchIfMissing = true)
    public S3Client s3Client(FileStorageProperties properties) {
        FileStorageProperties.S3Properties s3 = properties.s3();

        S3Client client = S3Client.builder()
                .endpointOverride(URI.create(s3.endpoint()))
                .region(Region.of(s3.region()))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(s3.accessKey(), s3.secretKey())))
                .forcePathStyle(true)
                .build();

        ensureBucketExists(client, s3.bucket());

        return client;
    }

    @Bean
    @ConditionalOnProperty(name = "file.storage.type", havingValue = "s3", matchIfMissing = true)
    public S3Presigner s3Presigner(FileStorageProperties properties) {
        FileStorageProperties.S3Properties s3 = properties.s3();

        return S3Presigner.builder()
                .endpointOverride(URI.create(s3.endpoint()))
                .region(Region.of(s3.region()))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(s3.accessKey(), s3.secretKey())))
                .build();
    }

    private void ensureBucketExists(S3Client client, String bucket) {
        try {
            client.headBucket(HeadBucketRequest.builder().bucket(bucket).build());
            log.info("Bucket '{}' already exists.", bucket);
        } catch (NoSuchBucketException e) {
            log.info("Bucket '{}' does not exist. Creating it...", bucket);
            client.createBucket(CreateBucketRequest.builder().bucket(bucket).build());
            log.info("Bucket '{}' created successfully.", bucket);
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Failed to verify or create S3 bucket '%s'. Check S3 connectivity and credentials."
                            .formatted(bucket),
                    e);
        }
    }
}
