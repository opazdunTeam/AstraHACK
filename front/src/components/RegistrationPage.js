import React, { useState, useEffect } from 'react';
import './RegistrationPage.css'; // Assuming the styles are in this file

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    validateForm();
  }, [username, password]);

  const validateForm = () => {
    let usernameValid = true;
    let passwordValid = true;

    if (username.trim() === '') {
      setUsernameError('Имя пользователя не должно быть пустым');
      usernameValid = false;
    } else if (/\s/.test(username)) {
      setUsernameError('Пробелы в имени пользователя не допускаются');
      usernameValid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Пароль не должен быть пустым');
      passwordValid = false;
    } else if (/\s/.test(password)) {
      setPasswordError('Пробелы в пароле не допускаются');
      passwordValid = false;
    } else if (password.length < 8) {
      setPasswordError('Пароль должен быть не менее 8 символов');
      passwordValid = false;
    } else {
      setPasswordError('');
    }

    setIsFormValid(usernameValid && passwordValid);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid) {
      setSuccessMessage('Вы зарегистрированы');
      setUsername('');
      setPassword('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className="reg-form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && <div className="reg-error-message">{usernameError}</div>}
          </div>
          <div className="reg-form-group">
            <label htmlFor="password">Пароль</label>
            <div className="reg-password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 442.04 442.04"
                  width="24"
                  height="24"
                >
                  <g>
                    <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"/>
                    <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"/>
                    <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"/>
                  </g>
                </svg>
              </button>
            </div>
            {passwordError && <div className="reg-error-message">{passwordError}</div>}
          </div>
          <button type="submit" className="reg-submit-button" disabled={!isFormValid}>Зарегистрироваться</button>
          {successMessage && <div className="reg-success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
