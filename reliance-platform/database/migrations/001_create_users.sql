-- Reference schema for SQL (if switching from MongoDB to MySQL/PostgreSQL)

CREATE TABLE users (
  id                         BIGINT PRIMARY KEY AUTO_INCREMENT,
  phone                      VARCHAR(15)  NOT NULL UNIQUE,
  nickname                   VARCHAR(50)  NOT NULL,
  password_hash              VARCHAR(255) NOT NULL,
  transaction_password_hash  VARCHAR(255) DEFAULT NULL,
  invitation_code            VARCHAR(10)  NOT NULL UNIQUE,
  referred_by_code           VARCHAR(10)  DEFAULT NULL,
  referred_by_id             BIGINT       DEFAULT NULL,
  vip_level                  TINYINT      NOT NULL DEFAULT 0,
  recharge_balance           DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  withdraw_balance           DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  product_income             DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  total_invested             DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  daily_sign_in_count        INT           NOT NULL DEFAULT 0,
  last_sign_in               DATETIME     DEFAULT NULL,
  is_active                  BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at                 DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at                 DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (referred_by_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_phone            (phone),
  INDEX idx_invitation_code  (invitation_code),
  INDEX idx_referred_by_code (referred_by_code),
  INDEX idx_vip_level        (vip_level)
);