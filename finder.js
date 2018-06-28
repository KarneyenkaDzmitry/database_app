'use strict';
const fs = require('fs');
const Client = require('node-rest-client').Client;
const client = new Client();

let startUrl = "https://rickandmortyapi.com/api/character/";

async function main (parameters) {
    fs.writeFileSync('R&MDB.json', '{\"results\":[]}');
    getBase(startUrl).then((result)=>{
        //console.log(result);
        setTimeout(()=>{
            const character =  getCharacter(parameters);
            console.log(character);},5000);
    });
}

async function getBase(url) {
    return new Promise((resolve, reject)=>{
        try {
        client.get(url, (data, response) => {
            if (response.statusCode === 200) {
                let array = JSON.parse(fs.readFileSync('R&MDB.json','utf8')).results;
                array = [...array,...data.results];
                fs.writeFileSync('R&MDB.json','{\"results\": '+ JSON.stringify(array)+'}', 'utf-8');
                url= data.info.next;
                if (url!==''){getBase(url);}
                //console.log('Data recieved!');
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

 
    //    client.get(url, (data, response) => {
    //         if (response.statusCode === 200) {
    //             let array = JSON.parse(fs.readFileSync('R&MDB.json','utf8')).results;
    //             array = [...array,...data.results];
    //             fs.writeFileSync('R&MDB.json','{\"results\": '+ JSON.stringify(array)+'}', 'utf-8');
    //             url= data.info.next;
    //             if (url!==''){getBase(data.info.next);}
    //             //console.log('Data recieved!');
    //         }
    //         else {
    //             console.log('Something went wrong! Response code:' + response.statusCode);
    //         }
    //     });

}

function getCharacter(parameters){
    let dataBase = JSON.parse(fs.readFileSync('R&MDB.json','utf8')).results;
    //console.log(dataBase);
    // let result = dataBase.filter(element=>{
    //     let ind = true;
    //     Object.keys(parameters).forEach(elem => {
    //         ind = element[elem]===parameters[elem]?true:false;
    //         if (!ind) return false;
    //     });
    //     return ind;
    // });
    let result = '';
    Object.keys(parameters).forEach(elem => {
        result = dataBase.filter(element=>element[elem]===parameters[elem])
    });
    return result;
}
//main();
exports.main = main;