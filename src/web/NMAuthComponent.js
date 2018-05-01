import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, ButtonGroup, Input, FormFeedback, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { required, email, confirmation, length } from 'redux-form-validators'
import connector from './../connector';
import './AuthPage.css';

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    ...props
  }) => {

    return (
      <div>
        {label ? <label>{label}</label> : ''}
        <div>
          <Input {...input} {...props} type={type} className={(error && touched) ? 'is-invalid' : ''} />
          {touched &&
            ((error && <FormFeedback>{error}</FormFeedback>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
  }
  

let SigninFormBase = props => {
  const {
    handleSubmit,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    onSignUp,
    showSignup,
    showPasswordReset,
    onPasswordReset,
    resetPassword,
    buttonProps,
    submitting,
    invalid,
    size,
    passwordResetStatus,
    passwordResetError,
    authError,
    showPasswordResetForm,
    updatePassword,
    badPasswordResetCode
  } = props;

  const mergedButtonProps = _.merge({size: `${size || 'md'}`, color: 'primary'}, buttonProps || {})

  const passwordConfirmation = (
    <FormGroup>
      <Label for="passwordConfirmation" hidden>Confirm Password</Label>
      <Field
        component={renderField}
        type="password"
        validate={confirmation({ field: 'password', fieldLabel: 'Password' })}
        name="passwordConfirmation"
        className={`form-control form-control-${size || 'md'}`}
        id="password-confirmation"
        placeholder="confirm password"
      />
    </FormGroup>
  )

  const authErrorMessage = (
    <Row>
      <Col className="auth-error">
        <Alert color="danger">
          {authError}
        </Alert>
      </Col> 
    </Row>
  )

  const passwordResetLink = showPasswordResetForm && !badPasswordResetCode ? '' : showPasswordReset && !badPasswordResetCode ? <p className="passwordResetLink"><a href="#" onClick={(e) => { e.preventDefault(); onPasswordReset(false) } }>Click here to login</a></p> : <p className="passwordResetLink">{badPasswordResetCode ? 'Want us to send another reset password email?' : 'Forgot your password?'} <a href="#" onClick={(e) => { e.preventDefault(); onPasswordReset(true) } }>Click here.</a></p>;

  const passwordResetInstructions = (
    <Row>
      <Col className="password-reset-instructions">
        <Alert color={passwordResetStatus === 'sent' ? 'success' : passwordResetStatus === 'error' ? 'danger' : 'info'}>
          { passwordResetStatus === 'error' ? passwordResetError : '' }

          { passwordResetStatus === 'sent' ? 'Check your email and follow the link provided to reset your password.' : '' }
          { showPasswordResetForm ? (badPasswordResetCode ? passwordResetLink : 'Enter a new password') : 'Enter the email address you used to signup to reset your password.'}
        </Alert>
      </Col> 
    </Row>
  )

  const loginInstructions = (
    <Row>
      <Col className="password-reset-instructions">
        <Alert color='success'>
          { passwordResetStatus === 'updated' ? 'Your password was successfully. You may now use it to sign into your account' : '' }
        </Alert>
      </Col> 
    </Row>
    
  )

  const showSignupLink = showSignup ? <p className="signUpLink">Have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUp(false) } }>Click here.</a></p> : <p className="signUpLink">No Account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUp(true) } }>Click here.</a></p>;

  const emailSignIn = (
    <Row>
      <Col className="emailSignIn">
        <Form onSubmit={ showSignup ? signUpWithEmail : (showPasswordReset ? (showPasswordResetForm ? updatePassword : resetPassword) : signInWithEmail) }>
          {showPasswordResetForm ? '' : (
              <FormGroup>
              <Label for="email" hidden>Email</Label>
              <Field
                component={renderField} 
                validate={[required(), email()]}
                type="email"
                name="email"
                className={`form-control form-control-${size || 'md'}`}
                id="email"
                placeholder="email"
              />
            </FormGroup>
          )}
          {showPasswordReset && !showPasswordResetForm ? '' : (
            <FormGroup>
              <Label for="password" hidden>Password</Label>
              <Field
                component="input"
                component={renderField} 
                validate={[required(), length({ min: 6 })]}
                type="password"
                name="password"
                className={`form-control form-control-${size || 'md'}`}
                id="password"
                placeholder="password"
              />
            </FormGroup>
          )}
          {showSignup || showPasswordResetForm ? passwordConfirmation : ''}
          <Button disabled={submitting || invalid} className="float-right" {...mergedButtonProps} type="submit">Submit</Button>
        </Form>
        {showPasswordReset ? '' : showSignupLink }
        {showSignup || badPasswordResetCode ? '' : passwordResetLink}
      </Col>
    </Row>
  )

  console.log("render password form!")

  return (
    <div className="NMAuthComponent">
      {authError ? authErrorMessage : ''}
      {showPasswordReset ? passwordResetInstructions : ''}
      {passwordResetStatus === 'updated' ? loginInstructions : ''}
      {emailSignIn}
      {showPasswordReset ? '' : (
        <div>
          <Row>
            <Col>
              <p className="instructions">or continue with</p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <ButtonGroup className="social-signing-buttons">
                <Button {...mergedButtonProps} onClick={signInWithGoogle}>Google</Button>
                <Button {...mergedButtonProps} disabled={true}>Facebook</Button>
                <Button {...mergedButtonProps} disabled={true}>Twitter</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

const SigninForm = reduxForm({
  form: 'signIn'
})(SigninFormBase)

export default connector(SigninForm);
