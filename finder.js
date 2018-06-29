'use strict';
const fs = require('fs');
const Client = require('node-rest-client').Client;
const client = new Client();
const fileDB = './resources/R&MDB.json'
const startUrl = "https://rickandmortyapi.com/api/character/";

async function main(parameters) {
    fs.writeFileSync(fileDB, '{\"results\":[]}');
    getBase(startUrl).then((resolve) => {
        setTimeout(() => {
            const character = getCharacter(parameters);
            console.log(character);
            fs.writeFileSync('./resources/result.json', JSON.stringify(character), 'utf8' );
        }, 5000);
    })
    .catch((err) => { console.log(err); })
};

function getBase(url) {
    return new Promise((resolve, reject) => {
        try {
            client.get(url, (data, response) => {
                if (response.statusCode === 200) {
                    let array = JSON.parse(fs.readFileSync(fileDB, 'utf8')).results;
                    array = [...array, ...data.results];
                    fs.writeFileSync(fileDB, '{\"results\": ' + JSON.stringify(array) + '}', 'utf-8');
                    url = data.info.next;
                    url!==''?console.log('Data recieved!'):getBase(url); 
                }
                else {
                    console.log('Something went wrong! Response code:' + response.statusCode);
                }
            });
            return resolve('success');
        } catch (error) {
            return reject(error);
        }
    });
}

function getCharacter(parameters) {
    let dataBase = JSON.parse(fs.readFileSync(fileDB, 'utf8')).results;
    Object.keys(parameters).forEach(elem => {
        dataBase = dataBase.filter(
            element => element[elem].toString().toLowerCase().indexOf(parameters[elem].toString().toLowerCase())>-1)
    });
    return dataBase;
}
exports.main = main;