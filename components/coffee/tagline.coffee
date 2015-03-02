$ = require 'jquery'

do fill = (item = 'The very most creative minds in Art') ->
  $('.tagline').append "#{item}"
fill

# do log = () ->
# 	console.log('Testing coffee')