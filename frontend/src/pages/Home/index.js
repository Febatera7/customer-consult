import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import logoImg from '../../assets/legal-agreement.jpg';
import { FiPower, FiTrash2, FiXOctagon, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Modal from '../../components/Modal';
import api from '../../services/api';

export default function Home() {
    const history = useHistory();
    const [filters, setFilters] = useState({});
    const name = localStorage.getItem('name');
    const [results, setResults] = useState([]);

    async function request() {
        const req = await api.post('customers/read', filters);
        setResults(req.data);
    }

    useEffect(() => {
        request();
    }, []);

    async function handleDelete(id) {
        await api.delete(`customers/${id}`);
        request()
    }

    async function handleUpdate(id, updateObject) {
        await api.patch(`customers/${id}`, updateObject);
        request()
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    };

    function formatedData(date) {
        const newDate = new Date(date)
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function formatedCpfOrCnpJ(cpfOrCnpj) {
        if (cpfOrCnpj.length === 14) {
            return cpfOrCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        } else {
            return cpfOrCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        };
    }

    function formatedPhoneNumber(phone) {
        const isCellPhone = phone.length === 11 ? true : false;
        if (isCellPhone) {
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else {
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
        }
    }

    return (
        <div className="home-container">
            <header>
                <img src={logoImg} alt="Contract" />
                <span>Bem-vindo, {name}</span>
                <button type="button">
                    <FiPower size={18} color="#ffffff" onClick={handleLogout} />
                </button>
            </header>
            <h1>Lista de Contratos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo de Pessoa</th>
                        <th>CPF/CNPJ</th>
                        <th>Telefone</th>
                        <th>Valor do Contrato</th>
                        <th>Data do Contrato</th>
                        <th>Situação do Contrato</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => {
                        return <tr key={result._id}>
                            <td>{result.name}</td>
                            <td>{result.legal_person ? 'Jurídica' : 'Física'}</td>
                            <td>{formatedCpfOrCnpJ(result.cpf_or_cnpj)}</td>
                            <td>{formatedPhoneNumber(result.phone_number)}</td>
                            <td>{formatedData(result.contract_date)}</td>
                            <td>{result.contract_value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{result.contract_situation}</td>
                            <td>
                                <button
                                    type="button"
                                    title="Agradecer Pagamento"
                                    onClick={() => {
                                        if (result.contract_situation === "Pago") {
                                            alert('Cliente já pagou seu contrato.');
                                        } else {
                                            handleUpdate(result._id, { contract_situation: "Pago", action: "Agradecer Pagamento" });
                                        }
                                    }}>
                                    <FiThumbsUp size={20} color="#006400" />
                                </button>
                                <button
                                    type="button"
                                    title="Cobrar"
                                    onClick={() => {
                                        if (result.contract_situation === "Pago") {
                                            alert('Cliente já pagou seu contrato.');
                                        } else {
                                            handleUpdate(result._id, { contract_situation: "Cliente Cobrado", action: "Cobrar" });
                                        }
                                    }}>
                                    <FiThumbsDown size={20} color="#DC143C" />
                                </button>
                                <button
                                    type="button"
                                    title="Cancelar Contrato"
                                    onClick={() => handleUpdate(result._id, { contract_situation: "Contrato Cancelado", action: "Cancelar Contrato" })}>
                                    <FiXOctagon size={20} color="#B22222" />
                                </button>
                                <button
                                    type="button"
                                    title='Deletar Contrato'
                                    onClick={() => handleDelete(result._id)}>
                                    <FiTrash2 size={20} color="#B22222" />
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}