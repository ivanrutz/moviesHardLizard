const fs = require('fs')

module.exports = {
    bd : './data/theaters.json',
    leerJSON : function(){
        return JSON.parse(fs.readFileSync(this.bd,'utf-8'));
    }
}