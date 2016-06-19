'use strict';

// Require node_modules dependencies
let path = require('path');

// Require other classes, files or configs
let CinemarkCrawler = require(path.join(__dirname, 'modules', 'cinemark.crawler.class'));

module.exports = {
    CinemarkCrawler: new CinemarkCrawler()
}
