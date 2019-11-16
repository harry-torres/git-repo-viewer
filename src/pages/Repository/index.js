import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import { Loading, Owner, IssueList, PageButtons } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: { option: 'all', page: 1, per_page: 5 }
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const repository = await api.get(`/repos/${repoName}`);

    this.loadIssues();

    this.setState({
      repository: repository.data,
      loading: false
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filter } = this.state;
    const { page, per_page } = filter;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter.option,
        page,
        per_page
      }
    });

    this.setState({
      issues: response.data
    });
    // to find out the last page:
    // console.log(response.headers.link);
  };

  handleFilterChange = async e => {
    const { filter } = { ...this.state };

    filter.option = e.target.value;

    await this.setState({ filter });
    this.loadIssues();
  };

  handleClick = async e => {
    const { filter } = { ...this.state };
    if (e.target.id === 'next') {
      filter.page += 1;
    } else if (e.target.id === 'prev') {
      filter.page -= 1;
    }
    await this.setState({ filter });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, filter } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner size={40} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <select value={filter.option} onChange={this.handleFilterChange}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageButtons>
          <button
            id="prev"
            type="button"
            disabled={filter.page === 1}
            onClick={this.handleClick}
          >
            Prev
          </button>
          <button
            id="next"
            type="button"
            // disabled={}
            onClick={this.handleClick}
          >
            Next
          </button>
        </PageButtons>
      </Container>
    );
  }
}
