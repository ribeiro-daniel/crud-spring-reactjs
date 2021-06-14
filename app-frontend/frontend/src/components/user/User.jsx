import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {
  PaginationButton,
  PaginationItem,
  Pagination,
} from "../Pagination/styles";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de Usuários",
};
const LOCAL_PORT = 8080;
const baseUrl = `http://localhost:${LOCAL_PORT}/api/users`;

const initialState = {
  user: { name: "", email: "", phone: "", birthday: "" },
  list: [],
  total: 0,
  limit: 5,
  totalPages: 0,
  pages: [],
  currentPage: 1,
  inputValue: "",
};

export default class UserCrud extends Component {
  state = { ...initialState };

  clear() {
    this.setState({ user: initialState.user });
  }

  componentWillMount(page) {
    axios
      .get(
        `${baseUrl}?page=${(this.state.currentPage = page)}&size=${
          this.state.limit
        }`
      )
      .then((resp) => {
        this.setState({ list: resp.data["content"] });
        this.setState({ total: resp.data["totalElements"] });
        this.setState({ limit: resp.data["size"] });
        this.setState({ totalPages: resp.data["totalPages"] });

        const arrayPages = [];
        for (let i = 0; i <= this.state.totalPages - 1; i++) {
          arrayPages.push(i);
        }
        this.setState({ pages: arrayPages });
      });
  }

  componentDidUpdate() {
    if (this.state.inputValue !== "") {
      this.fetchData();
    }
  }

  fetchData = () => {
    fetch(`${baseUrl}/name?name=${this.state.inputValue}`)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        return this.setState({ list: resp });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderPagination() {
    return this.state.pages.map((page) => {
      return (
        <PaginationItem
          isSelect={page === this.state.currentPage}
          key={page}
          onClick={() => this.componentWillMount(page)}
        >
          {page}
        </PaginationItem>
      );
    });
  }

  renderInputSearch() {
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar usuário..."
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          value={console.log(this.state.inputValue)}
        />
      </div>
    );
  }

  renderTable() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Aniversário</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
        <Pagination>
          <PaginationButton>
            <PaginationItem>Total{this.state.total}</PaginationItem>
            {this.state.currentPage > 0 && (
              <PaginationItem
                onClick={() =>
                  this.componentWillMount(this.state.currentPage - 1)
                }
              >
                Preview
              </PaginationItem>
            )}

            {this.renderPagination()}
            {this.state.currentPage < this.state.pages.length - 1 && (
              <PaginationItem
                onClick={() =>
                  this.componentWillMount(this.state.currentPage + 1)
                }
              >
                Next
              </PaginationItem>
            )}
          </PaginationButton>
        </Pagination>
      </Table>
    );
  }
  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.birthday}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.remove(user)}
            >
              <i className="fa fa-trash ml-2"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={this.state.user.phone}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o telefone..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Aniversário</label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                value={this.state.user.birthday}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite seu aniversário..."
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderInputSearch()}
        {this.renderTable()}
      </Main>
    );
  }
}
