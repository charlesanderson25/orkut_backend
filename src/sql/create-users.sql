CREATE TABLE users(
id INT, 
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
avatar VARCHAR(2048) NOT NULL,
pass_word VARCHAR(255) NOT NULL, 
created_at TIMESTAMP
)

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id INT AUTO_INCREMENT;
ALTER TABLE users MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

