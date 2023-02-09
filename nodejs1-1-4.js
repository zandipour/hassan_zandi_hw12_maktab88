


const fs = require("fs");
const pngToJpeg = require('png-to-jpeg');
 
let buffer = fs.readFileSync("./1.png");
pngToJpeg({quality: 90})(buffer)
.then(output => fs.writeFileSync("./some-file.jpeg", output));