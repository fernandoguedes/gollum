[![Build Status](https://travis-ci.org/fernandoguedes/gollum.svg?branch=master)](https://travis-ci.org/fernandoguedes/gollum)

# Gollum
Gollum is specialized crawler in cinemas sites. Cinema schedules is my precious.

The propposal of this project is return the JSON of crawled cinema for anything. Be creative!

## Installing

`npm install gollum-nocinema`

Or just clone this project.

## Avaliable Crawlers

- Cinemark (CinemarkCrawler): http://cinemark.com.br
- Cinesystem (CinesystemCrawler): http://cinesystem.com.br
- Cinespaço (CinespacoCrawler): http://cinespaco.com.br

And others under construction, [contribute](https://github.com/fernandoguedes/gollum/issues?q=is%3Aissue+is%3Aopen+label%3Afeature).

## Using

Avaliable two ways to use **Gollum Crawlers**, both cases return a `Promise`.

### Require Gollum

```javascript
let gollum = require('gollum-nocinema');
let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703'; // valid cinemark url

gollum
    .CinemarkCrawler
        .getSchedule(url)
            .then(function(schedule) {
                console.log('Schedule of Cinemark in JSON: ', schedule);
            })
            .catch(function(err) {
                console.log(err);
            });
```
### Require Gollum with a specific crawler

```javascript
let CinemarkCrawler = require('gollum-nocinema').CinemarkCrawler;
let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703'; // valid cinemark url

CinemarkCrawler
    .getSchedule(url)
        .then(function(schedule) {
            console.log('Schedule of Cinemark in JSON: ', schedule);
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
