(function() {
  var arg, deleteFolder, fs;

  fs = require('fs');

  deleteFolder = function(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file, index) {
        var curPath;
        curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  arg = process.argv[2];

  if (typeof task === "undefined" || task === null) {
    arg = 'default';
  }

  module.exports = function(_arg) {
    var folder, folders, task, _i, _len, _results;
    task = _arg.task, folders = _arg.folders;
    if (arg === task) {
      if (typeof folders === "string") {
        folders = [folders];
      }
      _results = [];
      for (_i = 0, _len = folders.length; _i < _len; _i++) {
        folder = folders[_i];
        _results.push(deleteFolder(folder));
      }
      return _results;
    }
  };

}).call(this);
