import { useState } from 'react';
import { API_BASE_URL } from '../config';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setMessage(data.message || 'Account created successfully');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page">
      <h1>Create Account</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Account'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default Register;
