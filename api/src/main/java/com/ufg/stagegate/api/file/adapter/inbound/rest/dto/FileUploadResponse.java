package com.ufg.stagegate.api.file.adapter.inbound.rest.dto;

import java.time.Instant;
import java.util.UUID;

public record FileUploadResponse(
        UUID fileId,
        String originalName,
        String contentType,
        long sizeBytes,
        String storagePath,
        String checksumSha256,
        Instant createdAt) {
}
