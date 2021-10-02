//data save - file
const chalk = require('chalk');
const fs = require('fs');

const db_file = "data.json";

const addGest =(name, address, number, visit_date)=>{
    const guests = loadGuests();
    const length = guests.length;
    let id = 1;
    if(length>0){
        id = guests[length-1].id + 1;
    }
    guests.push({
        id,
        name,
        address,
        number,
        visit_date,
    });   
    saveGuest(guests); 
    
    console.log(chalk.green.inverse("Data Saved..."));
}





const updateGest =(id, name, address, number, visit_date)=>{ 
    const guests = loadGuests();
    const guestIndex = guests.findIndex((guest)=> guest.id === id);
    if(guestIndex != -1){
        const guest = guests[guestIndex];

        guest.name = name ? name : guest.name;
        guest.address = address ? address : guest.address;
        guest.number = number ? number : guest.number;
        guest.visit_date = visit_date ? visit_date : guest.visit_date;
        saveGuest(guests);
        console.log(chalk.red.inverse("updated ",id));
    }else{
        console.log(chalk.blue.inverse("No Recorded Found "));
    }
}





const deleteGest =(id)=>{
    const guests = loadGuests();
    const newGuests = guests.filter((guest)=>guest.id != id);

    if(guests.length > newGuests.length){
        saveGuest(newGuests);
        console.log(chalk.red.inverse("Deleted ",id));
    }else{
        console.log(chalk.blue.inverse("No Recorded Found "));
    }
}



const readGest =(id)=>{
    const guests = loadGuests();
    const guest = guests.find((guest)=> guest.id === id);

    if(guest){
        console.log("read ", guest);
    }else{
        console.log(chalk.yellow.inverse("No Recored Found!"));
    }
    
}




const listGest =()=>{
    console.log(chalk.yellow.inverse("list All"));
    const guests = loadGuests();
    guests.forEach((guest) => {
        console.log(guest);
    });
}  





const saveGuest=(guests)=>{
    const dataJson = JSON.stringify(guests);
    fs.writeFileSync(db_file, dataJson);
}




const loadGuests =()=>{
    try{
        const dataBuffer = fs.readFileSync(db_file);
        // const dataJSON = dataBuffer.toString();
        // const data = JSON.parse(dataBuffer);
        return JSON.parse(dataBuffer);
    }catch(e){
        return [];
    }
    
}






module.exports = {
    addGest, updateGest, deleteGest, listGest, readGest,
}