CREATE TABLE products (
  id                  BIGINT PRIMARY KEY AUTO_INCREMENT,
  name                VARCHAR(100) NOT NULL,
  type                ENUM('stable','daily','activity') NOT NULL,
  price               DECIMAL(15,2) NOT NULL,
  daily_earnings      DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  hourly_earnings     DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  revenue_days        INT           NOT NULL DEFAULT 1,
  total_income        DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  required_vip_level  TINYINT       NOT NULL DEFAULT 0,
  image_url           VARCHAR(255)  DEFAULT NULL,
  badge               VARCHAR(20)   DEFAULT 'VIP.0',
  is_active           BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type      (type),
  INDEX idx_price     (price),
  INDEX idx_vip       (required_vip_level)
);