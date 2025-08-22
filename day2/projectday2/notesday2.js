//readFile()
// used to read content of a file
fs.readFile(path,encoding,callback)

const fs=require('fs')
fs.readFile('file.txt','utf8',(err,data)=>{
  if(err){
    console.log('error reading file',err);
    return;
  }
  console.log('file content',data)
});

//appendFile()
//add new content at the end of a file(without removing existing content)
//fs.appendFile(path,data,callback)
fs.appendFile('file.txt','\nNew line added',(err)=>{
  if(err){
    console.log('error appending file',err);
    return;
  }
  console.log('new content added ',dta);
});

//writeFile()
//create a new file or overwrite an existing file with new content.
//fs.writeFile(path,data,callback)
fs.writeFile('example.txt','Hello Marseena',(err)=>{
  if(err){
    console.log('error writing file',err);
    return;
  }
  console.log('File Created and data writtern ')
});

//fs.readdir()--------
//   reads the contents of a directory(folders+files inside it)
//   to get a list of files/folders--eg: show uploaded files,display logs,or scan directories
//fs.readdir(path,callback)
fs.readdir('.',(err,files)=>{
  if(err){
    console.error('error reading directory',err);
    return;
  }
  console.log('files in directories',files)
});

//fs.mkdir()------
//creates a new directory(folder)
//to organise files--eg:make a folder for each users uploads or store logs in logs/
//fs.mkdir(path,callback)
fs.mkdir('myFolder',(err)=>{
  if(err){
    console.error('error creating folder',err);
    return
  }
  console.log('folder created successfully')
})






//readFile----->Read user data,settingor template files.
//appendFile--->Write logs store history,keep activity records.
//writeFile---->Save user profile data in a file,e=write config files,store reports or generated output







// STREAM
// A stream is a event emitting object used to handle data bit by bit instead of all at once
// it's useful for reading or writing large files or data efficiently

// there are 4 types of streams--

// Readable – streams you can read from (e.g., fs.createReadStream)
// Writable – streams you can write to (e.g., fs.createWriteStream)
// Duplex – streams that are both readable and writable (e.g., TCP socket)
// Transform – duplex streams that can modify data while reading/writing (e.g., compression, encryption)

// Why would we use streams over other methods like fs.readFile?
// bcz fs.readFile() loads the entire file into memory which is inefficient for large files
// Streams process data chunk by chunk, using less memory and allowing faster start times

// EVENT EMITTER
// is a built-in module that lets objects emit events and listen for them
// and we listen to them using .on()

// data - A chunk of data is available
// end - end event fires after all the chunks are sent — it tells us the file is fully read
// error - Something went wrong
// close - The stream is closed


//fs.createReadStream?
//it's a method from the fs module that lets us read a file in chunks instead of loading the whole file into memory

//Syntax
const fs = require('fs');
//parameters- path,encoding,highWaterMark(size of each chunk in bytes)
const stream = fs.createReadStream('filename.txt', { encoding: 'utf8', highWaterMark:16 });//read 16 bytes

readStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);  // logs parts of file
});

readStream.on('end',() => {
  console.log('Done reading file.');
});

readStream.on('error',(err) => {
  console.error('Error:', err);
});

//default chunk size is-- 64kb


//system stores data in binary FormData(01001010), using utf-8 we convert that into readable form
//A Buffer is a built-in object that is used to store and manipulate binary data directly — before converting it to readable strings using encodings like UTF-8


//Reading without utf8:
const readStream = fs.createReadStream('example.txt');

readStream.on('data', (chunk) => {
  console.log('Binary Buffer:', chunk);         // raw buffer
  console.log('As string:', chunk.toString());  // convert manually
});


//CreateWriteStream
//its a method used to write data to a file in chunks

// .write() - writes chunks(add chunks)
// .end() - closes the stream

//writeStream.write('Hello, ')
// writeStream.write('world!\n')
// writeStream.end('This is the end.')

//events of createwritestream:

//finish - All data has been written and the stream is closed
// error - An error occurred while writing
// close - The stream is closed (after finish or manual close)

const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello World!\n');
writeStream.write('Writing some data...\n');
writeStream.end('Done!\n'); // triggers finish event

// Events
writeStream.on('finish', () => {
  console.log('Writing completed.');
});

writeStream.on('error', (err) => {
  console.error('Error:', err);
});

writeStream.on('close', () => {
  console.log('Stream closed.');
});

//PIPE()
//the .pipe() method connects a readable stream
//  to a writable stream so that data flows automatically from one to the other
//we don’t need to manually listen to data and write it 

const fs = require('fs');

const readStreamm = fs.createReadStream('input.txt');
const writeStreamm = fs.createWriteStream('output.txt');

readStreamm.pipe(writeStreamm);

//this reads input.txt chunk by chunk and writes it into output.txt

readStream.on('data', chunk => writeStream.write(chunk));
//.pipe() handles this automatically(bts)

//other than utf-8, we have--
// 'ascii'	Basic English characters only (0–127)
// 'hex'	Represents binary data as hexadecimal string
