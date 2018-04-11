import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import connector from './../connector';
import './AuthPage.css';

let SigninFormBase = props => {
  const {
    handleSubmit,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    onSignUp,
    showSignup,
    buttonProps,
    size
  } = props;

  const passwordConfirmation = (
    <FormGroup>
      <Label for="passwordConfirmation" hidden>Confirm Password</Label>
      <Field
        component="input"
        type="password"
        name="passwordConfirmation"
        className={`form-control form-control-${size || 'md'}`}
        id="password"
        placeholder="confirm password"
      />
    </FormGroup>
  )

  const mergedButtonProps = _.merge({size: `${size || 'md'}`, color: 'primary'}, buttonProps || {})

  const emailSignIn = (
    <Row>
      <Col className="emailSignIn">
        <Form onSubmit={ showSignup ? signUpWithEmail : signInWithEmail }>
          <FormGroup>
            <Label for="email" hidden>Email</Label>
            <Field
              component="input"
              type="email"
              name="email"
              className={`form-control form-control-${size || 'md'}`}
              id="email"
              placeholder="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" hidden>Password</Label>
            <Field
              component="input"
              type="password"
              name="password"
              className={`form-control form-control-${size || 'md'}`}
              id="password"
              placeholder="password"
            />
          </FormGroup>
          {showSignup ? passwordConfirmation : ''}
          <Button className="float-right" {...mergedButtonProps} type="submit">Submit</Button>
        </Form>
        {showSignup ? <p className="signUpLink">Have an account? <a href="#" onClick={() => { onSignUp(false) } }>Click here.</a></p> : <p className="signUpLink">No Account? <a href="#" onClick={() => { onSignUp(true) } }>Click here.</a></p>}
      </Col>
    </Row>
  )

    return (
      <div className="NMAuthComponent">
        {emailSignIn}
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
    );
}

const SigninForm = reduxForm({
  form: 'signIn'
})(SigninFormBase)

export default connector(SigninForm);
