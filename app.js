
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  title : {
    describe : "Ttile of a note",
    demand : true,
    alias : 't'
  }
};

const bodyOptions = {
  body : {
    describe : "Body of a note",
    demand : true,
    alias : 'b'
  }
};

const argv = yargs
  .command('add','Add a new  note',{
    title : titleOptions.title,
    body : bodyOptions.body
  })
  .command('list','List all notes')
  .command('read','Reading a note',{
    title : titleOptions.title
  })
  .command('remove','Removing a note',{
    title : titleOptions.title
  })
  .help()
  .argv; 
var command = argv._[0];

if (command === 'add') {
 var note = notes.addNote(argv.title,argv.body);
 if(note){
   notes.logNote(note);
 }else{
   console.log("Note already exists");
 }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log('Printing ',allNotes.length,'Notes');
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if(note){
    notes.logNote(note);
  }else{
    console.log('Note Not found');
  }
} else if (command === 'remove') {
  var removeNote = notes.removeNote(argv.title);
  var message = removeNote ? " Note Deleted" : "Note not found";
  console.log(message);

} else {
  console.log('Command not recognized');
}
