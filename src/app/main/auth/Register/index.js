import React from 'react';
import RegistrationForm from './components/RegistrationForm';

export function RegistrationPage() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

RegistrationPage.propTypes = {};

export default React.memo(RegistrationPage);
