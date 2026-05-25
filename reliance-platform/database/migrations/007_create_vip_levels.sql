CREATE TABLE vip_levels (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  level           TINYINT      NOT NULL UNIQUE,
  label           VARCHAR(10)  NOT NULL,
  min_investment  DECIMAL(15,2) NOT NULL,
  badge_url       VARCHAR(255) DEFAULT NULL,
  description     TEXT         DEFAULT NULL,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_level (level)
);

INSERT INTO vip_levels (level, label, min_investment, badge_url, description) VALUES
(0, 'LV0', 0.00,     '/assets/badges/vip0-badge.png', 'Default level'),
(1, 'LV1', 290.00,   '/assets/badges/vip1-badge.png', 'Invest ₹290'),
(2, 'LV2', 2770.00,  '/assets/badges/vip2-badge.png', 'Invest ₹2,770'),
(3, 'LV3', 7770.00,  '/assets/badges/vip3-badge.png', 'Invest ₹7,770'),
(4, 'LV4', 17770.00, '/assets/badges/vip4-badge.png', 'Invest ₹17,770'),
(5, 'LV5', 27770.00, '/assets/badges/vip5-badge.png', 'Invest ₹27,770'),
(6, 'LV6', 37770.00, '/assets/badges/vip6-badge.png', 'Invest ₹37,770'),
(7, 'LV7', 77770.00, '/assets/badges/vip7-badge.png', 'Invest ₹77,770');