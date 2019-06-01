const controller = require('./general')
const chalk = require('chalk')
exports.outputFullDict = (fullDict) => {
    let res = '';
    if(fullDict) {
        if(fullDict[0] && fullDict[0].definitions && fullDict[0].definitions.length) {
            fullDict[0].definitions.forEach((definition, index) => {
                res += chalk.bold.magenta('Definition '+ (index+1)) + ' - '+ chalk.italic(definition.text)+'\n\n';
            });
        }
        if(fullDict[1] && fullDict[1].synonyms && fullDict[1].synonyms.length)
            res +=chalk.bold.magenta('Synonyms') + ' - '+chalk.italic(fullDict[1].synonyms.join(', '))+'\n\n';
        if(fullDict[2] && fullDict[2].antonyms && fullDict[2].antonyms.length)
            res += chalk.bold.magenta('Antonyms') + ' - ' + chalk.italic(fullDict[2].antonyms.join(', ')) + '\n\n';
        if(fullDict[3] && fullDict[3].examples && fullDict[3].examples.length) {
            fullDict[3].examples.forEach((example, index) => {
                res += chalk.bold.magenta('Example '+ (index+1)) + ' - ' + chalk.italic(example.text) + '\n\n';
            });
        }
    }
    return res;
};

exports.outputDefinition = (definition) => {
    let res = '';
    if(definition && definition.definitions && definition.definitions.length) {
        definition.definitions.forEach((def, index) => {
            res += chalk.bold.magenta('Definition '+ (index+1)) + ' - '+ chalk.italic(def.text)+'\n\n';
        });
    }
    return res;
};

exports.outputSynonym = (synonym) => {
    let res = '';
    if(synonym && synonym.synonyms && synonym.synonyms.length)
        res +=chalk.bold.magenta('Synonyms') + ' - '+chalk.italic(synonym.synonyms.join(', '))+'\n\n';
    return res;
};

exports.outputAntonym = (antonym) => {
    let res = '';
    if(antonym && antonym.antonyms && antonym.antonyms.length)
        res += chalk.bold.magenta('Antonyms') + ' - ' + chalk.italic(antonym.antonyms.join(', ')) + '\n\n';
    return res;
};

exports.outputWordOfTheDay = (wordOfTheDay) => {
    let res = '';
    if(wordOfTheDay && wordOfTheDay['Word of the day'])
        res += chalk.bold.magenta('The Word of the day')+ ' is ' + chalk.italic(wordOfTheDay['Word of the day']) +'\n\n' + exports.outputFullDict(wordOfTheDay.fullDict);
    return res;
};

exports.outputExamples = (example) => {
    let res = '';
    if(example && example.examples && example.examples.length) {
        example.examples.forEach((ex, index) => {
            res += chalk.bold.magenta('Definition ' + (index + 1)) + ' - '+ chalk.italic(ex.text)+'\n\n';
        });
    }
    return res;
}