package com.ufg.stagegate.api.file.domain.port.outbound;

import java.io.InputStream;
import java.time.Duration;

/**
 * Port interface for file storage operations.
 * Implementations must stream data without loading the entire file into memory.
 */
public interface FileManipulator {

    /**
     * Uploads a file as a stream. The caller must close the InputStream after this
     * call.
     *
     * @param bucket      destination bucket name
     * @param storagePath full path within the bucket (e.g.
     *                    "projects/uuid/file.pdf")
     * @param data        input stream of the file content (never fully buffered in
     *                    memory)
     * @param size        exact byte size of the stream (required by S3/MinIO API)
     * @param contentType MIME type of the file
     * @return FileUploadResult containing ETag and SHA-256 checksum
     */
    FileUploadResult upload(String bucket, String storagePath, InputStream data, long size, String contentType);

    /**
     * Opens and returns an InputStream for reading the file.
     * Caller is responsible for closing the returned stream.
     */
    InputStream download(String bucket, String storagePath);

    /**
     * Deletes the file from storage. No-op if the file does not exist.
     */
    void delete(String bucket, String storagePath);

    /**
     * Generates a time-limited presigned URL for direct download.
     * May throw UnsupportedOperationException if not supported by the
     * implementation.
     */
    String generatePresignedDownloadUrl(String bucket, String storagePath, Duration expiry);

    /**
     * Checks whether a file exists at the given path.
     */
    boolean exists(String bucket, String storagePath);
}
