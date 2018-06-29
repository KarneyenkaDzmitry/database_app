'use strict';
const finder = require('./finder.js');
const args = require('yargs')
    .usage('Usage: node $0 --id [string] --type [string]')
    .example('$0 -n Alex').example('$0 --st Alive')
    .option('id').alias('i', 'id').nargs('id', 1).describe('i', 'Number of ID')
    .option('name').alias('n', 'name').nargs('n', 1).describe('n', 'Name of character')
    .option('status').alias('st', 'status').nargs('st', 1).describe('st', 'Status: alive or dead')
    .option('species').alias('sp', 'species').nargs('sp', 1).describe('sp', 'Species of character(e.g. Human)')
    .option('type').alias('t', 'type').nargs('t', 1).describe('t', 'Type')
    .option('gender').alias('g', 'gender').nargs('g', 1).describe('g', 'Gender: male or female')
    .option('origin').alias('o', 'origin').nargs('o', 1).describe('o', 'Origin(e.g. Earth)')
    .option('location').alias('l', 'location').nargs('l', 1).describe('l', 'Location(e.g. Earth)')
    .help('h').alias('h', 'help')
    .epilogue('Created by Dzmitry Karneyenka')
    .argv
/*There are three types of function that do the same thing. They are for example. I like more the second one.*/
function first() {
    let result = '{'
    result += typeof (args.id) === 'undefined' ? '' : '\"id\":\"' + args.id + '\",';
    result += typeof (args.name) === 'undefined' ? '' : '\"name\":\"' + args.name + '\",';
    result += typeof (args.species) === 'undefined' ? '' : '\"species\":\"' + args.species + '\",';
    result += typeof (args.status) === 'undefined' ? '' : '\"status\":\"' + args.status + '\",';
    result += typeof (args.type) === 'undefined' ? '' : '\"type\":\"' + args.type + '\",';
    result += typeof (args.gender) === 'undefined' ? '' : '\"gender\":\"' + args.gender + '\",';
    result += typeof (args.origin) === 'undefined' ? '' : '\"origin\":\"' + args.origin + '\",';
    result += typeof (args.location) === 'undefined' ? '' : '\"location\":\"' + args.location + '\",';
    result = result.slice(0, -1) + '}';
    return JSON.parse(result);
}

function second() {
    const keys = ['id', 'name', 'species', 'status', 'type', 'gender', 'origin', 'location'];
    let result = '{';
    keys.forEach((el) => {
        result += typeof (args[el]) === 'undefined' ? '' : '\"' + el + '\":\"' + args[el] + '\",';
    });
    return JSON.parse(result.slice(0, -1) + '}');
}

function third(args) {
    delete args['_']; 
    delete args['version']; 
    delete args['h']; 
    delete args['help']; 
    delete args['$0'];
    delete args['i'];
    delete args['n'];
    delete args['sp'];
    delete args['st'];
    delete args['t'];
    delete args['g'];
    delete args['o'];
    delete args['l'];
    Object.keys(args).forEach((key, ind) => {
        if (typeof (args[key]) === 'undefined') { delete args[key] };
    });
    return args;
}

//finder.main(first(args));
//finder.main(second(args));
finder.main(third(args));




