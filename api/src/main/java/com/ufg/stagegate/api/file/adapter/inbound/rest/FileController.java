package com.ufg.stagegate.api.file.adapter.inbound.rest;

import com.ufg.stagegate.api.core.response.ApiResponse;
import com.ufg.stagegate.api.file.adapter.inbound.rest.dto.FileMetadataResponse;
import com.ufg.stagegate.api.file.adapter.inbound.rest.dto.FileUploadResponse;
import com.ufg.stagegate.api.file.application.usecase.DeleteFileUseCase;
import com.ufg.stagegate.api.file.application.usecase.DownloadFileUseCase;
import com.ufg.stagegate.api.file.application.usecase.GetFileMetadataUseCase;
import com.ufg.stagegate.api.file.application.usecase.UploadFileUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final UploadFileUseCase uploadFileUseCase;
    private final DownloadFileUseCase downloadFileUseCase;
    private final DeleteFileUseCase deleteFileUseCase;
    private final GetFileMetadataUseCase getFileMetadataUseCase;

    /**
     * Uploads a file using streaming multipart upload.
     * The file stream is never fully loaded into application memory.
     *
     * @param file       multipart file from the client
     * @param entityPath logical bucket sub-path to organize files (e.g.
     *                   "projects/uuid")
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<FileUploadResponse>> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam("entityPath") String entityPath) throws IOException {
        FileUploadResponse response = uploadFileUseCase.execute(
                file.getInputStream(),
                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                entityPath,
                null // uploadedBy: inject authenticated user when security is integrated
        );
        return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully", response));
    }

    /**
     * Streams the file content directly from storage to the HTTP response.
     * Uses StreamingResponseBody to avoid buffering the file in application memory.
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<StreamingResponseBody> download(@PathVariable UUID id) {
        DownloadFileUseCase.DownloadResult result = downloadFileUseCase.execute(id);

        StreamingResponseBody body = outputStream -> {
            try (var inputStream = result.inputStream()) {
                inputStream.transferTo(outputStream);
            }
        };

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + result.metadata().getOriginalName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, result.metadata().getContentType())
                .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(result.metadata().getSizeBytes()))
                .body(body);
    }

    /**
     * Returns metadata of a file without downloading its content.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FileMetadataResponse>> getMetadata(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(getFileMetadataUseCase.execute(id)));
    }

    /**
     * Deletes the file from storage and removes its metadata from the database.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        deleteFileUseCase.execute(id);
        return ResponseEntity.ok(ApiResponse.noContent());
    }
}
