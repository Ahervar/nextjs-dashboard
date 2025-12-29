'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Divider,
  CircularProgress,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Container maxWidth="md">
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.back()} 
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={user.image} 
            sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}
          >
            {user.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <Typography color="text.secondary">@{user.username}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Contact Info</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Phone: {user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Employment</Typography>
            <Typography variant="body1">Company: {user.company?.name}</Typography>
            <Typography variant="body1">Title: {user.company?.title}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Personal Details</Typography>
            <Typography variant="body1">Age: {user.age}</Typography>
            <Typography variant="body1">Gender: {user.gender}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
             <Typography variant="subtitle2" color="text.secondary">Address</Typography>
             <Typography variant="body1">{user.address?.address}, {user.address?.city}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}