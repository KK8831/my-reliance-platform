CREATE TABLE bank_cards (
  id             BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id        BIGINT       NOT NULL,
  bank_name      VARCHAR(100) NOT NULL,
  account_name   VARCHAR(100) NOT NULL,
  account_number VARCHAR(20)  NOT NULL,
  ifsc_code      VARCHAR(15)  DEFAULT NULL,
  upi_id         VARCHAR(100) DEFAULT NULL,
  last4          CHAR(4)      DEFAULT NULL,
  is_default     BOOLEAN      NOT NULL DEFAULT FALSE,
  is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id   (user_id),
  INDEX idx_is_active (is_active)
);