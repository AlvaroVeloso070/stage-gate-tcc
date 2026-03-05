package com.ufg.stagegate.api.file.application.usecase;

import com.ufg.stagegate.api.core.exception.ResourceNotFoundException;
import com.ufg.stagegate.api.file.domain.model.File;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DownloadFileUseCase {

    private final FileManipulator fileManipulator;
    private final FileRepository fileRepository;

    public record DownloadResult(InputStream inputStream, File metadata) {
    }

    /**
     * Finds the file metadata and opens an InputStream for streaming.
     * Caller (controller) is responsible for closing the stream after writing it to
     * the response.
     */
    @Transactional(readOnly = true)
    public DownloadResult execute(UUID fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("File not found: " + fileId));

        InputStream stream = fileManipulator.download(file.getBucket(), file.getStoragePath());
        return new DownloadResult(stream, file);
    }
}
