const cnf = require('../Config/config');
const request = require('request-promise-native');
exports.options = {
    definition : async function(word) {
        try{
            let res = await request(`${cnf.CONFIG.API_HOST}/word/${word}/definitions?api_key=${cnf.CONFIG.API_KEY}`);
            return {"definition":JSON.parse(res)};
        }
        catch(error) {
            console.log("Something went wrong while fetching data!")
        }
    },
    randomWord : async function() {
        try{
            let res = await request(`${cnf.CONFIG.API_HOST}/words/randomWord?api_key=${cnf.CONFIG.API_KEY}`);
            return JSON.parse(res);
        }
        catch(error) {
            console.log("Something went wrong while fetching data!")
        }
    },
    examples : async function(word) {
        try{
            let res = await request(`${cnf.CONFIG.API_HOST}/word/${word}/examples?api_key=${cnf.CONFIG.API_KEY}`);
            return JSON.parse(res);
        }
        catch(error) {
            console.log("Something went wrong while fetching data!")
        }
    },
    synonym : async function(word, relation) {
        try{
            let relatedWords = await request(`${cnf.CONFIG.API_HOST}/word/${word}/relatedWords?api_key=${cnf.CONFIG.API_KEY}`);
            relatedWords = JSON.parse(relatedWords);
            let res = {};
            relatedWords.forEach((word) => {
                if(word.relationshipType && word.relationshipType == 'synonym'){
                    res = word.words;
                }
            });
            return {"synonym":res};
        }
        catch(error) {
            console.log("Something went wrong while fetching data!")
        }
    },
    antonym : async function(word, relation) {
        try{
            let relatedWords = await request(`${cnf.CONFIG.API_HOST}/word/${word}/relatedWords?api_key=${cnf.CONFIG.API_KEY}`);
            relatedWords = JSON.parse(relatedWords);
            let res = {};
            relatedWords.forEach((word) => {
                if(word.relationshipType && word.relationshipType == 'antonym'){
                    res = word.words;
                }
            });
            return {"antonym":res};
        }
        catch(error) {
            console.log("Something went wrong while fetching data!")
        }
    },

    fullDict : async function(word) {
        try{
            let res1 = await this.definition(word);
            let res2 = await this.synonym(word);
            let res3 = await this.antonym(word);
            let res4 = await this.examples(word);
            let res = [res1, res2, res3, res4];
            return res;
        }
        catch(error){
            console.log(error);
        }
    },
    wordOfTheDay : async function() {
        try{
            let res1 = await this.randomWord();
            if(res1.word)
                res2 = await this.fullDict(res1.word);
            return {"Word of the day":res1.word,res2};
        }
        catch(error){
            console.log(error);
        }
    }
};

/* a = async function() {
    try{
        let res = await options.wordOfTheDay('single');
        console.log(typeof(res));
        console.log(res);
    }
    catch(error) {
        console.log(error);
    }

}
a(); */