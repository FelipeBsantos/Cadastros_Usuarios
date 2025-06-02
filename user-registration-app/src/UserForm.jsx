import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function UserForm({ addUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    addUser({ name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
    setError('');
  };

  return (
    <Paper
      elevation={8}
      sx={{
        maxWidth: 480,
        margin: '0 auto',
        p: 4,
        bgcolor: 'rgba(255,255,255,0.85)',
        borderRadius: 3,
        color: '#333',
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        textAlign="center"
        fontWeight="bold"
        color="primary.main"
      >
        Cadastro de Usuário
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          autoFocus
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          fullWidth
        />

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 1,
            bgcolor: 'primary.main',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,123,255,0.6)',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Cadastrar
        </Button>
      </Box>
    </Paper>
  );
}
