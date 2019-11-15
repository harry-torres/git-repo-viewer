import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'; // font-awesome
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List, Exception } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null
  };

  // load localstorage data
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // save localstorage data
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      error: null,
      loading: true
    });
    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw new Error('Repository name required!');

      const repoExists = repositories.find(
        repo => repo.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (repoExists) throw new Error('Repository already exists!');

      const response = await api.get(`/repos/${newRepo}`).catch(() => {
        throw new Error('Repository not found!');
      });

      const data = {
        name: response.data.full_name
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: ''
      });
    } catch (err) {
      this.setState({
        error: err
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>
        {error && <Exception>{error.message}</Exception>}
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
