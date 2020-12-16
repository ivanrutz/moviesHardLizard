const { read } = require('fs')
let homePage = require('./homePage')
let preguntasFrecuentes = require('./preguntasFrecuentes')
let preguntasjson = preguntasFrecuentes.leerJSON()
let sucursales = require ('./sucursales')
let movies = homePage.leerJSON()
let salas = sucursales.leerJSON()
let enCartelera = require('./enCartelera')
let cartelera = enCartelera.leerJSON()
let contactanos = require('./contacto')


//let salas = sucursales.leerJSON()


module.exports = {
    homePage : function(req,res){
        res.write('Bienvenidos a DH  Movies el mejor sitio para encontrar las mejores peliculas, incluso mucho mejor que Netflix, Cuevana y PopCorn. \n\n')
        res.write(`Total de películas en cartelera: ${movies.total_movies} \n \n`)
        res.write('Listado de películas \n \n')
       
        let orden = []
        movies.movies.forEach(movie => {
            orden.push(movie.title +'\n')
        });
        orden.sort();
        orden.forEach(function(pelis){
            res.write(`► ${pelis} \n`)
        })
        res.write('\n')
        res.write("Recordá que podés visitar las secciones:\n")
        res.write('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n')
        res.write(" → En Cartelera \n → Más Votadas \n → Sucursales \n → Contacto \n → Preguntas Frecuentes")
        res.end();      
    },
    enCartelera : function(req,res){
        res.write
        
        res.write("En cartelera\n\n")
        res.write(`Total de películas en cartelera: ${cartelera.total_movies} \n \n`)
        cartelera.movies.forEach(movie => {
            res.write('→ Titulo: ' + movie.title +'\n' + 'Reseña: ' + movie.overview + '\n\n');
        });
        res.end(); // movi el res.end(), estaba dentro del forEach; 
    },
    sucursales : function(req,res){
        //let theaters=[];
        res.write(`Nuestras Salas.\n\n`)
        res.write(`Total de salas: ${salas.total_theaters} \n\n`)
        salas.theaters.forEach(descr=>{
            res.write(`→ Nombre: ${descr.name}\n`)
            res.write(`Dirección: ${descr.address}\n`)
            res.write(`Descripción: ${descr.description}\n\n`)
        })
        //res.write(`Nuestras Salas.`)
        //res.write(`Total de salas: ${salas.total_theaters} \n`)
        //res.write(`Nombre ${theaters.name}\n`)
        //res.write(`Dirección ${theaters.addres}\n`)
        //res.write(`Descripción ${theaters.description}\n`)
        res.end()
    },
    masVotadas : function(req,res) {
        let votadas = movies.movies.filter((movie) => movie.vote_average >= 7);
        res.write(`MAS VOTADAS. \n \n`);
        res.write(`Total de Peliculas: ${votadas.length}\n \n`);

        let total = 0;
        votadas.forEach((movie) => total= total + movie.vote_average);
        let promedio = total/votadas.length;

        res.write(`Rating promedio: ${promedio.toFixed(2)}\n\n`);
        res.write(`LISTADO DE PELICULAS: \n\n`);
        
        votadas.forEach(function(movie){
            res.write(`→ ${movie.title.toUpperCase()}\n\n`);
            res.write(`Rating: ${movie.vote_average} \n\n`);
            res.write(`Reseña: ${movie.overview}\n\n`)
        });
        res.end();
    },
    contacto : function(req,res){
        res.write (contactanos())
            res.end()
    },
    preguntasfrecuentes : function(req,res){
        res.write("Preguntas frecuentes\n\n")
        preguntasjson.faqs.forEach(pf =>{
            res.write(`${pf.faq_title}\n`)
            res.write(`${pf.faq_answer}\n\n\n`)
    
        })
        res.end()
    }


  

    /*faqs : function(req,res){
        res.write('Preguntas frecuentes \n')
        res.write('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n')
        res.write(`Total de preguntas: ${preguntas.total_faqs} \n\n `)
        res.write(`Pregunta: ${preguntas.faq_title}`)
        res.end()
    } */
}
