import fs from 'fs';

export default class Ticket {
    constructor(path) {
        this.path = path;
    }

    get = async() => {
        if (fs.existsSync(`${this.path}tickets.json`)) { 
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            return objects;
        } else { 
            return [];
        }
    }

    getOne = async(id) => {
        if (fs.existsSync(`${this.path}tickets.json`)) { 
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            let ticket = objects.find(element => element.id == id);
            return ticket
        } else { 
            return [];
        }
    }

    post = async ticket => {
        if (fs.existsSync(`${this.path}tickets.json`)) { 
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            let lastTicket = await objects.pop()
            objects.push(lastTicket);
            ticket.id = await lastProduct.id+1;
    
            objects.push(ticket);
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}tickets.json`, objects);
            return 'Ticket added';
        } else { 
            ticket.id = 0;
            let objects = [ticket];
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}tickets.json`, objects);
            return 'Ticket added';
        }
    }

    delete = async(id) => {
        if (fs.existsSync(`${this.path}tickets.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);

            if (position === -1) {
                return 'Ticket not found';
            } else {
                objects.splice(position, 1);
                if (objects.length == 0) {
                    fs.unlinkSync(`${this.path}tickets.json`, objects);
                } else {
                    objects = JSON.stringify(objects);
                    fs.writeFileSync(`${this.path}tickets.json`, objects);
                }
                return 'Ticket has been deleted'
            }
        } else {
            return false;
        }
    }
}