-- SELECT *
-- FROM helo_users
-- WHERE helo_users.user_id != $1 
-- (SELECT helo_friends.friend_id 
-- from helo_friends
-- join helo_users
-- on helo_users.user_id = helo_friends.user_id
-- WHERE helo_friends.friend_id != $1);
SELECT distinct user_id, picture, first_name, last_name FROM helo_users
WHERE user_id != $1
AND user_id NOT IN (SELECT friend_id AS user_id FROM helo_friends JOIN helo_users 
ON helo_friends.user_id = helo_users.user_id
WHERE helo_users.user_id = $2 and helo_friends.friend_id != $3)