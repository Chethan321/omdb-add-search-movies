import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  CardFooter
} from 'reactstrap'
import SearchSection from './components/SearchSection'
import AddMovie from './components/AddMovie'
import UpdateMovie from './components/updateMovie'

import "./styles.css"


export default function App () {
  const [data, setData] = useState({});
  const [editId, setEditId] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  function onChangeSearchValue (event) {
    const searchValue = event.target.value

    setSearchValue(searchValue)
  }

  function onKeyPressSearchValue (event) {
    if (event.charCode === 13) {
      fetchMovies()
    }
  }

  function onClickSearch () {
    fetchMovies()
  }

  function fetchMovies () {
    fetch(`http://localhost:5000/getMovies/${searchValue}`)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error))
  }

  function deleteMovie(imbdID){
    const confirm = window.confirm("Are you sure you want to delete the movie ?");

    if(confirm){
      fetch(`http://localhost:5000/delete`,{

      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({imbdID})
      })
      .then(response => response.json())
      .then(result => {
        setData(data.filter(movie => movie.imdbID !== imbdID))
      
        alert(result.message)})
      .catch(error => console.log('error', error))
    }
  }

  return (
    <Container style={{ marginTop: '60px' }}>
      <SearchSection
        onChangeSearchValue={onChangeSearchValue}
        onKeyPressSearchValue={onKeyPressSearchValue}
        onClickSearch={onClickSearch}
      />

      <br />
      <section className='movies-section'>
        <Row>
          {data.length > 0 &&
            data.length &&
            data.map(movie => {
              return (
                <Col md={2} key={movie.imdbID}>
                  <Card>
                    <CardImg
                      top
                      width='100%'
                      src={movie.poster}
                      alt='Card image cap'
                    />
                    <CardBody>
                      <CardTitle>{movie.title}</CardTitle>
                      <CardText>
                        {movie.year}-{movie.type}
                      </CardText>

                      <div className= "buttons">
                      <Link
                        to={`/booking-page/${movie.imdbID}`}
                        className='btn btn-primary'
                      >
                        Book Now
                      </Link> 
                      <button
                      
                        className='btn btn-danger'
                        onClick={()=>deleteMovie(movie.imdbID)}
                      >
                        delete 
                      </button> 
                      <button
                       onClick={()=>setEditId(movie.imdbID)}
                        className='btn btn-success'
                      >
                        update 
                      </button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </section>

      {editId &&
        <UpdateMovie data={data[0]} cancel={setEditId}/>
      }
    </Container>
  )
}
