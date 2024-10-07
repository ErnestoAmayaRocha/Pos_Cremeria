/* eslint-disable react/function-component-definition */

"use client";

import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddProductModal = () => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);
    const handleErrorClose = () => setErrorOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            name,
            price: parseFloat(price),
            description,
            category,
            stock: parseInt(stock, 10),
        };

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                // Reset fields after successful submission
                handleClose();
                setName('');
                setPrice('');
                setDescription('');
                setCategory('');
                setStock('');
                setSuccessOpen(true); // Open success modal
            } else {
                setErrorOpen(true); // Open error modal
            }
        } catch (error) {
            setErrorOpen(true); // Open error modal
        }
    };

    return (
        <>
            <Button 
                startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} 
                variant="contained" 
                onClick={handleOpen}
            >
                Agregar Producto
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2>Agregar Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            required
                        />
                        <TextField
                            label="Precio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={price}
                            onChange={(e) => {setPrice(e.target.value)}}
                            required
                        />
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                            required
                        />
                        <TextField
                            label="Categoría"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={category}
                            onChange={(e) => {setCategory(e.target.value)}}
                            required
                        />
                        <TextField
                            label="Stock"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={stock}
                            onChange={(e) => {setStock(e.target.value)}}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Enviar
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Snackbar para éxito */}
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
                
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Producto agregado con éxito.
                </Alert>
            </Snackbar>

            {/* Snackbar para error */}
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al agregar el producto.
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddProductModal;
