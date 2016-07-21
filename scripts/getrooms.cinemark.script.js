// First, access source code from http://cinemark.com.br, copy loadCidadesInfo() and loadCinemasInfo() functions,
// paste here, clean code arrays according with this example.

// To execute: node scripts/getrooms.cinemark.script.js
// Output: json of cinema/rooms

const fs = require('fs');
const path = require('path');

let _Cidades = [];
let _Cinemas = [];

_Cidades['10'] = 'Aracaju';
_Cidades['4'] = 'Barueri';
_Cidades['21'] = 'Belo Horizonte';
_Cidades['38'] = 'Betim';
_Cidades['45'] = 'Boa Vista';
_Cidades['14'] = 'Brasília';
_Cidades['44'] = 'Camaçari';
_Cidades['16'] = 'Campinas';
_Cidades['13'] = 'Campo Grande';
_Cidades['12'] = 'Canoas';
_Cidades['30'] = 'Cotia';
_Cidades['35'] = 'Cuiabá';
_Cidades['18'] = 'Curitiba';
_Cidades['24'] = 'Florianópolis';
_Cidades['47'] = 'Foz do Iguaçu';
_Cidades['23'] = 'Goiânia';
_Cidades['27'] = 'Guarulhos';
_Cidades['19'] = 'Jacareí';
_Cidades['46'] = 'Juazeiro da Bahia';
_Cidades['41'] = 'Lages';
_Cidades['37'] = 'Londrina';
_Cidades['15'] = 'Manaus';
_Cidades['40'] = 'Mogi das Cruzes';
_Cidades['22'] = 'Natal';
_Cidades['20'] = 'Niterói';
_Cidades['29'] = 'Osasco';
_Cidades['31'] = 'Palmas';
_Cidades['11'] = 'Porto Alegre';
_Cidades['34'] = 'Recife';
_Cidades['6'] = 'Ribeirão Preto';
_Cidades['9'] = 'Rio de Janeiro';
_Cidades['26'] = 'Salvador';
_Cidades['2'] = 'Santo André';
_Cidades['8'] = 'Santos';
_Cidades['3'] = 'São Bernardo do Campo';
_Cidades['32'] = 'São Caetano do Sul';
_Cidades['5'] = 'São José dos Campos';
_Cidades['28'] = 'São José dos Pinhais';
_Cidades['1'] = 'São Paulo';
_Cidades['17'] = 'Taguatinga';
_Cidades['39'] = 'Vila Velha';
_Cidades['25'] = 'Vitória';
_Cidades['43'] = 'Varginha';
_Cidades['36'] = 'Taubaté';
_Cidades['33'] = 'Uberlândia';

_Cinemas['10'] = new Array( '706', 'Shopping Jardins', '755', 'Shopping Riomar');
_Cinemas['4'] = new Array( '717', 'Shopping Tambore');
_Cinemas['21'] = new Array( '768', 'BH Shopping', '767', 'Diamond Mall', '697', 'Patio Savassi');
_Cinemas['38'] = new Array( '2111', 'Partage Shopping Betim');
_Cinemas['45'] = new Array( '2123', 'Roraima');
_Cinemas['14'] = new Array( '769', 'Iguatemi Brasilia', '720', 'Pier 21');
_Cinemas['44'] = new Array( '2130', 'Camaçari');
_Cinemas['16'] = new Array( '725', 'Campinas Iguatemi');
_Cinemas['13'] = new Array( '694', 'Shopping Campo Grande');
_Cinemas['12'] = new Array( '693', 'Canoas Shopping');
_Cinemas['30'] = new Array( '663', 'Shopping Granja Vianna');
_Cinemas['35'] = new Array( '2108', 'Goiabeiras Shopping');
_Cinemas['18'] = new Array( '700', 'ParkShoppingBarigui', '698', 'Shopping Mueller');
_Cinemas['24'] = new Array( '703', 'Floripa Shopping');
_Cinemas['47'] = new Array( '2129', 'Foz do Iguaçu');
_Cinemas['23'] = new Array( '893', 'Flamboyant', '2113', 'Passeio das Águas');
_Cinemas['27'] = new Array( '759', 'Cinemark Internacional Shopping Guarulhos');
_Cinemas['19'] = new Array( '689', 'Jacarei Shopping');
_Cinemas['46'] = new Array( '2127', 'Jua Garden Shopping');
_Cinemas['41'] = new Array( '2121', 'Lages Garden Shopping');
_Cinemas['37'] = new Array( '2104', 'Boulevard Londrina');
_Cinemas['15'] = new Array( '708', 'Studio 5 Shopping');
_Cinemas['40'] = new Array( '2120', 'Mogi das Cruzes');
_Cinemas['22'] = new Array( '681', 'Midway Mall Natal');
_Cinemas['20'] = new Array( '691', 'Plaza Shopping Niteroi');
_Cinemas['29'] = new Array( '757', 'Cinemark Osasco');
_Cinemas['26'] = new Array( '785', 'Salvador Shopping');
_Cinemas['2'] = new Array( '2115', 'Atrium Shopping', '713', 'Grand Plaza Shopping');
_Cinemas['8'] = new Array( '709', 'Praiamar Shopping');
_Cinemas['3'] = new Array( '724', 'Extra Anchieta', '2109', 'Golden Square');
_Cinemas['32'] = new Array( '2100', 'Park Shopping Sao Caetano');
_Cinemas['9'] = new Array( '728', 'Botafogo', '692', 'Carioca Shopping', '2118', 'Center Shopping Rio - Jacarepagua', '719', 'Downtown', '2112', 'Metropolitano Barra', '2106', 'Village Mall');
_Cinemas['5'] = new Array( '696', 'Center Vale', '712', 'Colinas Shopping');
_Cinemas['28'] = new Array( '894', 'Shopping Sao Jose');
_Cinemas['1'] = new Array( '716', 'Aricanduva', '690', 'Boulevard Tatuape', '699', 'Center Norte', '705', 'Central Plaza', '682', 'Cidade Jardim', '2119', 'Cidade Sao Paulo', '715', 'Eldorado', '714', 'Interlagos', '2114', 'Lar Center', '688', 'Market Place', '684', 'Metro Santa Cruz', '711', 'Metro Tatuape', '758', 'Metro Tucuruvi', '2103', 'Mooca Plaza Shopping', '721', 'Patio Higienopolis', '723', 'Patio Paulista', '662', 'Raposo Shopping', '710', 'SP Market', '687', 'Shopping D', '707', 'Shopping Iguatemi SP', '2110', 'Tiete Plaza Shopping', '727', 'Villa Lobos');
_Cinemas['17'] = new Array( '718', 'Taguatinga Shopping');
_Cinemas['36'] = new Array( '2105', 'Via Vale Taubate');
_Cinemas['33'] = new Array( '2101', 'Uberlândia Shopping');
_Cinemas['43'] = new Array( '2122', 'Via Cafe');
_Cinemas['39'] = new Array( '2117', 'Shopping Vila Velha');
_Cinemas['25'] = new Array( '702', 'Shopping Vitoria');

function isOdd(num) { return num % 2;}

function stringNormalize(str) {
    let translate = { "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a", "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e",
        "ê":"e", "ë":"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n", "ò" :"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o",
        "ø":"o", "ù":"u", "ú":"u", "û":"u", "ü":"u", "ý":"y", "þ":"b", "ß" :"s", "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a",
        "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e", "ê":"e", "ë" :"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n",
        "ò":"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o", "ø" :"o", "ù":"u", "ú":"u", "û":"u", "ý":"y", "ý":"y", "þ":"b", "ÿ":"y",
        "ŕ":"r", "ŕ":"r"
    },
    translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕ]/gim;
    return (str.replace(translate_re, function(match) {
        return translate[match];
    }).toLowerCase());
}

function mountUrl(cinemaObj) {
    let url = `http://cinemark.com.br/programacao/${cinemaObj.city}/${cinemaObj.place}/${cinemaObj.cityId}/${cinemaObj.id}`;
    return url;
}

getAllCinemas();

function getAllCinemas() {
    let cinemasArr = [];
    _Cinemas.forEach(function(val, key) {
        let cinemaObj = {
            cinema: 'cinemark',
            place: String,
            place_label: String,
            city: stringNormalize(_Cidades[key]),
            city_label: _Cidades[key].toLowerCase(),
            cityId: key,
            url: String
        };

        if (val.length > 3) {

            val.forEach(function(v, k) {

                let cinemaObj = {
                    cinema: 'cinemark',
                    place: String,
                    place_label: String,
                    city: stringNormalize(_Cidades[key]),
                    city_label: _Cidades[key].toLowerCase(),
                    url: String
                };

                if (isOdd(k)) {
                    let cinemaObj = {
                        cinema: 'cinemark',
                        place: String,
                        place_label: String,
                        city: stringNormalize(_Cidades[key]),
                        city_label: _Cidades[key].toLowerCase(),
                        cityId: key,
                        url: String
                    };

                    cinemaObj.id = val[k - 1];
                    cinemaObj.place = stringNormalize(v);
                    cinemaObj.place_label = v.toLowerCase();
                    cinemaObj.url = mountUrl(cinemaObj);
                    cinemaObj.url = cinemaObj.url.replace(/\s+/g, '-');
                    cinemasArr.push(cinemaObj)
                };

            });

        } else {
            cinemaObj.id = val[0];
            cinemaObj.place = stringNormalize(val[1]);
            cinemaObj.place_label = val[1].toLowerCase();
            cinemaObj.url = mountUrl(cinemaObj);
            cinemaObj.url = cinemaObj.url.replace(/\s+/g, '-');
            cinemasArr.push(cinemaObj);
        }

        delete cinemaObj.cityId;
        delete cinemaObj.id;

    });

    const dir = path.join(__dirname, '../static/', 'urls.cinemark.json');
    fs.writeFile(dir, JSON.stringify(cinemasArr), function(err) {

        if (err) {
            return console.log(err);
        }

        console.log("The cinemark URLs json was saved!");
    });
}
