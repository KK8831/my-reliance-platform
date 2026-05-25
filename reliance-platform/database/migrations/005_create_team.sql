CREATE TABLE team (
  id               BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id          BIGINT         NOT NULL,
  referrer_id      BIGINT         NOT NULL,
  level            TINYINT        NOT NULL CHECK (level IN (1,2,3)),
  commission_rate  DECIMAL(5,4)   NOT NULL,
  is_valid         BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_referrer_id (referrer_id),
  INDEX idx_user_id     (user_id),
  INDEX idx_level       (level),
  INDEX idx_is_valid    (is_valid)
);