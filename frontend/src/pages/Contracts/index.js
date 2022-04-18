import React, { useState, useEffect } from 'react';
import './style.css';
import InputMask from "react-input-mask";
import { DropdownList } from 'react-widgets'
import contractImg from '../../assets/contract-img.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import CurrencyFormat from 'react-currency-format';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [cpfOrCnpj, setCpfOrCnpj] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contractDate, setContractDate] = useState('');
    const [contractValue, setContractValue] = useState('');
    const [formatedValue, setFormatedValue] = useState(0.00);

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const cpf_or_cnpj = cpfOrCnpj.replace(/[^\w\s]/gi, '');
        const phone_number = phoneNumber.replace(/[^\w\s]/gi, '');


        const data = {
            name,
            cpf_or_cnpj,
            phone_number,
            contract_date: contractDate,
            contract_value: formatedValue,
        };

        try {
            await api.post('customers', data);

            alert(`Contract created successfully.`);

            history.push('/home');
        } catch (err) {
            alert(`Error on saving data, please try again`);
        }
    };


    function formatedCpfOrCnpJ(cpfCnpj) {
        cpfCnpj = cpfCnpj.replace(/\D/g, "");

        if (cpfCnpj.length <= 11) {
            cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2")
            cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2")
            cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        } else {
            cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d)/, "$1.$2")
            cpfCnpj = cpfCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            cpfCnpj = cpfCnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
            cpfCnpj = cpfCnpj.replace(/(\d{4})(\d)/, "$1-$2")
        }

        return cpfCnpj;
    }

    function handleChangeMask(e) {
        const { value } = e.target

        setCpfOrCnpj(formatedCpfOrCnpJ(value))
    }

    useEffect(() => {
        if (contractValue) {
            const newValue = contractValue.replace(/['R$'/./]+/g, '').replace(',', '.');

            setFormatedValue(parseFloat(newValue));
        }
    }, [contractValue]);

    return (
        <div className="contracts-container">
            <div className="content">
                <section>
                    <img src={contractImg} alt="ContractIMG" />
                    <h1>Novo contrato</h1>
                    <p>
                        Registre seus contratos.
                    </p>
                    <Link className="back-link-register" to="/home">
                        <FiArrowLeft />
                        Voltar para lista de contratos
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        name='name'
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        name="cpfOrCnpj"
                        placeholder="CPF ou CNPJ"
                        maxLength={18}
                        value={cpfOrCnpj}
                        onChange={handleChangeMask}
                    />
                    <InputMask
                        name='phoneNumber'
                        placeholder='(99)99999-9999'
                        mask='(99)99999-9999'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <InputMask
                        name='contractDate'
                        placeholder='00/00/0000'
                        mask='99/99/9999'
                        value={contractDate}
                        onChange={e => setContractDate(e.target.value)}
                    />
                    <CurrencyFormat
                        name='contractValue'
                        placeholder="R$99,99"
                        decimalSeparator=','
                        decimalScale={2}
                        allowNegative={false}
                        prefix='R$'
                        thousandSeparator='.'
                        value={contractValue}
                        onChange={e => setContractValue(e.target.value)}
                    />
                    <button className="button-register" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}