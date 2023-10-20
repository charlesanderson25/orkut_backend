SELECT * FROM users WHERE id IN(
SELECT user_b
FROM friends
WHERE user_a = 1
UNION 
SELECT user_a
FROM friends
WHERE user_b = 1
)

ORDER BY created_at DESC
LIMIT 9;