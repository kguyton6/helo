SELECT * FROM helo_friends
join helo_users
on helo_friends.friend_id = helo_users.user_id 
where helo_friends.user_id = $1

