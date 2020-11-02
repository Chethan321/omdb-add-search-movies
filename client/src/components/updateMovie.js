import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useHistory } from 'react-router-dom'
import { Input, Container } from 'reactstrap'

const UpdateMovie = ({data, cancel}) => {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [poster, setPoster] = useState('')

  const [type, setType] = useState('')


  useEffect(()=>{

    setTitle(data.title);
    setYear(data.year);
    setType(data.type);
    setPoster(data.poster)
  },[])

  const history = useHistory();

  function onClickUpdate () {
    axios
      .put(`http://localhost:5000/updateMovie`, {
          _id: data._id,
        title,
        year,
        poster,
        imdbID: data.imdbID,
        type
      })
      .then(res => {
        alert(`${title} Movie has updated`)
      })
    
  }

  return (
    <Container>
<Modal isOpen={true} toggle={()=>{cancel(null)}} className={"className"}>
        <ModalHeader toggle={()=>{cancel(null)}}>Update the Movie details</ModalHeader>
        <ModalBody>
        <section> 
        
          <p>Enter the movie name</p>

      <Input
        placeholder='Movie Name'
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />
      <br />
      <p>Enter the Year</p>
      <Input
        placeholder='Enter The Year'
        value={year}
        onChange={e => {
          setYear(e.target.value)
        }}
      />
     
    
      <br />
      <p>Enter the Type</p>
      <Input
        placeholder='Enter The type'
        value={type}
        onChange={e => {
          setType(e.target.value)
        }}
      />
      <br />
      <p>Enter the Poster Link</p>

      <Input
        placeholder='Enter The Poster link'
        value={poster}
        onChange={e => {
          setPoster(e.target.value)
        }}
      />
      <br />
    
    </section>
        </ModalBody>
        <ModalFooter>
        <Button color='success' onClick={onClickUpdate}>
        update Data
      </Button>
      <Button
        type='button'
        className='btn btn-danger'
        onClick={() => cancel(null)}
      >
        Go Back
      </Button>
        </ModalFooter>
      </Modal>


   
    </Container>
  )
}


export default UpdateMovie