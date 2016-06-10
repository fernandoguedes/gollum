'use strict';

// Require node_modules dependencies
let path = require('path');
let cheerio = require('cheerio');

// Require other classes, files or configs
let MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));

module.exports = class CinesystemCrawler extends MainCrawler {

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
            super.getStaticPage(url)
                .then(function($) {
                    let movies = [];
                    let dom = '.repeat-filmes li';
                    let cinema = {
                        name: 'cinesystem',
                        city: String,
                        place: String,
                        sessions: []
                    };

                    let city = $('.title-city').text();
                    let place = city.match(/\(([^)]+)\)/)[1];

                    city = city.replace(/ *\([^)]*\) */g, "");

                    cinema.city = city;
                    cinema.place = place;

                    $(dom).each(function() {
                        let title = $(this).find('div table tbody td h2').text();
                        let normalized = _this.stringNormalize(title); // super
                        let type = $(this).find('.sessoes table tbody tr td').eq(0).text().trim();
                        $(this).find('.sessoes table tbody tr td strong').remove()
                        let hours = $(this).find('.sessoes table tbody tr td').eq(1).html().trim();
                        let special = $(this).find('.categoria img').attr('src') ? true : false;
                        hours = hours.replace(/ /g,'').replace(/,/g, '');
                        hours = hours.match(/.{1,5}/g);
                        let movie = {
                            title: title,
                            normalized: normalized,
                            type: type,
                            censorship: null,
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

}
