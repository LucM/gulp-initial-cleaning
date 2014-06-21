Problem
-------

With gulp, all tasks are run asynchronously. When you want to delete a folder, you have to
set it as dependency for all tasks:

```
gulp.task 'clean', ->
    ...

gulp.task 'coffee', ['clean'], -> ...
gulp.task 'compass', ['clean'], -> ...
gulp.task 'html', ['clean'], -> ...

gulp.task 'build', ['clean', 'coffee', 'compass', 'html']
```

Gulp-initial-cleaning
------

With gulp-initial-cleaning, you can delete folders before running a specific task.

```
gulp = require 'gulp'
cleaning = require 'gulp-initial-cleaning'

# Delete the folder 'dist' before running the 'build' task
cleaning({tasks: ['build'], folders: ['dist/']})

gulp.task 'coffee', -> ...
gulp.task 'compass', -> ...
gulp.task 'html',  -> ...

gulp.task 'build', ['coffee', 'compass', 'html']

```
