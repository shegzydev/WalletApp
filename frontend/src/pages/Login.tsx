import { MouseEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Add this for custom styling
import vitelogo from '/vite.svg';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ChevronLeft } from 'lucide-react';

const Login = () => {
  const { isLoggingIn, login } = useAuthStore();

  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div>
      <div
        className="register-wrapper bg-primary m-auto"
        style={{ width: 'min(450px, 100%)' }}
      >
        {/* Header */}
        <h5
          style={{
            paddingTop: '25px',
            paddingBottom: '30px',
            paddingLeft: '20px',
          }}
          className="mb-0 text-white fw-bold"
        >
          <Link to="/">
            <ChevronLeft className="text-white" />
          </Link>{' '}
          Sign in
        </h5>

        <div className="bg-white d-flex flex-column align-items-center rounded-top-5">
          <div
            style={{ paddingLeft: '25px' }}
            className="w-100 text-white py-2"
          >
            <p className="mb-0 text-primary fw-bold fs-1">Welcome back,</p>
            <p className="mb-0 fw-normal" style={{ color: 'black' }}>
              Hello there, sign in to continue
            </p>
          </div>

          {/* Logo */}
          <div className="logo-placeholder mt-5 mb-5">
            <img src={vitelogo} alt="Logo" className="rounded-circle" />
          </div>

          {/* Form */}
          <form className="" style={{ width: '90%' }}>
            <div className="mb-4">
              <input
                type="tel"
                className="form-control rounded-3"
                placeholder="(+234) 8123456789"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
              />
            </div>
            <div className="mb-4 position-relative">
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                <i className="bi bi-eye-slash"></i>
              </span>
            </div>

            <button
              className="btn btn-primary w-100 rounded-3 fw-semibold mt-2 mb-2"
              type="submit"
              onClick={(e) => handleLogin(e)}
            >
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center mt-3 mb-3">
              <span>
                Don't have an account?{' '}
                <Link to="/register" className="text-primary fw-semibold">
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
