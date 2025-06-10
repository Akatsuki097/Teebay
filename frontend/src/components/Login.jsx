import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define the LOGIN mutation
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

// Query to write the user into Apollo cache
const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      const { user } = login;
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { me: user }
      });
    },
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      // Optionally redirect or show success message
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: { email, password } });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
      </p>
    </div>
  );
}
