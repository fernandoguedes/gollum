'use strict'

// Require node_modules dependencies
let path = require('path');
let cheerio = require('cheerio');
let moment = require('moment');
let _ = require('lodash');

// Require other classes, files or configs
let MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));

module.exports = class PlayarteCrawler extends MainCrawler {
    getPage(url) {
        return new Promise((resolve, reject) => {
            super.getStaticPage(url)
                .then(function($){
                    return resolve($);
                })
        })
    }
}
