package com.ufg.stagegate.api.file.domain.port.outbound;

public record FileUploadResult(String etag, String checksumSha256) {
}
