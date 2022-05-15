import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

import * as actions from '../../store/module/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Overlay, FormImg } from './styled';
import Loading from '../../components/Loading';
// import Fotos from '../Fotos';

function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((erro) => toast.error(erro));
        history.push('/');
      }
    }

    getData();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    const formErrors = [];

    if (nome.length < 3 || nome.length > 255) {
      formErrors.push('Nome deve ter entre 3 e 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors.push('Sobrenome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors.push('E-mail inválido');
    }

    if (!isInt(String(idade))) {
      formErrors.push('Idade deve ser um número inteiro');
    }

    if (!isFloat(String(peso))) {
      formErrors.push('Peso deve ser um número inteiro ou de ponto flutuante');
    }

    if (!isFloat(String(altura))) {
      formErrors.push(
        'Altura deve ser um número inteiro ou de ponto flutuante'
      );
    }

    if (formErrors.length > 0)
      return formErrors.map((erro) => toast.error(erro));

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno(a) editado(a) com sucesso!');

        history.push('/');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno(a) cadastrado(a) com sucesso!');

        history.push('/');
      }

      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error(`Houve um erro ao enviar a requisição. Codigo: ${status}`);
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  async function handleChange(e) {
    const uploadedFoto = e.target.files[0];
    const fotoURL = URL.createObjectURL(uploadedFoto);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', uploadedFoto);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso.');

      setIsLoading(false);

      history.push(`/aluno/${id}/edit`);
    } catch (err) {
      setIsLoading(false);
      console.log(err);

      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if (status === 401) dispatch(actions.loginFailure);
    }
  }

  function inputFile() {
    document.querySelector('#foto').click();
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>

      {id && (
        <ProfilePicture>
          <div className="picContainer">
            <FormImg>
              <label htmlFor="foto">
                {foto ? (
                  <img src={foto} alt="Foto de perfil" crossOrigin="" />
                ) : (
                  <FaUserCircle size={200} />
                )}
                <input type="file" id="foto" onChange={handleChange} />
              </label>
            </FormImg>
            <Overlay onClick={inputFile} size={180}>
              <span>Editar</span>
            </Overlay>
          </div>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobreome"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />

        <input
          type="altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">{id ? 'Editar dados' : 'Cadastrar'}</button>
      </Form>
    </Container>
  );
}

export default Aluno;

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
