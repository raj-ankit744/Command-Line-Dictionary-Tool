const service = require('../Services/service');
// const output = require('./stringOutput');
exports.getDefinitions = async (word) => {
    try {
        let res = await service.options.definition(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getDefinition = async (word) => {

    let res = await service.options.definition(word);
    let size = res.definitions.length;
    if(size > 0) {
        let rand_idx = Math.floor(Math.random() * size);
        return res.definitions[rand_idx].text;
    }
    return '';
};

exports.getRandomWord = async (word) => {
    try{
        let res = await service.options.randomWord();
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getExamples = async (word) => {
    try{
        let res = await service.options.examples(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getExample = async (word) => {
    try {
        let res = await service.options.examples(word);
        let size = res.examples.length;
        let rand_idx = Math.floor(Math.random() * size);
        return res.examples[rand_idx].text;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getSynonyms = async (word) => {
    try{
        let res = await service.options.synonym(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getSynonym = async (word) => {
    try {
        let res = await service.options.synonym(word);
        let size = res.synonyms.length;
        if(size > 0) {
            let rand_idx = Math.floor(Math.random() * size);
            return res.synonyms[rand_idx];
        }
        return '';
    }
    catch(error) {
        console.log(error);
    }
};
exports.getAntonyms = async (word) => {
    try{
        let res = await service.options.antonym(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getAntonym = async (word) => {
    try {
        let res = await service.options.antonym(word);
        let size = res.antonyms.length;
        if(size > 0){
            let rand_idx = Math.floor(Math.random() * size);
            return res.antonyms[rand_idx];
        }
        return '';
    }
    catch(error) {
        console.log(error);
    }
};
exports.getFullDict = async (word) => {
    try{
        let res = await service.options.fullDict(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};

exports.getWordOfTheDay = async (word) => {
    try{    
        let res = await service.options.wordOfTheDay(word);
        return res;
    }
    catch(error) {
        console.log(error);
    }
};


/* a = async function() {
    try{
        let res = await exports.getAntonym('wheel');
        console.log(res);
    }
    catch(error) {
        console.log(error);
    }

}
a();
 */