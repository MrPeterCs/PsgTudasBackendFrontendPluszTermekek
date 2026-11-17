
import { useState, useEffect } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"

export default function Home() {
    const [products, setProducts] = useState([])

    async function loadProducts() {
        const response = await fetch("http://localhost:3001/api/products")
        const data = await response.json()

        setProducts(data)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className="container text-center mt-4">
            <h2>Termékek</h2>
            <Row className="g-4 mt-2">
                {products.map((product) => (
                    <Col md={4} lg={4} key={product.id}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>
                                    {product.name}
                                </Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    {product.price} Ft
                                </Card.Text>
                                <Button variant="primary">
                                    Megtekintés
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
