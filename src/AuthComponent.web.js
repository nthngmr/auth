import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

let SigninFormBase = props => {
  const { 
    handleSubmit, 
    signInWithGoogle, 
    signUpWithEmail, 
    signInWithEmail,
    onSignUp,
    showSignup
  } = props;

  const passwordConfirmation = (
    <FormGroup>
      <Label for="passwordConfirmation" hidden>Confirm Password</Label>
      <Field
        component="input"
        type="password"
        name="passwordConfirmation"
        className="form-control form-control-sm"
        id="password"
        placeholder="confirm password"
      />
    </FormGroup>
  )

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
              className="form-control form-control-sm"
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
              className="form-control form-control-sm"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          {showSignup ? passwordConfirmation : ''}
          <Button className="float-right" color="primary" size="sm" type="submit">Submit</Button>
        </Form>
        {showSignup ? '' : <p className="signUpLink">No Account? <a href="#" onClick={onSignUp}>Click here.</a></p>}
      </Col>
    </Row>
  )

    return (
      <div>
        {emailSignIn}
        <Row>
          <Col md="1"></Col>
          <Col md="10" className="socialSignin justify-content-md-center">
            <p className="instructions">Sign in with social media</p>   
            <ButtonGroup className="social-signing-buttons">
              <Button size="sm" color="primary" onClick={signInWithGoogle}>Google</Button>{' '}
              <Button size="sm" color="primary" disabled={true}>Facebook</Button>{' '}
              <Button size="sm" color="primary" disabled={true}>Twitter</Button>
            </ButtonGroup>
          </Col>
          <Col md="1"></Col>
        </Row>
      </div>
    );
}

const SigninForm = reduxForm({
  // a unique name for the form
  form: 'signIn'
})(SigninFormBase)

export default SigninForm;
  