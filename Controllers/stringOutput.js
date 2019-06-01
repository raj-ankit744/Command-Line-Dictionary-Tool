const controller = require('./general')
exports.outputFullDict = (fullDict) => {
    let res = '';
    if(fullDict) {
        if(fullDict[0] && fullDict[0].definitions && fullDict[0].definitions.length) {
            fullDict[0].definitions.forEach((definition, index) => {
                res += 'Definition '+ (index+1) + ' - '+definition.text+'\n';
            });
        }
        if(fullDict[1] && fullDict[1].synonyms && fullDict[1].synonyms.length)
            res +='Synonyms - '+fullDict[1].synonyms.join(', ')+'\n';
        if(fullDict[2] && fullDict[2].antonyms && fullDict[2].antonyms.length)
            res += 'Antonyms - ' + fullDict[2].antonyms.join(', ') + '\n';
        if(fullDict[3] && fullDict[3].examples && fullDict[3].examples.length) {
            fullDict[3].examples.forEach((example, index) => {
                res += 'Example '+ (index+1) + ' - ' + example.text + '\n';
            });
        }
    }
    return res;
};

exports.outputDefinition = (definition) => {
    let res = '';
    if(definition && definition.definitions && definition.definitions.length) {
        definition.definitions.forEach((def, index) => {
            res += 'Definition '+ (index+1) + ' - '+def.text+'\n';
        });
    }
    return res;
};

exports.outputSynonym = (synonym) => {
    let res = '';
    if(synonym && synonym.synonyms && synonym.synonyms.length)
        res +='Synonyms - '+synonym.synonyms.join(', ')+'\n';
    return res;
};

exports.outputAntonym = (antonym) => {
    let res = '';
    if(antonym && antonym.antonyms && antonym.antonyms.length)
        res +='Antonyms - '+antonym.antonyms.join(', ')+'\n';
    return res;
};

exports.outputWordOfTheDay = (wordOfTheDay) => {
    let res = '';
    if(wordOfTheDay && wordOfTheDay['Word of the day'])
        res += 'The Word of the day is ' + wordOfTheDay['Word of the day'] +'\n' + exports.outputFullDict(wordOfTheDay.fullDict);
    return res;
};

exports.outputExamples = (example) => {
    let res = '';
    if(example && example.examples && example.examples.length) {
        example.examples.forEach((ex, index) => {
            res += 'Definition ' + (index + 1) + ' - '+ex.text+'\n';
        });
    }
    return res;
}