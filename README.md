[![Build Status](https://travis-ci.org/fernandoguedes/gollum.svg?branch=master)](https://travis-ci.org/fernandoguedes/gollum)

# Gollum
Gollum is a specialized cinema websites crawler. Cinema schedules are my precious.

The propposal of this project is to return the JSON of crawled cinemas for anything. Be creative!

## Installing

`npm install gollum-nocinema`

Or just clone this project.

## Avaliable Crawlers

- Cinemark (CinemarkCrawler): http://cinemark.com.br
- Cinesystem (CinesystemCrawler): http://cinesystem.com.br
- Cinespaço (CinespacoCrawler): http://cinespaco.com.br

And others under construction, [contribute](https://github.com/fernandoguedes/gollum/issues?q=is%3Aissue+is%3Aopen+label%3Afeature).

## Using

Two ways avaliable to use **Gollum Crawlers**, both cases return a `Promise`.

### Pass url as argument

```javascript
let CinemarkCrawler = require('gollum-nocinema').CinemarkCrawler;
let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703'; // valid cinemark url

CinemarkCrawler
    .getScheduleByUrl(url)
        .then(function(schedule) {
            console.log('Cinemark\'s schedule in JSON: ', schedule);
        })
        .catch(function(err) {
            console.log(err);
        });
```
### Pass city and place as arguments

```javascript
let CinemarkCrawler = require('gollum-nocinema').CinemarkCrawler;

CinemarkCrawler
    .getScheduleByCityAndPlace('florianopolis', 'floripa shopping')
        .then(function(schedule) {
            console.log('Cinemark\'s schedule in JSON: ', schedule);
        })
        .catch(function(err) {
            console.log(err);
        });
```

## Contribute

* Fork this project
* Create your branch
* Send your PR

Any doubt, [contact me](mailto:lfernandoguedes@gmail.com).

## License

MIT @ [Luís Fernando Guedes](http://fernandogued.es)
