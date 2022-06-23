import { useState, useContext } from 'react';
import './sign-in-form.styles.scss';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';
import { FormInput, Button } from '..';

const defaultFormState = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormState);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((state) => ({ ...state, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formFields;

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (err) {
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        alert('incorrect password or email');
      }
      console.log(err);
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormState);
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleFormSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
