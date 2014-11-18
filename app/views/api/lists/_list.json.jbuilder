json.(list, :id, :title, :board_id, :ord)

json.cards list.cards do |json, card|
  json.partial! card
end