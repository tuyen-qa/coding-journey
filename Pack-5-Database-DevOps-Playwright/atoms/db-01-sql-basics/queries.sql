-- Q1: List all users with total orders count and sum
-- SELECT u.email, COUNT(o.id) AS orders, COALESCE(SUM(o.total_cents),0) AS total
-- FROM users u LEFT JOIN orders o ON o.user_id=u.id GROUP BY u.email ORDER BY total DESC;

-- Q2: Top 1 spender
-- SELECT u.email FROM users u JOIN orders o ON o.user_id=u.id GROUP BY u.email ORDER BY SUM(o.total_cents) DESC LIMIT 1;

-- Q3: Orders created today
-- SELECT * FROM orders WHERE created_at::date = NOW()::date;
