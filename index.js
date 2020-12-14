'use strict';

const fs = require('fs');

const mapDataString = str => {

    const minOccurrences = str.match(/^(\d+)-/)[1];

    const maxOccurrences = str.match(/-(\d+)\s/)[1];

    const char = str.match(/\s(\D):/)[1];

    const password = str.match(/:\s(\D+)$/)[1];
    
    return { minOccurrences, maxOccurrences, char, password };
};

const dataValidation = dataElement => {
    const charMatch = dataElement.password.match(new RegExp(dataElement.char, 'g'));
    const countOfOccurrences = (charMatch || []).length;
    
    return countOfOccurrences >= dataElement.minOccurrences
        && countOfOccurrences <= dataElement.maxOccurrences;
};

const dataToArray = data => data
    .replace(/\r/g, '')
    .split('\n')
    .map(mapDataString);

// Для теста вместо data.txt подставляем test_data.txt и сравниваем результат с указанным для тестовых данных.

fs.readFile('data.txt', 'utf8', (error, data) => {
    if (error) {
        throw error;
    }

    const dataArray = dataToArray(data);
    const validPasswordsCount = dataArray.filter(dataValidation).length;

    console.log(`Count of valid passwords : ${validPasswordsCount}`);
});