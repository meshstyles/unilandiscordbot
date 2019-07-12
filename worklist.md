# Feature list

## votes
input: !vote number - message
output: message -> reaction

info reaction:   if number == 1 discard
        if number == 2 do :negative_squared_cross_mark: :white_check_mark:
        :regional_indicator_q: 
        if number == 2 < do :one: :two: :three:
//      do at max code for 4
//      split on "-"
//      0 == prefix
//      1 == vote count
//      2 == question
//      3-7 == asw

//      rm number ?

input: !vote ?Q -asw1 -asw2 
output: message -Repost

request = do split ?
splited = dp split - request[ 1 ]

repost as
:regional_indicator_q:  splited 0
:one: splited 1
:two: splited 2
:three: splitted 3
:three: splitted 4


## delete last x messages
input: rm number
output: deletes last number messages

info: check perm roles for "duke" or "ModStaff"
