CREATE TABLE commissions (
  id                 BIGINT PRIMARY KEY AUTO_INCREMENT,
  earner_id          BIGINT        NOT NULL,
  from_user_id       BIGINT        NOT NULL,
  order_id           BIGINT        NOT NULL,
  level              TINYINT       NOT NULL,
  rate               DECIMAL(5,4)  NOT NULL,
  base_amount        DECIMAL(15,2) NOT NULL,
  commission_amount  DECIMAL(15,2) NOT NULL,
  status             ENUM('pending','paid') NOT NULL DEFAULT 'pending',
  created_at         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (earner_id)    REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (from_user_id) REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (order_id)     REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_earner_id    (earner_id),
  INDEX idx_from_user_id (from_user_id),
  INDEX idx_order_id     (order_id)
);