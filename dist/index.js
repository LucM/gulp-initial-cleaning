(function() {
  var arg, deleteFolder, fs,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  fs = require('fs');

  deleteFolder = function(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file, index) {
        var curPath;
        curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  arg = process.argv[2];

  if (arg == null) {
    arg = 'default';
  }

  module.exports = function(_arg) {
    var folder, folders, tasks, _i, _len, _results;
    tasks = _arg.tasks, folders = _arg.folders;
    if (typeof tasks === "string") {
      tasks = [tasks];
    }
    if (typeof folders === "string") {
      folders = [folders];
    }
    console.log(arg, tasks);
    if (__indexOf.call(tasks, arg) >= 0) {
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
