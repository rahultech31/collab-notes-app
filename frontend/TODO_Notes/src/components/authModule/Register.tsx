import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Perform registration API call here
      // On success, log the user in using the login context method
      await login(email, password);
      navigate('/notebook');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full mb-3 p-2 border"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        {role !== 'user' && (
          <input
            type="text"
            placeholder="Secret Key"
            className="w-full mb-3 p-2 border"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        )}
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
