var fs = require('fs')

function ManifestPlugin(options) {}

ManifestPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    var template = fs.readFileSync('./qiantu.manifest', {
      flag: 'r',
      encoding: 'utf8'
    });

    var filelist = '';

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    for (var filename in compilation.assets) {
      if (/html/.test(filename))
        continue;
      filelist += ('./' + filename + '\n');
    }

    template = template.replace("replacement", filelist);

    // Insert this list into the Webpack build as a new file asset:
    compilation.assets['qiantu.manifest'] = {
      source: function() {
        return template;
      },
      size: function() {
        return template.length;
      }
    };

    callback();
  });
};

module.exports = ManifestPlugin;