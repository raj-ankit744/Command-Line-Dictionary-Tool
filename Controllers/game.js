const service = require('../Services/service');
const general = require('./general')
const output = require('./stringOutput')
const g = require('generatorics')
const {prompt} = require('inquirer');
hintOptions = [
{
    getRandomPermutation : (word) => {
        return 'The word is hidden in the jumble - '+g.shuffle(word.split('')).join('')+'\n';
    }
},
{
    getSynonym : async (word) => {
        let res = await general.getSynonym(word);
        return res != ''?'The word has an synonym - ' + res:res;
    }
},
{
    getAntonym : async (word) => {
        let res = await general.getAntonym(word);
        return res != ''?'The word has an antonym - ' + res:res;
    }
},
{
    getDefinition : async (word) => {
        let res = await general.getDefinition(word);
        return res != ''?'Alternative definition for the word - '+res:res;
    }
}
];
exports.gameOptions = async (res, word, synonym, synonyms) => {
    if(res.start == word || (res != synonym && synonyms.synonyms.includes(res.start)))
        verdict = "Great! The word is correct";
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
                    await exports.gameOptions(resTry, word, synonym, synonyms);
                }
                catch(error) {
                    console.log(error);
                }
                break;
            case '2': try {
                let msg = '';
                while(msg == '') {
                    rand_idx = Math.floor(Math.random() * hintOptions.length);
                    if(rand_idx == 0){
                        msg = hintOptions[0].getRandomPermutation(word);
                        break;
                    }
                    msg = await hintOptions[rand_idx][Object.keys(hintOptions[rand_idx])[0]](word);
                }
                resHint = await prompt([{type: 'input', name: 'start', message: msg+'\n'}]);
            }
            catch(error) {
                console.log(error);
            }
                try {
                    await exports.gameOptions(resHint, word, synonym, synonyms);
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
                verdict = 'The word was '+ word + '\n'+ output.outputFullDict(fullDict);
                break;
        }

    }
    return verdict;
};
exports.playGame = async () => {
    try {
        word =  await general.getRandomWord();
    }
    catch(error) {
        console.log(error);
    }
    try {
        definition = await general.getDefinition(word);
    }
    catch(error) {
        console.log(error);
    }
    try {
        synonym = await general.getSynonym(word);
    }
    catch(error) {
        console.log(error);
    }
    try {
        synonyms = await general.getSynonyms(word);
    }
    catch(error) {
        console.log(error);
    }
    try {
        antonym = await general.getAntonym(word);
    }
    catch(error) {
        console.log(error);
    }
    try {
        let def = definition != ''?'Definition - ' + definition:'';
        let syn = synonym != ''?'\nSynonym - ' + synonym:'';
        let ant = antonym != ''?'\nAntonym - ' + antonym:'';

        res = await prompt([{type: 'input', name:'start', message:'Hi. Please Enter a word. Hints are given below.\n'+ def  + syn + ant + "\n"}]);
    }
    catch (error) {
        console.log(error);
    }
    let verdict = await exports.gameOptions(res, word, synonym, synonyms);
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
