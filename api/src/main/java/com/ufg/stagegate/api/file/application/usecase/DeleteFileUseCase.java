package com.ufg.stagegate.api.file.application.usecase;

import com.ufg.stagegate.api.core.exception.ResourceNotFoundException;
import com.ufg.stagegate.api.file.domain.model.File;
import com.ufg.stagegate.api.file.domain.port.outbound.FileManipulator;
import com.ufg.stagegate.api.file.domain.port.outbound.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteFileUseCase {

    private final FileManipulator fileManipulator;
    private final FileRepository fileRepository;

    /**
     * Deletes the file from storage and removes its metadata from the database.
     * Transactional: if DB delete fails, storage deletion is rolled back
     * conceptually
     * (the DB record remains and can be retried).
     */
    @Transactional(rollbackFor = Exception.class)
    public void execute(UUID fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("File not found: " + fileId));

        fileManipulator.delete(file.getBucket(), file.getStoragePath());
        fileRepository.deleteById(fileId);
        log.info("File deleted: id={}, path={}", fileId, file.getStoragePath());
    }
}
