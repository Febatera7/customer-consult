import React, { useState } from 'react'
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/legal-agreement.jpg';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('signin', { email, password });

      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token);

      history.push('/home');
    } catch (err) {
      alert('Error logging in, please try again');
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogon}>
          <img src={logoImg} alt="Contract" />
          <h1>Consulta de Contratos</h1>
          <input placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder='Senha' type='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color='#ffffff' />
            Novo Usuário
          </Link>
        </form>
      </section>
    </div>
  )
}