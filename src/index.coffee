fs = require 'fs'

# Delete a folder
deleteFolder = (path) ->
  if fs.existsSync(path)
    fs.readdirSync(path).forEach (file, index) ->
      curPath = path + "/" + file
      if fs.lstatSync(curPath).isDirectory() # recurse
        deleteFolder curPath
      else # delete file
        fs.unlinkSync curPath
      return

    fs.rmdirSync path
  return

# Get current task
arg = process.argv[2]
arg = 'default' unless arg?

module.exports = ({tasks, folders}) ->
  tasks = [tasks] if typeof tasks is "string"
  folders = [folders] if typeof folders is "string"

  if arg in tasks
      folders = [folders] if typeof folders is "string"
      for folder in folders
        deleteFolder(folder)
