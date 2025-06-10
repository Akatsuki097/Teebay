import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// 1. Define the GraphQL REGISTER mutation
const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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

// 2. Query to get the current user for Apollo cache
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

export default function Signup() {
  // React state hooks for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Register the mutation using Apollo's useMutation hook
  const [register, { loading }] = useMutation(REGISTER_USER, {
    // 3a. Update Apollo cache with the new user
    update(cache, { data: { register } }) {
      const { user } = register;
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { me: user }
      });
    },
    // 3b. On success, store token in localStorage
    onCompleted: ({ register }) => {
      localStorage.setItem('token', register.token);
      // Optionally, redirect or clear form here
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // call the mutation with variables
    await register({
      variables: {
        input: { firstName, lastName, email, phone, address, password }
      }
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          {/* TODO: add show/hide toggle */}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
}
