//console input
const { argv } = require("process");
const { command } = require("yargs");
const yargs = require("yargs");
const db = require("./gestdb.js");

// console.log(process.argv);
yargs.version("1.1.2");

yargs.command({
    command: 'add',
    describe: 'Add a gest',
    builder: {
        name:{
            describe:"Name",
            demandOption:true,
            type: "string"
        },
        address:{
            describe:"Address",
            type: "string"
        },
        number:{
            describe:"Contact number",
            type:"number",
        },
        visit_date:{
            describe:"Visit Date",
            demandOption:true,
            type:"string",
        }
    },
    handler(argv){
        db.addGest(argv.name, argv.address, argv.number, argv.visit_date);
    }
    // handler: function(argv){
    //     db.addGest();
    //     console.log("name=  ", argv.name);
    //     console.log("Address=  " , argv.address);
    // }
});


yargs.command({
    command: 'update',
    describe: 'Update a gest',
    builder: {
        id:{
            describe:"Id",
            demandOption:true,
            type: "number"
        },
        name:{
            describe:"Name",
            type: "string"
        },
        address:{
            describe:"Address",
            type: "string"
        },
        number:{
            describe:"Contact number",
            type:"number",
        },
        visit_date:{
            describe:"Visit Date",
            type:"string",
        }
    },
    handler(argv){
        db.updateGest(argv.id, argv.name, argv.address, argv.number, argv.visit_date);
    }
  
});


yargs.command({
    command: 'delete',
    describe: 'delete a gest',
    builder: {
        id:{
            describe:"Id",
            demandOption:true,
            type: "number"
        },
    },
    handler(argv){
        db.deleteGest(argv.id);
    }
  
});


yargs.command({
    command: 'read',
    describe: 'read a gest',
    builder: {
        id:{
            describe:"Id",
            type: "number"
        },
    },
    handler(argv){
        db.readGest(argv.id);
    }
  
});


yargs.command({
    command: 'list',
    describe: 'List a gest',

    handler(){
        db.listGest();
    }
  
});



// console.log(yargs.argv);
yargs.parse();