import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormState = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormState);
  const { displayName, email, password, passwordConfirm } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((state) => ({ ...state, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, passwordConfirm } = formFields;
    if (password !== passwordConfirm) {
      alert('Passwords are not the same! Please try again');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormState);
  };

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Display Name</label>
        <input
          type='text'
          name='displayName'
          value={displayName}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <label>Confirm Password</label>
        <input
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
