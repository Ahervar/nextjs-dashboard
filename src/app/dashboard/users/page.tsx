'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  TextField, 
  Pagination, 
  Box,
  CircularProgress
} from '@mui/material';
import Link from 'next/link';

export default function UsersPage() {
  const { users, fetchUsers, totalUsers, isUsersLoading } = useStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 6; // Low limit to test pagination easily

  // Fetch data when page or search changes
  useEffect(() => {
    const skip = (page - 1) * limit;
    // Debounce could go here, but for the test, direct call is fine
    const timeoutId = setTimeout(() => {
        fetchUsers(limit, skip, search);
    }, 500); // 500ms delay to stop flickering while typing
    
    return () => clearTimeout(timeoutId);
  }, [page, search, fetchUsers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      
      {/* Search Bar */}
      <TextField 
        label="Search Users by Name" 
        variant="outlined" 
        fullWidth 
        sx={{ mb: 4 }}
        value={search}
        onChange={handleSearch} 
      />

      {/* Loading State */}
      {isUsersLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Users Grid */}
      {!isUsersLoading && (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>{user.email}</Typography>
                  <Typography variant="body2">Company: {user.company?.name || 'N/A'}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} href={`/dashboard/users/${user.id}`}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <Pagination 
          count={Math.ceil(totalUsers / limit)} 
          page={page} 
          onChange={(_, p) => setPage(p)} 
          color="primary"
        />
      </Box>
    </Box>
  );
}