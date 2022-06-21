import { useState } from 'react';
import './sign-up-form.styles.scss';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { FormInput, Button } from '../../components';

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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <FormInput
          label='Confirm Password'
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          required
          onChange={handleChange}
          autoComplete='on'
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
