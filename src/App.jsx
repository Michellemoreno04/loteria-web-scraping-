import React,{ useState,useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { lazy, Suspense } from 'react'; // para cargar loding




// Obtener la fecha actual
const fechaActual = new Date();

// Obtener el día, mes y año
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
const año = fechaActual.getFullYear();


// Formatear la fecha como desees
const fechaFormateada = `${dia}/${mes}/${año}`;

const Ap = lazy(()=> import(App))

function App() {
  const [numeros, setNumeros] = useState({});

  const obtenerData = async ()=>{
    const respuesta = await axios.get('http://localhost:3000/datos')
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener datos:', error);
    })
    setNumeros(respuesta)
    

  }
// hablar
  function habla(index){

    const synth = window.speechSynthesis //todo esto debe de ir en una funcion para que hable
  const utterThis = new SpeechSynthesisUtterance(numeros[index])
  utterThis.lang = 'es-ES'; //lenguage
  utterThis.pitch = 1.1; // esto cambia la voz
  utterThis.rate = 0.4; // velocidad
  synth.speak(utterThis)
  
  }

  return (
    
<div>

<div className='container'>
<h1>Loteria nacional</h1>
 </div>
 <div className='resultados-anteriores'>
 Resultados anteriores {fechaFormateada}
 </div>
 <div className='nacional'>
  <h2>Nacional</h2>
 <div className="loterias-visible" >
 Juega + pega + {numeros[0]} 
<br /> <button className='btn-reproducir' onClick={()=> habla(0)}>Reproducir</button>

 </div>
 <div className="loterias-visible" >
 Gana Mas: {numeros[1]}
 <button className='btn-reproducir'onClick={()=> habla(1)}>Reproducir</button>

 </div> <div className="loterias-visible" >
 Nacional: {numeros[2]}
 <button className='btn-reproducir' onClick={()=> habla(2)}>Reproducir</button>

 </div>
 </div>
  
 <div className='real'>
  <h2>Real</h2>
 <div className="loterias-visible" >
 Quiniela real: {numeros[8]}
 <button className='btn-reproducir' onClick={()=> habla(8)}>Reproducir</button>

 </div>
 <div className="loterias-visible" >
 Loto pool: {numeros[9]}
 <button className='btn-reproducir' onClick={()=> habla(9)}>Reproducir</button>

 </div>
  <div className="loterias-visible" >
 Loto Real: {numeros[10]}
 <button className='btn-reproducir' onClick={()=> habla(10)}>Reproducir</button>

 </div>
   
 <div className='primera'>
  <h2>Primera</h2>
 <div className="loterias-visible" >
 La Primera: {numeros[19]}
 <button className='btn-reproducir' onClick={()=> habla(19)}>Reproducir</button>

 </div>
 <div className="loterias-visible" >
 Primera Noche: {numeros[20]}
 <button className='btn-reproducir' onClick={()=> habla(20)}>Reproducir</button>

 </div>
  <div className="loterias-visible" >
 Loto 5: {numeros[21]}
 <button className='btn-reproducir' onClick={()=> habla(21)}>Reproducir</button>

 </div>
 </div>
 </div>
 <hr />
 <p>Obten aqui los resultados de la loteria nacional actualizado y el tiempo real <br />
 para que puedas ver los numeros que salierion a la hora indicada</p> 

 
 <button className='btn-obtener' onClick={obtenerData}>Obtener</button>
 

</div>

  )
  
}

export default App
