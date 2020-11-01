import React from 'react'
import {Link} from 'react-router-dom';
import { InputGroup, Input, Button } from 'reactstrap'

export default function SearchSection (props) {
  const { onChangeSearchValue, onKeyPressSearchValue, onClickSearch } = props

  return (
    <section className='search-section'>
      <h1>Enter the movie to search</h1>
      <InputGroup>
        <Input
          placeholder=' Search movie name...'
          onChange={onChangeSearchValue}
          onKeyPress={onKeyPressSearchValue}
        />
        <Button color='success' onClick={onClickSearch}>
          Search
        </Button>
        <Link to={`/add-movie`} className='btn btn-primary'>
          Add Movie
        </Link>
      </InputGroup>
    </section>
  )
}
