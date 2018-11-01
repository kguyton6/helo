select first_name, last_name, picture from helo_users
where upper (first_name) like $1 or lower (first_name) like $2