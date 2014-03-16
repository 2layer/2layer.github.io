# localize app
$ 'html'
.attr 'lang', require 'lang'

# launch
require 'ready'
.pipe ->
  require 'index'
