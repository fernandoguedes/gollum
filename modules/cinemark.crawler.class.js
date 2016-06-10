'use strict';

// Require node_modules dependencies
let path = require('path');
let cheerio = require('cheerio');
let moment = require('moment');
let _ = require('lodash');

// Require other classes, files or configs
let MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));

module.exports = class CinemarkCrawler extends MainCrawler {

    getSchedule(url) {
        return new Promise((resolve, reject) => {
            this._mineSite(url)
                .then(function(schedule) {
                    return resolve(schedule);
                });
        });
    }

    _mineSite(url) {
        let _this = this;
        return new Promise((resolve, reject) => {
            super.getDynamicPage(url)
                .then(function($) {
                    let movies = [];
                    let dom = _this._getDOM();
                    let cinema = {
                        name: 'cinemark',
                        city: String,
                        place: String,
                        sessions: []
                    };

                    $('h3').filter(function(i, elem) {
                        let info = $(elem).text();
                        info = info.split('-');
                        cinema.place = info[0].replace(/\s+$/, '');
                        cinema.city = info[1].replace(/^\s+/, '');
                    });

                    $(dom).each(function() {
                        let title = $(this).find('h4').text().trim();
                        let hours = $(this).find('p span').text();
                        let details = $(this).find('.leg img');
                        let type = $(details).eq(0).attr('alt');
                        let censorship = $(details).eq(1).attr('alt');
                        let special = false;

                        if (details.length == 3) {
                            special = true;
                        }

                        hours = hours.match(/.{1,5}/g);

                        let movie = {
                            title: title,
                            type: type,
                            censorship: censorship,
                            special: special,
                            hours: hours
                        };
                        movies.push(movie);
                    });

                    cinema.sessions = movies;
                    return resolve(cinema);

                });
        });
    }

    _getDOM() {
        let date = moment().format('YYYY-MM-DD');
        let dom = '#date-{{date}}-703 div.filme'.replace('{{date}}', date);
        return dom;
    }
}
