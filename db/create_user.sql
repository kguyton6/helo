insert into helo_users(auth_id, first_name, picture, email)
values($1, $2, $3, $4)
returning user_id








