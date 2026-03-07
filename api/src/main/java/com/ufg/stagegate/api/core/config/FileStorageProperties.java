package com.ufg.stagegate.api.core.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file.storage")
public record FileStorageProperties(
        String type,
        S3Properties s3,
        LocalProperties local) {

    public record S3Properties(
            String endpoint,
            String accessKey,
            String secretKey,
            String bucket,
            String region) {
    }

    public record LocalProperties(String basePath) {
    }
}
