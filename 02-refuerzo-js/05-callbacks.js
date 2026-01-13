


setTimeout(()=>{
    console.log("Hola mundo")
},1500)

const getUsuarioById = (id, callback)=>{
    const usuario =  {
        id,
        nombre: "luciano"
    }

    setTimeout(()=>{
        return callback(usuario);
    },1500)
}

getUsuarioById(10, (usuario) => console.log(`${usuario.id} ${usuario.nombre}`));