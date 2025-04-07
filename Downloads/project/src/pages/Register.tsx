import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {errors.submit && (
                <div className="text-red-400 text-sm">{errors.submit}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>

              <p className="text-center text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;