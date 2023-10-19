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


Select 
    comments.id,
    comments.message,
    comments.created_at, 
    comments.user_id,
    users.first_name as user_first_name,
    users.last_name as user_last_name, 
    users.avatar as user_avatar 
from comments inner join users on comments.user_id = users.id
order by comments.created_at DESC;