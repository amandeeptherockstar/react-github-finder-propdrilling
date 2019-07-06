import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';

export default function Search(props) {
  const [text, setText] = useState('');

  const onChangeHandler = (event) => {
    setText(event.target.value);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Form Submit');
    props.searchUsers(text);
    setText('');
  }
  return (
    <div className={styles.search}>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Search Users" className={styles.formControl} value={text} onChange={onChangeHandler}/>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Search</button>
          {props.userCount > 0 && <button type="button" onClick={props.clearUser} className={`${styles.btn} ${styles.btnClear}`}>Clear</button>}
        </div>
      </form>
    </div>
  )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  userCount: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired
}