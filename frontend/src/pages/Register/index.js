import React, { useState } from 'react';
import './style.css';
import contractImg from '../../assets/contract-img.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      await api.post('users', data);

      alert(`User created successfully. Please login to the app`);

      history.push('/');
    } catch (err) {
      alert(`Error on saving data, please try again`);
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={contractImg} alt="ContractIMG" />
          <h1>Registrar</h1>
          <p>
            Crie um usuário para gerenciar melhor seus contratos.
          </p>
          <Link className="back-link-register" to="/">
            <FiArrowLeft />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button-register" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  )
}