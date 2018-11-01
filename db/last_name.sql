select first_name, last_name, picture from helo_users
where lower(last_name) like $1 or upper(last_name) like $2