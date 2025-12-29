import { Container, Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Cool gradient background
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            borderRadius: 4,
            // Glassmorphism effect (slightly transparent white)
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="overline" 
            sx={{ fontWeight: 'bold', letterSpacing: 2, color: 'primary.main' }}
          >
            NEXT.JS + ZUSTAND + MUI
          </Typography>

          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: '#1a1a1a',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' } // Responsive font size
            }}
          >
            Frontend Technical Assessment
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', mb: 5, lineHeight: 1.6 }}
          >
            This is my assignment submission. I have completed it with cool styling, 
            a fully responsive design, and optimized state management.
          </Typography>

          <Link href="/login" passHref style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 6, 
                py: 2, 
                fontSize: '1.1rem',
                borderRadius: 50, // Pill shape button
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Launch Dashboard
            </Button>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}
