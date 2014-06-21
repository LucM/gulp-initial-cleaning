fs = require 'fs'

# Delete a folder
deleteFolder = (path) ->
  if fs.existsSync(path)
    fs.readdirSync(path).forEach (file, index) ->
      curPath = path + "/" + file
      if fs.lstatSync(curPath).isDirectory() # recurse
        deleteFolderRecursive curPath
      else # delete file
        fs.unlinkSync curPath
      return

    fs.rmdirSync path
  return

# Get current task
arg = process.argv[2]
arg = 'default' unless task?

module.exports = ({task, folders}) ->
  if arg is task
    folders = [folders] if typeof folders is "string"
    for folder in folders
      deleteFolder(folder)
