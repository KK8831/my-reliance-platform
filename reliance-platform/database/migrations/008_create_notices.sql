CREATE TABLE notices (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  title      VARCHAR(100) NOT NULL,
  content    TEXT         DEFAULT NULL,
  icon_url   VARCHAR(255) DEFAULT NULL,
  type       ENUM('lucky_roulette','daily_login','referral','recharge','general') DEFAULT 'general',
  is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type      (type),
  INDEX idx_is_active (is_active)
);