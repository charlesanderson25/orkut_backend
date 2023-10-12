CREATE TABLE `notepads` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	`subtitle` VARCHAR(255) NOT NULL,
	`content` TEXT NOT NULL
)
COLLATE='utf8mb4_0900_ai_ci'
;

INSERT INTO notepads (title, subtitle, content) VALUES ('Titulo Teste 1', 'Subtitulo Teste 1', 'Conteudo teste 1');

ALTER TABLE notepads ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO notepads (title, subtitle, content) VALUES ('Teste 1', 'Teste subtítulo 1', 'Esse é um teste 1');

notepads

UPDATE notepads SET title='Teste Update', subtitle='Teste Subtitle Update', content='Teste conteúdo update' WHERE id=3;

SELECT * FROM notepads WHERE id=3;