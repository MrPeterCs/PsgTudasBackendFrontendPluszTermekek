import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Products() {
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [selectedId, setSelectedId] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")

    async function getProducts() {
        try {
            const response = await fetch("http://localhost:3001/api/products")

            const data = await response.json()

            if (response.ok) {
                setProducts(data)
            }
            else {
                setError(data.message)
            }
        } catch (error) {
            alert("Szerverhiba!")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    function selectProducts(id) {
        setSelectedId(id)
        const product = products.find(p => String(p.id) === String(id))
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
        }
        else {
            setName("")
            setPrice("")
            setDescription("")
        }
    }

    async function saveProducts(e) {
        e.preventDefault()

        const url = selectedId ? `http://localhost:3001/api/products/${selectedId}` :
            "http://localhost:3001/api/products"

        try {
            const response = await fetch(url, {
                method: selectedId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify({ name, description, price })
            })
            const data = await response.json()
            alert(data.message)
            if (response.ok) {
                selectProducts("")
                getProducts()
            }
        } catch (error) {
            alert("Szerverhiba!")
        }
    }

    //törlées
    async function deleteProducts() {
        if (!window.confirm("Biztosan törlöd a terméket?")) return
        try {
            const response = await fetch(`http://localhost:3001/api/products/${selectedId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            alert(data.message)
            if (response.ok) {
                selectProducts("")
                getProducts()
            }
        } catch (error) {
            alert("Szerverhiba!")
        }
    }

    return (

        <>
            <div className="container mt-4">
                <h1>Termékek</h1>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h2>Termék kiválasztása</h2>
                        <Form.Select value={selectedId} onChange={(e) => selectProducts(e.target.value)}>
                            <option value="">Új termék</option>
                            {products.map(product => (<option key={product.id} value={product.id}>{product.name}</option>))}
                        </Form.Select>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h2>{selectedId ? "Termék módosítása" : "Termék hozzáadása"}</h2>
                        <Form onSubmit={saveProducts}>
                            <Form.Group className="mb-3">
                                <Form.Label>Termék neve:</Form.Label>
                                <Form.Control placeholder="Termék neve" value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Leírás:</Form.Label>
                                <Form.Control placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Értéke:</Form.Label>
                                <Form.Control min="1" step="1" type="number" placeholder="Értéke" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                {selectedId ? "Módosítás" : "Feltöltés"}
                            </Button>

                            {selectedId && (<Button type="button" variant="danger" className="ms-2" onClick={deleteProducts}>Törlés</Button>)}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}