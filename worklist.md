# Feature list

## votes
input: !vote number - message
output: message -> reaction

info reaction:   if number == 1 discard
        if number == 2 do :negative_squared_cross_mark: :white_check_mark:
        if number == 2 < do :one: :two: :three:

## delete last x messages
input: rm number
output: deletes last number messages

info: check perm roles for "duke" or "ModStaff"
