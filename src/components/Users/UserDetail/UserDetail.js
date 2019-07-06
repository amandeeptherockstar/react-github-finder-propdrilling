import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './UserDetail.module.css';
import Repos from '../../Repos/Repos';
import Pagination from '../../Pagination/Pagination';

function UserDetail(props) {
  useEffect(() => {
    const username = props.match.params.username;
    props.fetchSingleUser(username);
    props.fetchRepos(username);
  }, []);

  if(props.user === null){
    return null;
  }
  const {
    login, avatar_url, html_url, name, company, blog, location, hireable, bio, public_repos, public_gists, followers, following
  } = props.user;
  return (
    <div className={styles.userDetail}>
      <div className="container">
        <Link to="/home">
          <span className={styles.backButton}>
            <i className="fas fa-arrow-left"></i>&nbsp; Back to Home
          </span>
        </Link> {' '} Hireable {' '}
        { hireable ? <i className={`fas fa-check ${styles.checkColorSuccess}`}></i> : <i className={`fas fa-times ${styles.checkColorDanger}`}></i> }

        <div className={styles.userSection}>
          <div className={styles.profileSection}>
            <img src={avatar_url} alt={login} />
            <h3>{ name }</h3>
            <p>Location: { location || 'N/A'  }</p>
          </div>

          <div className="detailSection">
            <p className="bio">
              <span className="bold">Bio: </span>
              { bio || 'N/A' }
            </p>
            <a href={html_url} target="_blank" className={styles.btn}>Visit Github Profile</a>
            <ul>
              <li>
                <span className="bold">Username: </span> {login || 'N/A'}
              </li>
              <li>
                <span className="bold">Company: </span> {company || 'N/A'}
              </li>
              <li>
                <span className="bold">Website: </span> {blog || 'N/A'}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.card}>
          <span className={`${styles.badge} ${styles.badgePrimary}`}>Followers: {followers}</span>
          <span className={`${styles.badge} ${styles.badgeDanger}`}>Following: {following}</span>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>Public Repos: {public_repos}</span>
          <span className={`${styles.badge} ${styles.badgeWarning}`}>Public Gists: {public_gists}</span>
        </div>

        {props.repos.length > 0 ? <Repos userRepos={props.repos} /> : <h3 style={{textAlign: 'center', margin: '2rem 0'}}>No More Repo's Available</h3>}
        
        <Pagination next={() => props.nextRepos(login)} prev={() => props.prevRepos(login)} disableNextButton={props.repos.length === 0}/>
      </div>
    </div> 
  )
}

UserDetail.propTypes = {
  fetchSingleUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  fetchRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  nextRepos: PropTypes.func.isRequired,
  prevRepos: PropTypes.func.isRequired
}

export default UserDetail;
