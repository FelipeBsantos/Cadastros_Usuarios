import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Paper,
  Divider,
} from '@mui/material';

import UserForm from './UserForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%', width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%', width: '100%' }}>{children}</Box>
      )}
    </div>
  );
}

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setTabIndex(1);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'background.default',
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <Tab label="Cadastro" id="tab-0" aria-controls="tabpanel-0" />
        <Tab label="Usuários" id="tab-1" aria-controls="tabpanel-1" />
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: 'rgba(255,255,255,0.15)',
          mx: 2,
          my: 3,
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <TabPanel value={tabIndex} index={0}>
          <UserForm addUser={addUser} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <UserList users={users} />
        </TabPanel>
      </Box>
    </Box>
  );
}

function UserList({ users }) {
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!users.length)
    return (
      <Typography
        sx={{ p: 2, textAlign: 'center', fontStyle: 'italic', color: '#eee' }}
      >
        Nenhum usuário cadastrado.
      </Typography>
    );

  return (
    <List sx={{ color: 'white' }}>
      {users.map((user, index) => (
        <Paper
          key={index}
          elevation={6}
          sx={{
            mb: 2,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.12)',
            color: 'white',
          }}
        >
          <ListItemButton onClick={() => handleToggle(index)}>
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', userSelect: 'none' }}
                >
                  {user.name}
                </Typography>
              }
            />
          </ListItemButton>
          <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
            <Box sx={{ pl: 4, pb: 2, pt: 1 }}>
              <Typography>Email: {user.email}</Typography>
              <Typography>Telefone: {user.phone}</Typography>
            </Box>
          </Collapse>
        </Paper>
      ))}
    </List>
  );
}
