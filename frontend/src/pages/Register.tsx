import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Add this for custom styling
import vitelogo from '/vite.svg';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { MouseEvent, useState } from 'react';

const Register = () => {
  const { isRegistering, register } = useAuthStore();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
  });

  const [isChecked, setChecked] = useState(false);

  const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="register-wrapper bg-primary">
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
        Sign up
      </h5>

      <div className="bg-light d-flex flex-column align-items-center rounded-top-5">
        <div style={{ paddingLeft: '25px' }} className="w-100 text-white py-2">
          <p className="mb-0 text-primary fw-bold fs-1">Welcome to us,</p>
          <p className="mb-0 fw-normal" style={{ color: 'black' }}>
            Hello there, create New account
          </p>
        </div>

        {/* Logo */}
        <div className="logo-placeholder mt-3 mb-3">
          <img src={vitelogo} alt="Logo" className="rounded-circle" />
        </div>

        {/* Form */}
        <form className="" style={{ width: '90%' }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Firstname"
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Lastname"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control rounded-3"
              placeholder="(+234) 8123456789"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span className="position-absolute end-0 top-50 translate-middle-y me-3">
              <i className="bi bi-eye-slash"></i>
            </span>
          </div>

          <div className="form-check mb-3">
            <input
              style={{ width: '24px', height: '24px', marginRight: '10px' }}
              className="form-check-input"
              type="checkbox"
              id="terms"
              onChange={() => setChecked(!isChecked)}
            />
            <label className="form-check-label small" htmlFor="terms">
              By creating an account you agree to our <br />
              <a href="#" className="text-primary fw-semibold">
                Term and Conditions
              </a>
            </label>
          </div>

          <button
            className="btn btn-primary w-100 rounded-3 fw-semibold mt-2 mb-2"
            onClick={(e) => handleRegister(e)}
            disabled={!isChecked}
          >
            {isRegistering ? 'Signing up...' : 'Sign up'}
          </button>

          <div className="text-center mt-3 mb-3">
            <span>
              Have an account?{' '}
              <Link to="/login" className="text-primary fw-semibold">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
