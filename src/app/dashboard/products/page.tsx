import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import AddProductModal from './AddProductModal'; // Asegúrate de la ruta correcta

import { config } from '@/config';


import { ProductsTable } from '@/components/dashboard/products/products-table';


export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {
  


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Productos</Typography>
         
        </Stack>
        <div>
        <AddProductModal />
        </div>
      </Stack>
    
      <ProductsTable
       
      />
    </Stack>
  );
}


