'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let Cinespaco = require(path.join(__dirname, '../../modules', 'cinespaco.crawler.class'));

describe('Cinespaço', () => {
    const url = 'http://cinespaco.com.br/cidade/florianopolis';

    let Crawler;

    before(function() {
        Crawler = new Cinespaco();
    });

    it('getSchedule(): Should return schedule JSON', (done) => {
        Crawler.getSchedule(url)
            .then(function(json) {
                expect(json.city)
                    .to.be.equal('Florianópolis');

                expect(json.place)
                    .to.be.equal('Beiramar Shopping');

                expect(json.sessions)
                    .to.not.be.null;

                done();
            })
            .catch(done);
    });

    it('getCinemasURLs(): Should return a valid URLs cinemas JSON', (done) => {
        Crawler.getCinemasURLs()
            .then(function(json) {
                expect(json).to.not.be.null;
                done();
            })
            .catch(done);
    });
});
