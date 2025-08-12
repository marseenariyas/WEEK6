// console.log('start');
// setTimeout(()=>{
//     console.log('set timer')
// },);
// console.log('End');

 const fs=require('fs');
 const crypto=require('crypto');
 const { spawn } = require('child_process');

 const child = spawn('ls',['-lh','/usr']);

 child.stdout.on('data',chunk => {
    process.stdout.write('stdout chunk: '+chunk.toString());
 });

 child.stderr.on('data', chunk => {
    process.stderr.write('stderr chunk:' +chunk.toString());
 });

 child.on('error',err => console.error('spawn error',err));
 child.on('exit',(code,signal) => console.log('exit',code,signal));
 child.on('close',code => console.log('closed',code));

// console.log('start');
// fs.readFile('plain.txt','utf-8',(err,data)=>{
//     console.log('Read this file');
// });
// console.log('End');

console.log('start')
setTimeout(()=>{
    console.log('Set Timer')
},1000);
fs.readFile('plain.txt','utf-8',()=>{
    console.log('File Reading')
});

crypto.pbkdf2('password','salt',10000,64,'sha512',()=>{
    console.log('thread pool')
});
console.log('End');

