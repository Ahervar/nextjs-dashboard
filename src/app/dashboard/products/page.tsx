'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Grid, 
  Card, 
  CardMedia,
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  TextField, 
  Pagination, 
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Stack 
} from '@mui/material';
import Link from 'next/link';

export default function ProductsPage() {
  const { products, fetchProducts, totalProducts, isProductsLoading } = useStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categoriesList, setCategoriesList] = useState<any[]>([]); 
  
  const limit = 6;

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategoriesList(data))
      .catch(err => console.error("Category fetch failed", err));
  }, []);

  useEffect(() => {
    const skip = (page - 1) * limit;
    const timeoutId = setTimeout(() => {
      fetchProducts(limit, skip, search, category);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, search, category, fetchProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCategory(''); 
    setPage(1);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    setSearch('');
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Products
      </Typography>
      
      {/* Filters */}
      <Stack 
        spacing={2} 
        direction={{ xs: 'column', md: 'row' }} 
        sx={{ mb: 4 }}
      >
        <TextField 
          label="Search Products" 
          variant="outlined" 
          fullWidth
          value={search}
          onChange={handleSearch} 
          sx={{ bgcolor: 'white' }}
        />
        <FormControl fullWidth sx={{ minWidth: { md: 250 }, bgcolor: 'white' }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value=""><em>All Categories</em></MenuItem>
            {categoriesList.map((cat: any) => (
              <MenuItem key={cat.slug || cat} value={cat.slug || cat}>
                {cat.name || cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Loading State */}
      {isProductsLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Products Grid */}
      {!isProductsLoading && (
        <Grid container spacing={4} alignItems="stretch"> 
          {products.map((product) => (
            <Grid  size={{ xs: 12, sm: 6, md: 4 }} key={product.id} sx={{ display: 'flex' }}>
              
              {/* --- CARD START --- */}
              <Card sx={{ 
                width: '100%',
                display: 'flex', 
                flexDirection: 'column', // Stack children vertically
                justifyContent: 'space-between', // Push footer to bottom
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                },
                bgcolor: 'white'
              }}>
                
                {/* 1. FIXED IMAGE HEIGHT */}
                <Box sx={{ 
                  height: 220, // Strict height for image area
                  width: '100%', 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#f8f9fa'
                }}>
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ 
                      maxHeight: '100%', 
                      maxWidth: '100%', 
                      objectFit: 'contain', // Show full image without cropping
                      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' // Subtle shadow on image itself
                    }}
                  />
                </Box>

                {/* 2. FLEX GROW CONTENT (Fills the middle gap) */}
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 1
                }}>
                  {/* Category Chip */}
                  <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1, letterSpacing: 1 }}>
                    {product.category}
                  </Typography>

                  {/* Title - Locked to 1 Line */}
                  <Typography variant="h6" component="div" sx={{ 
                    fontWeight: 700,
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    lineHeight: 1.2
                  }}>
                    {product.title}
                  </Typography>

                  {/* Rating & Price Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      ${product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontSize: '0.8rem' }}>
                        ({product.rating})
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                {/* 3. PINNED BUTTON (Always at bottom) */}
                <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                   <Link 
                      href={`/dashboard/products/${product.id}`} 
                      passHref
                      style={{ width: '100%', textDecoration: 'none' }}
                   >
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      size="medium"
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        borderWidth: 2,
                        '&:hover': { borderWidth: 2 }
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
              {/* --- CARD END --- */}

            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
        <Pagination 
          count={Math.ceil(totalProducts / limit)} 
          page={page} 
          onChange={(_, p) => setPage(p)} 
          color="primary"
          size="large" 
          showFirstButton 
          showLastButton
        />
      </Box>
    </Box>
  );
}