var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var mkdirp = require('mkdirp');
var sh = require('execSync');

// var tiles = [2048];
var source = process.argv[2];
var tiles = _.map((process.argv[3] || '').split(','), function (number) {
  return _.parseInt(number);
});


if (!source) {
  console.error('Specify source file, size of 16384x8192px');
  return;
}

if (!tiles) {
  console.error('Specify tiles (comma-separated)');
  return;
}

_.each(tiles, function (tile) {
  split(tile);
  rename(tile);
});


function split(tile) {
  for (pow = Math.log(16384 / tile) / Math.LN2; pow > 0; pow--) {
    mkdirp.sync('out/' + tile + '/' + (pow - 1));
    var cols = Math.pow(2, pow);
    var rows = Math.pow(2, pow - 1);
    var command = [
      'convert ', source,
      ' -crop ', cols, 'x', rows, '@',
      ' +repage +adjoin',
      ' -resize ', tile, 'x', tile,
      ' -quality 85%',
      ' out/', tile, '/', (pow - 1), '/%d.jpg'].join('');
    console.log('Converting: ', command);
    sh.run(command);
  }
}


function rename(tile) {
  var zoom, i, col, row;

  for (zoom = 0; zoom < Math.log(16384 / tile) / Math.LN2; zoom++) {
    console.log('Renaming: ', zoom);

    var filesRaw = glob.sync(path.join('out', tile + '', zoom + '', '*'));
    var files = _(filesRaw).reduce(function (result, filename) {
      result[parseInt(path.basename(filename), 10)] = filename;
      return result;
    }, {});


    var rows = Math.pow(2, zoom);
    var cols = Math.pow(2, zoom + 1);
    for (i = 0; i < rows * cols; i++) {
      row = rows - Math.floor(i / cols) - 1;
      col = i % cols;
      if (files[i]) {
        var dir = path.join('out', tile + '', zoom + '', col + '');
        var oldFile = files[i];
        var newFile = path.join(dir, row + path.extname(files[i]));

        mkdirp.sync(dir);
        fs.renameSync(oldFile, newFile);
        console.log('OK:', i, col, row, oldFile, newFile);
      } else {
        console.log('Does not exist:', i, col, row);
      }
    }
  }
}
