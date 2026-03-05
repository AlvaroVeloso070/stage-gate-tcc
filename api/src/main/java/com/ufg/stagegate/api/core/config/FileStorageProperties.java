package com.ufg.stagegate.api.core.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file.storage")
public record FileStorageProperties(
        String type,
        MinioProperties minio,
        LocalProperties local) {

    public record MinioProperties(
            String endpoint,
            String accessKey,
            String secretKey,
            String bucket) {
    }

    public record LocalProperties(String basePath) {
    }
}
