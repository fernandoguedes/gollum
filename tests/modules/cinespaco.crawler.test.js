'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let Cinespaco = require(path.join(__dirname, '../../modules', 'cinespaco.crawler.class'));

describe('Cinespaço', () => {
    it('getSchedule(): Should return schedule JSON', (done) => {
        let url = 'http://cinespaco.com.br/em-cartaz/';
        let city = 'florianopolis';
        let Crawler = new Cinespaco();

        Crawler.getSchedule(url, city)
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
});
