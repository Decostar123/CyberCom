-- 1. MANY-TO-MANY RELATIONSHIP
CREATE TABLE Product (
  productId INT PRIMARY KEY,
  productName VARCHAR(100),
  productQuality VARCHAR(10)
);

CREATE TABLE Category (
  categoryId INT PRIMARY KEY,
  categoryName VARCHAR(100),
  categoryQuality VARCHAR(10)
);

CREATE TABLE Product_Category (
  productId INT,
  categoryId INT,
  PRIMARY KEY (productId, categoryId),
  FOREIGN KEY (productId) REFERENCES Product(productId),
  FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);

