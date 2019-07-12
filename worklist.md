# Feature list

## votes
input: !vote ?Q -asw1 -asw2 
output: message -Repost

request = do split ?Q
splited = do split - request[ 1 ]

repost as
:regional_indicator_q:  splited 0
:one: splited 1
:two: splited 2
:three: splitted 3
:four: splitted 4


## delete last x messages
input: rm number
output: deletes last number messages

info: check perm roles for "duke" or "ModStaff"
