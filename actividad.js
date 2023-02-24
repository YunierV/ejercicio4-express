const express = require('express')
const app = express()

const fs = require('fs');

const host = "localhost"
const port = 8000

//la base de datos tiene que contener desde un principio [], pero ya se quedan guardados los datos sin reiniciarsen

const leerJson=fs.readFileSync('database.json','utf-8')
let productos=JSON.parse(leerJson);


app.use(express.urlencoded()) 

app.use(express.json())

//mostrar
app.get('/mostrar',(req,res)=>{    
    const dato= fs.readFileSync('./database.json','utf-8')
    const jsonDato=JSON.parse(dato)
    res.send(jsonDato)
})

//guardar
app.post('/agregar',(req,res)=>{
    const {nombre,precio} = req.body

    if(!nombre || !precio){
        res.status(400).send("Debe rellenar todos los datos para guardar");
        return;
    }
    
    let producto={id: productos.length +1, nombre, precio};

    productos.push(producto)
    const jsonProducto = JSON.stringify(productos)
    
    fs.writeFileSync('database.json',jsonProducto,'utf-8')
    res.send('producto agregado')
    console.log('agregado')
})

//appendFileSync agregar mas contenido sin eliminar el ya existente

//mostrar uno
app.get('/:id',(req,res)=>{
    const id= req.params.id
    const busca=productos.find((producto)=>producto.id==id)

    res.send(busca)
})

//eliminar
app.delete('/eliminar/:id',(req,res)=>{
    const id= req.params.id

    productos=productos.filter((producto)=>producto.id !=id)

    const jsonProducto =JSON.stringify(productos);

    fs.writeFileSync('database.json',jsonProducto,'utf-8')

    res.send(`el producto con la id: ${id}`)
})

app.put('/editar/:id',(req,res)=>{
    const id = req.params.id
    const {nombre,precio} = req.body

    const producto = productos.find((producto)=>producto.id == id)

    if(nombre) producto.nombre = nombre
    if(precio) producto.precio = precio

    const jsonProducto =JSON.stringify(productos);

    fs.writeFileSync('database.json',jsonProducto,'utf-8')

    res.send(`el usuario con la id: ${id} se actualizo`)
})

app.use((req,res)=>{
    res.status(404).send("ERROR 404")
})

app.listen(port,host,()=>{
    console.log(`el link de acceso es http://${host}:${port}`)
    
})

