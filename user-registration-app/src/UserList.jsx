import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';

export default function UserList({ users }) {
  if (!users.length)
    return <Typography>Nenhum usuário cadastrado ainda.</Typography>;

  return (
    <Stack spacing={2}>
      {users.map((user, index) => (
        <Card key={index} variant="outlined" sx={{ bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {user.name}
            </Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Telefone: {user.phone}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
