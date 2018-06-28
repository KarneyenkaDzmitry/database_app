'use strict';
const request = require('request');

const options = {
    url: "https://rickandmortyapi.com/api/character/",
    method: "GET",
    json: true
    
}
async function main(options, param) {
    let dataBase = await getBase(options);
    const json = JSON.stringify(dataBase);
    console.log(param);
    console.log(`DataBase: ${dataBase}`);
    console.log(`DataBase: ${json}`);


}
async function getBase(options) {
    return new Promise((resolve, reject) => {
        try {
            //const  result = request(options,(err,  head, body)=>{console.log(body);});
            //console.log(result.body);
            return resolve(request(options).body);
        } catch (error) {
            return reject(error);
        }
    });
}
main (options);