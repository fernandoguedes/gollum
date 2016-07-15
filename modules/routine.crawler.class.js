'use strict';

// Require node_modules dependencies
const path = require('path');
const fs = require('fs');

// Require other classes, files or configs
const MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));
const Crawlers = require(path.join(__dirname, '../', 'index'));

module.exports = class RoutineCrawler extends MainCrawler {

    start() {
        return new Promise((resolve, reject) => {
            let urlsArr = super.getUrlsFromFiles();
            this.createQueue(urlsArr)
                .then((json) => {
                    return resolve(json);
                })
                .catch((err) => {
                    console.log(err);
                    console.log('capimzeira');
                });
        });
    }

    createQueue(urlsArr) {
        return new Promise((resolve, reject) => {
            let requestArr = [];
            urlsArr.forEach((urlObj) => {
                requestArr.push(Crawlers.CinesystemCrawler.getSchedule(urlObj.url));
            });

            Promise.all(requestArr)
                .then((json) => {
                    return resolve(json);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }


}
