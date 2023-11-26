import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Workers = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleCreateUser = async () => {
    const accessToken = await getAccessTokenSilently();
    try {
      const response = await axios.post(
        '/api/user/create-worker',
        {
          name: 'John Doe',
          username: username,
          password: password,
          connection: 'Username-Password-Authentication',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(`User created successfully: ${response.data.name}`);
    } catch (error: any) {
      console.error('Error creating user:', error?.response.data.message);
      setMessage(error?.response.data.message);
    }
  };

  return (
    <Box mt='40'>
      <h2>Create User</h2>
      <label>
        Username:
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleCreateUser}>Create User</button>
      {message && <p>{message}</p>}
    </Box>
  );
};

export default Workers;
