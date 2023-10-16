CREATE TABLE comments (
id INT,
message TEXT NOT NULL, 
created_at TIMESTAMP,
post_id INT NOT NULL
)

ALTER TABLE comments ADD PRIMARY KEY (id);
ALTER TABLE comments MODIFY id INT AUTO_INCREMENT;
ALTER TABLE comments MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE comments ADD CONSTRAINT FK_comments_post FOREIGN KEY (post_id) REFERENCES posts (id);

INSERT INTO comments (message, post_id) VALUES ('Teste 1', 110);