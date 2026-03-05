package com.ufg.stagegate.api.file.adapter.inbound.rest.dto;

import com.ufg.stagegate.api.file.domain.model.StorageTypeEnum;

import java.time.Instant;
import java.util.UUID;

public record FileMetadataResponse(
        UUID fileId,
        String originalName,
        String contentType,
        long sizeBytes,
        String bucket,
        String storagePath,
        StorageTypeEnum storageType,
        String checksumSha256,
        UUID uploadedBy,
        Instant createdAt) {
}
