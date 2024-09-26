import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Enter your name: </label>
        <input
            type='text' id='name' value={inputName} onChange={(e) => setInputName(e.target.value)}
            required />
        <button type='submit'>Start Quiz</button>
    </form>
    </>
  );
}