'use strict';

// Require node_modules dependencies
let path = require('path');

// Require other classes, files or configs
let CinemarkCrawler = require(path.join(__dirname, 'modules', 'cinemark.crawler.class'));
let CinespacoCrawler = require(path.join(__dirname, 'modules', 'cinespaco.crawler.class'));
let CinesystemCrawler = require(path.join(__dirname, 'modules', 'cinesystem.crawler.class'));

module.exports = {
    CinemarkCrawler: new CinemarkCrawler(),
    CinespacoCrawler: new CinespacoCrawler(),
    Cinesystem: new Cinesystem()
}
