const alumndiv = document.getElementById('Alumnos')
const search = document.getElementById('search')

search.addEventListener('keyup',async()=>{
    if(search.value !== ""){
        let id = search.value
        await RenderAlumn(id);
    }else{
        alumndiv.innerHTML = ""
    }
})

const obtenerAlumnos = async (id) =>{
    //development server api source
    //const response = await fetch(`http://localhost:84/Principal/ConsultarSQLServer?Matricula=${id}`)
    //azure API REST with AZURE SQL server database
    const response = await fetch(`https://apirestsqlserver20211019194547.azurewebsites.net/Principal/ConsultarSQLServer?Matricula=${id}`)
    const alumnos = await response.json();
    return alumnos;
}

const RenderAlumn = async(id) =>{
    const alumno = await obtenerAlumnos(id);
    if(alumno.length>0){
        alumno.forEach(dato => {
            alumndiv.innerHTML = `
            <h2>Matricula: ${dato.matricula}</h2>
            <p>Nombre: ${dato.nombre}</p>
            <p>Carrera: ${dato.carrera}</p>
            <p>Semestre: ${dato.semestre}</p>
            <p>Saldo: ${dato.saldo}</p>
            `
        });  
    }else{
        alumndiv.innerHTML =`<div class="card"> <h1>No se encontro el registro<h1> </div>`
    }
}

const Nombre = document.getElementById('txtNombre')
const Carrera = document.getElementById('txtCarrera')
const Semestre = document.getElementById('txtSemestre')
const Saldo = document.getElementById('txtSaldo')
const alertdiv = document.getElementById('alert')

const btnGuardar = document.getElementById('btnGuardar')

btnGuardar.addEventListener('click',async(e)=>{
    e.preventDefault()
    const status = await guardarAlumno(Nombre.value,Carrera.value,Semestre.value,Saldo.value)
    if(status.ok){
        alertdiv.classList.remove('display-none')
        alertdiv.classList.add('alert-success')
        alertdiv.innerText="Guardado"
    }else{
        alertdiv.classList.remove('display-none')
        alertdiv.classList.add('alert-error')
        alertdiv.innerText="Error al guardar"
    }
})

const guardarAlumno = async(nombre,carrera,semestre,saldo) =>{
    //development server source
    //let url = `http://localhost:84/Principal/AlmacenarSQLServer?Nombre=${nombre}&Carrera=${carrera}&Semestre=${semestre}&Saldo=${saldo}`
    //azure API REST with AZURE SQL server database
    let url = `https://apirestsqlserver20211019194547.azurewebsites.net/Principal/AlmacenarSQLServer?Nombre=${nombre}&Carrera=${carrera}&Semestre=${semestre}&Saldo=${saldo}`;
    const response = await fetch(url)
    const result = await response
    return result
}




