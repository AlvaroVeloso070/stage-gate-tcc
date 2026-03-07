CREATE TABLE TB_FILES
(
    file_id         UUID         NOT NULL DEFAULT gen_random_uuid(),
    original_name   VARCHAR(500) NOT NULL,
    stored_name     VARCHAR(500) NOT NULL,
    content_type    VARCHAR(255) NOT NULL,
    size_bytes      BIGINT       NOT NULL,
    bucket          VARCHAR(255) NOT NULL,
    storage_path    VARCHAR(1000) NOT NULL,
    storage_type    VARCHAR(20)  NOT NULL DEFAULT 'S3',
    checksum_sha256 VARCHAR(64),
    uploaded_by     UUID,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_files PRIMARY KEY (file_id),
    CONSTRAINT fk_files_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES TB_USERS (user_id)
);

CREATE INDEX idx_files_bucket ON TB_FILES (bucket);
CREATE INDEX idx_files_storage_path ON TB_FILES (storage_path);
CREATE INDEX idx_files_uploaded_by ON TB_FILES (uploaded_by);
