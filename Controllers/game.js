const service = require('../Services/service');
const general = require('./general')
const output = require('./stringOutput')
const g = require('generatorics')
const {prompt} = require('inquirer');
const chalk = require('chalk');
hintOptions = {
    getRandomPermutation : (word) => {
        return 'The word is hidden in the jumble - '+g.shuffle(word.split('')).join('')+'\n';
    },
    getSynonym : async (synonym) => {
        try{
            list = (await synonym).synonyms;
        }
        catch(error) {
            console.log(error);
        }
        let res = list.pop();
        return res?'The word has an synonym - ' + res:'';
    },
    getAntonym : async (antonym) => {
        try{
            list = (await antonym).antonyms;
        }
        catch(error) {
            console.log(error);
        }
        let res = list.pop();
        return res?'The word has an antonym - ' + res:'';
    },
    getDefinition : async (definition) => {
        try{
            list = await definition.definitions;
        }
        catch(error) {
            console.log(error);
        }
        let res = list.pop();
        return res?'A definition for the word - '+res.text:'';
    }
};
exports.gameOptions = async (res, word, synonyms, antonyms, definitions) => {
    parameters = [word, synonyms, antonyms, definitions];
    options = ['getRandomPermutation', 'getSynonym', 'getAntonym', 'getDefinition'];
    //console.log(synonyms)
    if(res.start == word || (synonyms.synonyms && (synonyms.synonyms.includes(res.start)))) {
        verdict = "Great! The word is correct";
    }
    else {
        try {
            resOption = await prompt([{type: 'input', name: 'option', message: 'Oops! That was incorrect. Please select one of the following options\n1. try again\n2. hint\n3. quit\n'}]);
        }
        catch(error) {
            console.log(error);
        }
        switch(resOption.option) {
            case '1': 
            try {
                resTry = await prompt([{type: 'input', name: 'start', message:'Please enter an answer'}]);
            }
            catch(error) {
                console.log(error);
            }
                try {
                    await exports.gameOptions(resTry, word, synonyms, antonyms, definitions);
                }
                catch(error) {
                    console.log(error);
                }
                break;
            case '2': try {
                let msg = '';
                while(msg == '') {
                    rand_idx = (definitions.length && synonyms.length && antonyms.length)?0:Math.floor(Math.random() * Object.keys(hintOptions).length);
                    if (rand_idx == 0)
                        msg = hintOptions[options[rand_idx]](parameters[rand_idx]);
                    msg = await hintOptions[options[rand_idx]](parameters[rand_idx]);
                    
                }
                resHint = await prompt([{type: 'input', name: 'start', message: msg+'\n'}]);
            }
            catch(error) {
                console.log(error);
            }
                try {
                    await exports.gameOptions(resHint, word, synonyms, antonyms, definitions);
                }
                catch(error) {
                    console.log(error);
                }
                break;
            case '3':
                try {
                    fullDict = await general.getFullDict(word);
                }
                catch(error) {
                    console.log(error);
                }
                verdict = chalk.bold.magenta('The word is ')+ chalk.italic(word) + '\n\n'+ output.outputFullDict(fullDict);
                break;
        }

    }
    return verdict;
};
exports.playGame = async () => {
    try {
        word = await general.getRandomWord();
        [definitions, synonyms, antonyms] =  await Promise.all([general.getDefinitions(word), general.getSynonyms(word), general.getAntonyms(word)]);
    }
    catch(error) {
        console.log(error);
    }
    try {
        let def = await hintOptions.getDefinition(definitions);
        let syn = await hintOptions.getSynonym(synonyms);
        let ant = await hintOptions.getAntonym(antonyms);
        def = def != ''?def + '\n':'';
        syn = syn != ''?syn + '\n':'';
        ant = ant != ''?ant + '\n':'';

        res = await prompt([{type: 'input', name:'start', message:'Hi. Please Enter a word. Hints are given below.\n'+ def  + syn + ant + "\n"}]);
    }
    catch (error) {
        console.log(error);
    }
    let verdict = await exports.gameOptions(res, word, synonyms, antonyms, definitions);
    return verdict;
};


/* a = async () => {
    try {
        let res = await exports.playGame();
        console.log(res);
    }
    catch(error) {
        console.log(error);
    }
}
a(); */
