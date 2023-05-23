import fs from 'fs';

class userManager {
    constructor(path) {
        this.path = path;
    }

    post = async(user) => {
        if (fs.existsSync(`${this.path}users.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}users.json`, "utf-8"));
            let lastProduct = await objects.pop()
            objects.push(lastProduct);
            user.id = await lastProduct.id+1;
    
            objects.push(user);
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}users.json`, objects);
            return 'User added';
        } else {
            user.id = 0;
            let objects = [user];
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}users.json`, objects);
            return 'User added';
        }
    }

    getOne = async(search) => {
        if (fs.existsSync(`${this.path}users.json`)) {
            let users = await JSON.parse(fs.readFileSync(`${this.path}users.json`, "utf-8"));
            let user;

            if (search.name) user = users.find(element => element.name == search.name);
            if (search.category) user = users.find(element => element.category == search.category);
            if (search.price) user = users.find(element => element.price == search.price);
            if (user == undefined) {
                return 'No se encuentra ningun usuario con ese ID';
            } else {
                return user;
            }
        } else {
            return false
        }
    }
}

export default userManager;