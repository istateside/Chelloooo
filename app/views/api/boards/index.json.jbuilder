

json.boards @boards do |board|
  json.partial! 'board', board: board
end

json.shared_boards @shared do |board|
  json.partial! 'board', board: board
end
