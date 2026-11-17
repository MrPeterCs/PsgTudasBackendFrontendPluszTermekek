import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ProductsUpL() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [message,setMessage] = useState("")

    async function productsUpL(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/api/productsUpL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, price })
            })
            const data = await response.json()

            if (response.ok) {
                setName("")
                setDescription("")
                setPrice("")
            } else {
                data.message
            }
        } catch (error) {
            alert("Szerverhiba!")
        }
    }
    const navigate = useNavigate()
    return (
        <>
            <h1>Termék feltöltés</h1>
            {message && <p className="text-danger">{message}</p>}
            <Form onSubmit={productsUpL}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Név</Form.Label>
                <Form.Control type="text" placeholder="Termék neve" value={name} onChange={(e) => setName(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Leírása</Form.Label>
                <Form.Control type="text" placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Értéke</Form.Label>
                <Form.Control type="number" placeholder="Értéke" value={price} onChange={(e) => setPrice(e.target.value)} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Feltöltés
            </Button>
        </Form>
        </>
    )
}