'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinemarkCrawler = require(path.join(__dirname, '../../modules/', 'cinemark.crawler.class'));

describe('CinemarkCrawler', () => {
    it('getSchedule(): Should return schedule JSON', (done) => {
        let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703';
        CinemarkCrawler = new CinemarkCrawler();

        CinemarkCrawler.getSchedule(url)
            .then(function(json) {
                expect(json).to.be.an('object');
                done();
            })
            .catch(function(err) {
                done(new Error('Ocorreu algum erro no crawling do Cinesystem'))
            });
    });
});
