'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinemarkCrawler = require(path.join(__dirname, '../../modules/', 'cinemark.crawler.class'));

describe.skip('CinemarkCrawler', () => {
    let Crawler;

    beforeEach(function() {
        Crawler = new CinemarkCrawler();
    });

    it('getScheduleByUrl(): Should return a valid schedule JSON from Florianópolis with url', (done) => {
        const url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703';
            Crawler.getScheduleByUrl(url)
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

    it('getScheduleByCityAndPlace(): Should return a valid schedule JSON from Florianópolis with city and place args', (done) => {
        Crawler.getScheduleByCityAndPlace('florianopolis', 'floripa shopping')
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
