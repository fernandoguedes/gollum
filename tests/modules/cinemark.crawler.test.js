'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinemarkCrawler = require(path.join(__dirname, '../../modules/', 'cinemark.crawler.class'));

describe('CinemarkCrawler', () => {

    const url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703';
    let Crawler;

    before(function() {
        Crawler = new CinemarkCrawler();
    });

    it('getSchedule(): Should return a valid schedule JSON', (done) => {
        Crawler.getSchedule(url)
            .then(function(json) {
                expect(json.city)
                    .to.be.equal('Florianópolis');

                expect(json.place)
                    .to.be.equal('Floripa Shopping');

                expect(json.sessions)
                    .to.not.be.null;

                done();
            })
            .catch(done);
    });

    it('getCinemasURLs(): Should return a valid URLs cinemas JSON', (done) => {
        let json = Crawler.getCinemasURLs();
        expect(json).to.not.be.null;
        done();
    });

});
