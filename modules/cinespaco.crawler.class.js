'use strict';

// Require node_modules dependencies
let path = require('path');
let cheerio = require('cheerio');

// Require other classes, files or configs
let MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));

module.exports = class CinespacoCrawler extends MainCrawler {

    getScheduleByUrl(url) {
        return new Promise((resolve, reject) => {
            this._mineSite(url)
                .then(function(schedule) {
                    return resolve(schedule);
                });
        });
    }

    getScheduleByCityAndPlace(city, place) {
        let url = this.getUrlsFromCity('cinespaco', city, place);
        return new Promise((resolve, reject) => {
            this._mineSite(url)
                .then(function(schedule) {
                    return resolve(schedule);
                });

        });
    }

    _mineSite(url) {
        let _this = this;
        let headers = _this._getHeaders(url);
        url = 'http://cinespaco.com.br/em-cartaz/';

        return new Promise((resolve, reject) => {
            super.getStaticPage(url, headers)
                .then(function($) {
                    let movies = [];
                    let dom = '#programacao tr';
                    let cinema = {
                        cinema: 'cinespaco',
                        city: String,
                        city_normalized: String,
                        place: String,
                        place_normalized: String,
                        sessions: []
                    };

                    let city = $('#cinema_info h1').text()
                    let place = $('#cinema_info h2').text().trim();

                    cinema.city = city;
                    cinema.place = place;

                    cinema.city_normalized = _this.stringNormalize(city);
                    cinema.place_normalized = _this.stringNormalize(place);

                    $(dom).each(function() {
                        let special;
                        let title = $(this).find('.filme_nome').text();
                        let type = $(this).find('.atributos').text();
                        let censorship = $(this).find('.classificacao').text();

                        $(this).find('.obs').remove()

                        if (type.length > 8) {
                            let typeArr = type.split('    ');
                            special = true;
                            type = typeArr[1].trim();
                        } else {
                            special = false;
                            type = type.trim();
                        }

                        type = type == 'LEG' ? 'legendado' : 'dublado';

                        let hours = $(this).find('.horarios').text();
                        hours = hours.replace(/ /g,'').split('-');

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

    _getCityCookie(url) {
        let urls = {
            'http://cinespaco.com.br/cidade/florianopolis': 8,
            'http://cinespaco.com.br/cidade/joao-pessoa': 5,
            'http://cinespaco.com.br/cidade/novo-hamburgo': 1,
            'http://cinespaco.com.br/cidade/porto-alegre': 11,
            'http://cinespaco.com.br/cidade/rio-de-janeiro': 12,
            'http://cinespaco.com.br/cidade/santos': 13,
            'http://cinespaco.com.br/cidade/sao-goncalo': 9,
            'http://cinespaco.com.br/cidade/tubarao': 14
        };

        return `sec_cidade=${urls[url]}` || 'URL não mapeada.' ;
    }

    _getHeaders(url) {
        let cookie = this._getCityCookie(url);
        let headers = {
            'Cookie': cookie
        };

        return headers
    }

    getCinemasURLs() {
        let _this = this;
        return new Promise((resolve, reject) => {
            const url = 'http://cinespaco.com.br/_services/cidades.php';
            super.getStaticPage(url)
                .then(($) => {
                    let placesArr = [];

                    $('li').each(function() {
                        let cinemaObj = {
                            cinema: 'cinespaco',
                            place: String,
                            place_label: String,
                            city: String,
                            city_label: String,
                            url: String
                        };

                        let place = _this.stringNormalize($(this).find('a').text());
                        let place_normalized = $(this).find('a').text().toLowerCase();
                        cinemaObj.place_label = place_normalized;
                        cinemaObj.place = place;
                        cinemaObj.city_label = place_normalized;
                        cinemaObj.city = place;
                        cinemaObj.url = $(this).find('a').attr('href');
                        placesArr.push(cinemaObj);
                    });

                    super.writeUrlsFile('cinespaco', placesArr)
                        .then(function(data) {
                            return resolve(data);
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
