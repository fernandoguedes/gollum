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

    getCinemasURLs() {
        return new Promise((resolve, reject) => {
            const url = 'http://www.cinesystem.com.br';
            super.getStaticPage(url)
                .then(($) => {
                    let urlsArr = [];

                    $('#topo div div ul li:nth-child(7) div ul li').each((key, link) => {
                        let temp = $(link).text().match(/[^()]+/g);
                        if (temp) {
                            let cinemaObj = {
                                cinema: 'cinesystem',
                                place: String,
                                place_label: String,
                                city: String,
                                city_label: String,
                                url: String
                            };

                            var city = temp[0].trim();
                            var place = temp[1].trim();

                            // labels
                            cinemaObj.city_label = city;
                            cinemaObj.place_label = place;

                            // normalized
                            cinemaObj.place = super.stringNormalize(place);
                            cinemaObj.city = super.stringNormalize(city);

                            // url
                            cinemaObj.url = url + $(link).find('a').attr('href');
                            urlsArr.push(cinemaObj);
                        }
                    });

                    super.writeUrlsFile('cinesystem', urlsArr)
                        .then(function(val) {
                            return resolve(val);
                        })
                        .catch(function(err) {
                            return reject(err);
                        });

                })
                .catch(function(err) {
                    return reject(err);
                });
        });
    }

}
