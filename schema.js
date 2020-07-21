/*
 * This schema refers
 * to the form of data inside
 * QR Codes and how the survey data
 * is stored in JSON
 */
function getSchema() {

    return  { 

        'fullname': null,

        'codename': null,
        
        'hobbies': {

            'arts and crafts': 0,

            'games': 0,

            'music': 0,

            'performing arts': 0,

            'spiritual and mental': 0,

            'foods and drinks': 0,

            'sports and outdoors': 0

        }, 

        'hobbiesComplete': [],

        'values': [], 
        
        'intellect': {

            'naturalistic': 0,

            'musical': 0,

            'logical-mathematical': 0,

            'intrapersonal': 0,

            'interpersonal': 0,

            'bodily-kinesthetic': 0,

            'linguistic': 0,

            'spatial': 0

        }, 

        'mbti': {

            'introverted': 0,

            'extraverted': 0,

            'intuition': 0,

            'sensation': 0,

            'thinking': 0,

            'feeling': 0,

            'judging': 0,

            'perceiving': 0
        }

    };
}

const chemistry = require('./chemistry.json');
/*
 * Function to compress the data for QR Code
 */
function compressSchema(schema) {

    let results = [schema.fullname, schema.codename];

    // simply push the hobby scores as integers
    for (let hobby in chemistry.hobbies) { results.push(schema.hobbies[hobby]); }

    // The format for this would be two integers, one is the category index which is
    // the index to find the right key from Object.keys(chemistry.hobbies) and hobby
    // index from the resulting array separated by a dot
    for (let hobby of schema.hobbiesComplete ) {
        
        let categories = Object.keys(chemistry.hobbies);

        for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++ ) {

            let category = categories[categoryIndex];

            let hobbyIndex = chemistry.hobbies[category].indexOf(hobby);

            if (hobbyIndex == -1) continue;

            results.push(`${categoryIndex}.${hobbyIndex}`);
        }

    }

    // This has a format of two numbers
    for (let value of schema.values) {

        for (let group of chemistry.values) {

            let index = group.indexOf(value);

            if (index == -1) continue;

            results.push(index);

        }
    }

    // this process is similar to the first one
    for (let intellect in chemistry.intellect) { results.push(schema.intellect[intellect]); }

    for (let category in getSchema().mbti) { results.push(schema.mbti[category]); }

    return results.join(',');
}

function decompressSchema(schema) {

    const result = getSchema();

    const data = schema.split(',');

    result.fullname = data.shift();

    result.codename = data.shift();

    for (let hobby in result.hobbies) {

        result.hobbies[hobby] = parseInt( data.shift() );

    }

    let current = data[0];

    while( current.split('.').length == 2 ) {

        let [categoryIndex, hobbyIndex] = current.split('.');

        let categories = Object.keys(chemistry.hobbies);

        result.hobbiesComplete.push(chemistry.hobbies[ categories[categoryIndex] ][hobbyIndex]);

        data.shift();

        current = data[0];

    }

    for (let value of chemistry.values) {
        
        result.values.push(value[ data[0] ]);

        data.shift();

    }

    for (let intellect in result.intellect) {

        result.intellect[intellect] = parseInt( data.shift() );

    }

    for (let mbti in result.mbti) {

        result.mbti[mbti] = parseInt( data.shift() );

    }

    return result;
}

function isValidSchema(schema) {

    try {
        
        decompressSchema(schema);

        return true;

    } catch(error) {

        return false;

    }

}

module.exports = { getSchema, compressSchema, decompressSchema, isValidSchema };
