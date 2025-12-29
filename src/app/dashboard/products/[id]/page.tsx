'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Correct imports
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Chip,
  Rating,
  CircularProgress 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export default function ProductDetailPage() {
  const params = useParams(); // Get the ID from the URL
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Unwrap params to be safe
    const id = params?.id;

    if (id) {
      axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [params]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (!product) return <Typography sx={{ p: 4 }}>Product not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.back()} 
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column: Image */}
          <Grid size={{ xs: 12, md: 6 }}>

            <Box 
              sx={{ 
                height: 400, 
                width: '100%', 
                bgcolor: '#f9f9f9', 
                borderRadius: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                p: 2
              }}
            >
              <Box 
                component="img"
                src={product.thumbnail}
                alt={product.title}
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>

          {/* Right Column: Details */}
          <Grid size={{ xs: 12, md: 6 }}>

            <Box sx={{ mb: 2 }}>
              <Chip label={product.category} color="primary" size="small" sx={{ mb: 1, textTransform: 'uppercase' }} />
              <Typography variant="h4" gutterBottom>{product.title}</Typography>
              <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                ${product.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                 <Rating value={product.rating} precision={0.1} readOnly />
                 <Typography variant="body2" sx={{ ml: 1 }}>({product.rating} / 5)</Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {product.description}
            </Typography>

            <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Product Specs:</Typography>
              <Grid container>
              <Grid size={6}>
                <Typography variant="body2">Brand:</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2">{product.brand}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="body2">SKU:</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2">{product.sku}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="body2">Stock:</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2">{product.stock} units</Typography>
              </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}