(function() {
  var cleanTask, deleteFolder, folder, fs, task, toClean, _i, _len;

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

  cleanTask = {
    'default': ['dist/', 'machin/']
  };

  task = process.argv[2];

  if (task == null) {
    task = 'default';
  }

  toClean = cleanTask['task'];

  if (toClean != null) {
    if (typeof toClean === "string") {
      toClean = [toClean];
    }
    for (_i = 0, _len = toClean.length; _i < _len; _i++) {
      folder = toClean[_i];
      deleteFolder(folder);
    }
  }

}).call(this);
