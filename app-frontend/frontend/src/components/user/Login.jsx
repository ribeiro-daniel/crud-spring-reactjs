import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../Store/Context'

function initialState() {
  return { login: '', senha: '' };
}

function login({ login, senha }) {
  if (login === 'conquer' && senha === 'conquer123') {
    return { token: '1234' };
  }
  return { error: 'Usuário inválido' };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();


  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token } = login(values);

    if (token) {
      setToken(token);
      return history.push('/users');
    }

    setValues(initialState);
  }

  return (
    <div>
      <h1>Acessar o Sistema</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="login">Usuário</label>
          <input
            id="login"
            type="text"
            name="login"
            onChange={onChange}
            value={values.login}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            name="senha"
            onChange={onChange}
            value={values.senha}
          />
        </div>
        <button>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default UserLogin;