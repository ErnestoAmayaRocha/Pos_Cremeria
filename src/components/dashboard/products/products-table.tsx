'use client';

import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Swal from 'sweetalert2';

import { Card, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  createdAt: Date;
}

export function ProductsTable(): React.JSX.Element {
  const [rowData, setRowData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quickFilterText, setQuickFilterText] = React.useState('');

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Nombre', field: 'name', sortable: true, filter: true },
    { headerName: 'Precio', field: 'price', sortable: true, filter: true },
    { headerName: 'Descripcion', field: 'description', sortable: true, filter: true },
    { headerName: 'Categoria', field: 'category', sortable: true, filter: true },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true },
    {
      headerName: 'Fecha Creacion',
      field: 'createdAt',
      sortable: true,
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      headerName: 'Opciones',
      field: 'options',
      autoHeight: true,
      autoWidth: true,
      cellRenderer: (params) => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
          <Button variant="outlined" color="primary" onClick={() => handleEdit(params.data)}>
            Editar
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDelete(params.data.id)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (product: Product) => {
    const { name, price, description, category, stock } = product;
    const formattedPrice = price.replace(/[^0-9.]/g, '');  // Remueve cualquier símbolo no numérico
    Swal.fire({
      title: 'Editar Producto',
      html:  `<input id="swal-input1" class="swal2-input" value="${name}" placeholder="Nombre">` +
      `<input id="swal-input2" class="swal2-input" type="number" value="${formattedPrice}" placeholder="Precio">` +
      `<input id="swal-input3" class="swal2-input" value="${description}" placeholder="Descripción">` +
      `<input id="swal-input4" class="swal2-input" value="${category}" placeholder="Categoría">` +
      `<input id="swal-input5" class="swal2-input" type="number" value="${stock}" placeholder="Stock">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          name: (document.getElementById('swal-input1') as HTMLInputElement).value,
          price: parseFloat((document.getElementById('swal-input2') as HTMLInputElement).value),
          description: (document.getElementById('swal-input3') as HTMLInputElement).value,
          category: (document.getElementById('swal-input4') as HTMLInputElement).value,
          stock: parseInt((document.getElementById('swal-input5') as HTMLInputElement).value, 10),
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedFields = result.value;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
          });
  
          const data = await response.json();
          if (!response.ok) {
            console.error('Error al actualizar el producto:', data);
            throw new Error(data.message || 'Error desconocido al actualizar el producto');
          }
  
          Swal.fire(
            'Actualizado',
            'El producto ha sido actualizado con éxito.',
            'success'
          );
  
          await fetchProducts(); // Recargar productos
        } catch (error) {
          console.error('Ocurrió un error:', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al actualizar el producto. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      }
    });
  };
  
  
  
  

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Hacer la petición DELETE al endpoint
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }
  
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado con éxito.',
            'success'
          );
  
          // Después de eliminar el producto, podrías querer actualizar la tabla de productos
          await fetchProducts(); // Vuelve a cargar los productos para reflejar los cambios
        } catch (error) {
          Swal.fire(
            'Error',
            'Ocurrió un error al eliminar el producto. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      }
    });
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      const formattedProducts = data.body.products.map((product: any) => ({
        id: product._id,
        name: product.name,
        price: `${"$" + product.price}`,
        description: product.description,
        category: product.category,
        stock: product.stock,
        createdAt: product.createdAt,
      }));
      setRowData(formattedProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    void fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card sx={{ padding: '1.5rem' }}>
      <Card sx={{ p: 2, width: '100%' }}>
        <OutlinedInput
          fullWidth
          onChange={(event) => { setQuickFilterText(event.target.value); }}
          placeholder="Buscar producto"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '100%' }}
        />
      </Card>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }}
        onClick={fetchProducts}
      >
        Recargar
      </Button>

      <div className="ag-theme-alpine" style={{ height: '550px', width: '100%', marginTop: '1rem' }}>
        <AgGridReact
          quickFilterText={quickFilterText}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>
    </Card>
  );
}
