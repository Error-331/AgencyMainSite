'use strict';

const fs = require('fs');
const path = require('path');

const routes = [
    {
        path: 'send/inquiry',
        handler: function() {
            return new Promise((resolve) => {
                const server = this;


                const dataDirectoryPath = path.resolve(this._serverRootDir, './../user_created');
                const fileName = 'inquiries.txt';

                const dataFileLocation = `${dataDirectoryPath}/${fileName}`;

                if (!fs.existsSync(dataDirectoryPath)) {
                    fs.mkdirSync(dataDirectoryPath);
                }

                const usersTXTFileStream = fs.createWriteStream(dataFileLocation, {
                    flags: 'a',
                    autoClose: true
                });

                usersTXTFileStream.on('open', function(){
                    const name = server._postData.name ? server._postData.name : '';
                    const email = server._postData.email ? server._postData.email : '';
                    const message = server._postData.message ? server._postData.message : '';

                    this.write(`Name: ${name}; Email: ${email}`);
                    this.write('\n');
                    this.write(`Message: ${message}`);
                    this.write('\n');
                    this.end('\n');
                });

                usersTXTFileStream.on('close', function(){
                    server._response.writeHead(200);
                    server._response.end('Success!');

                    resolve();
                });

                usersTXTFileStream.on('error', function (error) {
                    console.log(error);

                    if (error.code === 'ENOENT') {
                        server._serveErrorPage(404, `Cannot find file: "${fileName}"`);
                    } else {
                        server._serveErrorPage(400, `Cannot open file: "${fileName}"`);
                    }

                    resolve();
                });
            });
        }
    }
];

module.exports = routes;