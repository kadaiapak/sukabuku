import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')
     
    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={searchHandler} inline>
            <Form.Control 
                type='text' 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder='Search Product...'
                className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' className='p-2' variant='outline-light'>Search</Button>
        </Form>
    )
}

export default SearchBox
