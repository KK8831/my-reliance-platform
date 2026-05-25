CREATE TABLE daily_sign_ins (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id    BIGINT        NOT NULL,
  reward     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  signed_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id  (user_id),
  INDEX idx_signed_at(signed_at),
  INDEX idx_user_date(user_id, signed_at)
);