SELECT 
posts.id,
posts.content,
posts.created_at, 
posts.user_id,
users.first_name,
users.last_name, 
users.avatar
FROM posts
INNER JOIN users ON posts.user_id = users.id
ORDER BY posts.id DESC;