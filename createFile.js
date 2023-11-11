const express = require('express');
const bodyParser = require("body-parser") 
var fs = require('fs');

const app = express();
let folder = "./files";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended:true
})); 
app.post('/createFile', (req, res) => {
    folder = req.body?.folder ? "./"+req.body?.folder : folder;
    let ts = new Date();
    let dt = folder + "/" + (ts.getUTCFullYear()) +
        '-' + (ts.getUTCMonth() + 1) +
        '-' + (ts.getUTCDate()) + 
        '-' + (ts.getHours()) +
        '-' + (ts.getMinutes()) +
        '-' + (ts.getSeconds());

        let df =  (ts.getHours()) +
        ':' + (ts.getMinutes()) +
        ':' + (ts.getSeconds());
        

    createFolder(dt,df);

    function createFolder(dt,df) {
        fs.access(folder, (error) => {

            // To check if given directory  
            // already exists or not 
            if (error) {
                // If current directory does not exist then create it 
                fs.mkdir(folder, { recursive: true }, (error) => {
                    if (error) {
                        console.log(error);
                        res.send(dt + '.txt File is created Failed.' + error)
                        res.end();
                    } else {
                        console.log("New Directory created successfully !!");
                        createFile(dt,df);
                    }
                });
            } else {
                console.log("Given Directory already exists !!");
                createFile(dt,df);
            }
        });
    }

    function createFile(dt,df) {

        fs.writeFile(dt + '.txt', df.toString(), function (err) {
            if (err) throw err;
            console.log(dt + '.txt File is created successfully.');

            res.send(dt + '.txt File is created successfully.')
            res.end()
        });
    }


})

app.post('/displayFile', (req, res) => {
    folder = req.body?.folder ? "./"+req.body?.folder : folder;
    fs.readdir(folder, (err, files) => {
       
        res.send(files)
        res.end()
      });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(
    `Server started on port ${PORT}`));