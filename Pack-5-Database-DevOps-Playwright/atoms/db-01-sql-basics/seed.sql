INSERT INTO users(email) VALUES
  ('a@x.com'),('b@x.com'),('c@x.com')
ON CONFLICT DO NOTHING;
INSERT INTO orders(user_id,total_cents) VALUES
  (1,1200),(1,5000),(2,300),(3,9999);
