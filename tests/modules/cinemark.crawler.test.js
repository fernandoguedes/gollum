'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinemarkCrawler = require(path.join(__dirname, '../../modules/', 'cinemark.crawler.class'));

describe('CinemarkCrawler', () => {

    let Crawler;

    beforeEach(function() {
        Crawler = new CinemarkCrawler();
    });

    it('getSchedule(): Should return a valid schedule JSON from Florianópolis cinema', (done) => {
        let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703';
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

    it('getSchedule(): Should return a valid schedule JSON from Tatuapé/SP cinema', (done) => {
        let url = 'http://cinemark.com.br/programacao/sao-paulo/boulevard-tatuape/1/690';
        Crawler.getSchedule(url)
            .then(function(json) {
                expect(json.city)
                    .to.be.equal('São Paulo');

                expect(json.place)
                    .to.be.equal('Boulevard Tatuape');

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
