'use strict';

const repoName = 'ext';
// const repoVersion = '6.7.0';
// const repoSource = `http://9.31.24.224:9081/artifactory/js-libraries/${repoName}/${repoVersion}`;
const repoVersion = '6.2.0-gpl';
const repoSource = 'http://cdn.sencha.com/ext/gpl';

const path = require('path');
const admZip = require('adm-zip');
const request = require('superagent');
const progress = require('superagent-progress');
const fs = require('fs');

const zipFile = `${repoName}-${repoVersion}.zip`;
const source = `${repoSource}/${zipFile}`;
const output = path.resolve(__dirname, '../extjs/');

console.log('source:', source);
console.log('output:', output);

var stream = request
    .get(source)
    .use(progress)
    .pipe(fs.createWriteStream(zipFile));

stream.on('finish', () => {
    console.log('finished dowloading');

    var zip = new admZip(zipFile);
    console.log('start unzip');

    zip.extractAllTo(output, true);
    console.log('finished unzip');

    fs.unlink(zipFile, error => {
        error && console.log(error);
    });
});

stream.on('error', error => {
    error && console.log(error);
});
