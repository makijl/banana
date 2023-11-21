import {React,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Forms.css';
import Axios from 'axios';
import Tabla from './Tabla';


function FormS() {
  const [id,setid]=useState();
  const [Nombre, SetNombre] = useState();
  const [Apellido, SetApellido] = useState();
  const [Edad, SetEdad] = useState(0);
  const [Usuarios, setUsuarios] = useState([]);
  const [editar,setEditar]=useState(false);

  const add = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:3001/create', 
    {
     nombre:Nombre,
     apellido:Apellido,
     edad:Edad
    }).then(()=>{
        alert('Usuario registrado')
    });
  }

  const update = (e) => {
    e.preventDefault();
  
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: Nombre, 
      apellido: Apellido,
      edad: Edad
    })
    .then(response => {
      // Aquí puedo acceder a response.data
      getUsuarios();
      alert(response.data); 
    });
  }

const editarUsuario= (val) =>{
    setEditar(true);
    SetNombre(val.nombre);
    SetApellido(val.apellido);
    SetEdad(val.edad);
    setid(val.id);
}

const getUsuarios =() =>{
    Axios.get('http://localhost:3001/usuarios').then((response) =>{
        SetUsuarios(response.data);
})
     }


  return (
    <div className='forms-container'>
        <Form className='FormA'>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Coloca su Nombre" 
                value={Nombre}
                onChange={(event) => { SetNombre(event.target.value) }}/>
            <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
                type="text" 
                value={Apellido}
                placeholder="Coloca su Apellido" 
                onChange={(event) => { SetApellido(event.target.value) }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Edad</Form.Label>
            <Form.Control 
                type="int" 
                value={Edad} 
                placeholder="Coloca tu Edad"
                onChange={(event) => { SetEdad(event.target.value) }}/>
        </Form.Group>
    
        <center>
            <Button 
                type="submit" 
                className='ButtonA btn-info'
                onClick={add}>    
                Guardar
            </Button>
        </center>

        </Form>

        <Tabla usuarios={Usuarios}/>
        
    </div>
  );
}



export default FormS;