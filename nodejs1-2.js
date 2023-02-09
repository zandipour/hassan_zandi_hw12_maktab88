

const path = require('path');
const unoconv = require('awesome-unoconv');
 
const sourceFilePath = path.resolve('./w1.docx');
const outputFilePath = path.resolve('./w1.pdf');
 
unoconv
  .convert(sourceFilePath, outputFilePath)
  .then(result => {
    console.log(result); // return outputFilePath
  })
  .catch(err => {
    console.log(err);
  });