import React from 'react'
import {Container, Row, Cel, Col} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                         Copyright &copy; SukaBuku
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
