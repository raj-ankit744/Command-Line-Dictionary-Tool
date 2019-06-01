const controller = require('./general')
exports.outputFullDict = (fullDict) => {
    let res = '';
    if(fullDict[0].definitions.length) {
        fullDict[0].definitions.forEach((definition, index) => {
            res += 'Definition '+index+1+ ' - '+definition.text+'\n';
        });
    }
    if(fullDict[1].synonyms.length)
        res +='Synonyms - '+fullDict[1].synonyms.join(', ')+'\n';
    if(fullDict[2].antonyms.length)
        res += 'Antonyms - ' + fullDict[2].antonyms.join(', ') + '\n';
    if(fullDict[3].examples.length) {
        fullDict[3].examples.forEach((example, index) => {
            res += 'Example '+ index+1 + ' - ' + example.text + '\n';
        });
    }
    return res;
    
}