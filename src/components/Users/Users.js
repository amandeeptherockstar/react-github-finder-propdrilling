import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Users.module.css';
import UserItem from './UserItem/UserItem';

class Users extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className={styles.users}>
        {users.map((user) => {
          return (
            <UserItem key={user.id} user={user}/>
          )
        })}
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users;