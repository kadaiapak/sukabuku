import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import {listProductDetails, reviewProductAction} from '../actions/productActions'
import { REVIEW_PRODUCT_RESET } from '../constants/productConstants'

const ProductScreen = ({history, match}) => {
   const productId = match.params.id

    const dispatch = useDispatch()

    // kelompok useState
    const [qty, setQty ] = useState(1)
    const [comment, setComment ] = useState("")
    const [rating,setRating] = useState(4)

    // mengambil data dari detail product reducer
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    // mengambil data dari user yang login
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // mengambil data dari review product reducer
    const productReview = useSelector(state => state.productReview)
    const { loading:loadingReview, success:successReview, error:errorReview } = productReview
    
    useEffect(()=> {
        if(successReview){
            dispatch({
                type : REVIEW_PRODUCT_RESET
            })
        alert('Review submitted')
        setRating(0)
        setComment('')
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const reviewSubmit = (e) => {
        e.preventDefault()

        const review = {
            rating,
            comment
        }
        dispatch(reviewProductAction(productId, review))
    }
    return (
        <>
        <Link className="btn btn-light my-3" to="/">
            Go Back
        </Link>
        {loadingReview && <Loader />}
        {errorReview && <Message variant='danger'>{errorReview}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
          <> 
           <Row className='mb-4'>
            <Col md={6}>
                    <Image src={product.image} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush" >
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price : ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description : {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price:
                                </Col>
                                <Col>
                                <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Stock:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Qty :
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e)=> setQty(e.target.value)} >
                                            {[...Array(product.countInStock).keys()].map(x=> (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button onClick={addToCartHandler} className="btn-block" 
                            type="button" disabled={product.countInStock === 0}>Add to cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6} >
            {userInfo && (
                <Form onSubmit={reviewSubmit} className='mb-4'>
                    <h2>Review</h2>
                    <Form.Group controlId='rating'>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select Rating</option>
                        <option value='1'>1 - Bad</option>
                        <option value='2'>2 - Not too bad</option>
                        <option value='3'>3 - Ok</option>
                        <option value='4'>4 - Good</option>
                        <option value='5'>5 - Perfect</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                        <Form.Control 
                            as='textarea'
                            rows={3}
                            placeholder='Write down a review'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Form>
            )}
            <ListGroup variant='flush' className='m-10'>
                <h2>See the reviews</h2>
                {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col md={4}>
                                        <div className='div__image_profile_review'>
                                            <Image src={'/images/nophoto.png'} roundedCircle fluid/>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <p className='mb-0'>
                                            <strong>{review.name}</strong>
                                        </p>
                                        <p className='p__date'>{review.createdAt.substring(0,10)}</p>
                                    </Col>
                                </Row>
                                <div>
                                </div>
                            </Col>
                            <Col md={8}>
                                <Rating value={review.rating}/>
                                <p>{review.comment}</p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
            </ListGroup>
        </Col>
        </Row>
        </>
        )}
        </>
    )
}

export default ProductScreen
