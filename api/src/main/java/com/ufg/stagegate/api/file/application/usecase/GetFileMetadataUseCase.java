package com.ufg.stagegate.api.file.application.usecase;

import com.ufg.stagegate.api.core.exception.ResourceNotFoundException;
import com.ufg.stagegate.api.file.adapter.inbound.rest.dto.FileMetadataResponse;
import com.ufg.stagegate.api.file.domain.model.File;
import com.ufg.stagegate.api.file.domain.port.outbound.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetFileMetadataUseCase {

    private final FileRepository fileRepository;

    @Transactional(readOnly = true)
    public FileMetadataResponse execute(UUID fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("File not found: " + fileId));

        return new FileMetadataResponse(
                file.getId(),
                file.getOriginalName(),
                file.getContentType(),
                file.getSizeBytes(),
                file.getBucket(),
                file.getStoragePath(),
                file.getStorageType(),
                file.getChecksumSha256(),
                file.getUploadedBy() != null ? file.getUploadedBy().getId() : null,
                file.getCreatedAt());
    }
}
