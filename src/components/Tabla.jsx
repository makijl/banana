import {React, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import '../css/Tabla.css';


function Tabla({usuarios}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
  
    const openEditModal = (user) => {
      setUserToEdit(user);
      setModalOpen(true);
    }

    const updateUser = (updatedUser) => {
        console.log('Updating user:', updatedUser);
    
        const updatedUsuarios = usuarios.map((u) => {
          if (u.id === updatedUser.id) {
            return updatedUser;
          }
          return u;
        });
        SetUsuarios(updatedUsuarios);
      };
    
    return (
      <>
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    
                </tr>
            </thead>
            <tbody>
            {usuarios.map(usuario => (
                <tr>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.edad}</td> 
                <td><Button onClick={() => openEditModal(usuario)}>Editar</Button></td>
                <td><Button onClick={() => openEditModal(usuario)}>Eliminar</Button></td> 
                </tr>
            ))}
            </tbody>
        </Table>

        {modalOpen && (
        <Modal>
          <EditUserForm
            user={userToEdit}
            onClose={() => setModalOpen(false)}
            onUpdate={updateUser}
          />
        </Modal>
        )}
     </>
    )
  }

const EditUserForm = ({ user, onClose, onUpdate }) => {
    const [name, setName] = useState(user.nombre);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const updatedUser = {
        ...user,
        nombre: name,
      };
  
      onUpdate(updatedUser);
      onClose();
    };
  
    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control    
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Group>

        <Button
            variant="primary"
            type="submit">Guardar
        </Button>

      </Form>
    );
  };
  
export default Tabla;