
const writeXlsxFile = require('write-excel-file/node')
const fetch = require('node-fetch');




fetch('https://reqres.in/api/users?page=1')
    .then(res => res.text())
    .then(body => console.log(body)
    

   );

await writeXlsxFile(objects, {
  body,
  filePath: '/file.xlsx'
})