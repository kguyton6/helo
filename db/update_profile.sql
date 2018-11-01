update helo_users
set first_name = $1, last_name = $2, picture = $3, gender = $4, hair_color = $5, eye_color = $6, hobby = $7, birthDay = $8, birthMonth = $9, birthYear = $10
where user_id = $11