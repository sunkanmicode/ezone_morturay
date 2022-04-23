import React from 'react';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}

ForgotPasswordPage.propTypes = {};

export default React.memo(ForgotPasswordPage);
