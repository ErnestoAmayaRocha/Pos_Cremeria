'use client';

import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Card, TextField } from '@mui/material';
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
const quickFilterText = 'new filter text';
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
  ];

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`); 
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      const formattedProducts = data.body.products.map((product: any) => ({
        id: product._id,
        name: product.name,
        price: `${"$"+product.price}`,
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
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card sx={{  padding: '1.5rem' }}>
      <Card  sx={{ p: 2,   width:'100%' }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          onChange={event => setQuickFilterText(event.target.value)}
          placeholder="Buscar producto"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '100%' }}
        />
      </Card>
      <div className="ag-theme-alpine" style={{ height: '550px', width: '100%', marginTop:'1rem' }}>
        <AgGridReact
          quickFilterText={quickFilterText}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </Card>
  );
}
