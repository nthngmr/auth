'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _reduxForm = require('redux-form');

var _connector = require('./../connector');

var _connector2 = _interopRequireDefault(_connector);

require('./AuthPage.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SigninFormBase = function SigninFormBase(props) {
  var handleSubmit = props.handleSubmit,
      signInWithGoogle = props.signInWithGoogle,
      signUpWithEmail = props.signUpWithEmail,
      signInWithEmail = props.signInWithEmail,
      onSignUp = props.onSignUp,
      showSignup = props.showSignup;


  var passwordConfirmation = _react2.default.createElement(
    _reactstrap.FormGroup,
    null,
    _react2.default.createElement(
      _reactstrap.Label,
      { 'for': 'passwordConfirmation', hidden: true },
      'Confirm Password'
    ),
    _react2.default.createElement(_reduxForm.Field, {
      component: 'input',
      type: 'password',
      name: 'passwordConfirmation',
      className: 'form-control form-control-sm',
      id: 'password',
      placeholder: 'confirm password'
    })
  );

  var emailSignIn = _react2.default.createElement(
    _reactstrap.Row,
    null,
    _react2.default.createElement(
      _reactstrap.Col,
      { className: 'emailSignIn' },
      _react2.default.createElement(
        _reactstrap.Form,
        { onSubmit: showSignup ? signUpWithEmail : signInWithEmail },
        _react2.default.createElement(
          _reactstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactstrap.Label,
            { 'for': 'email', hidden: true },
            'Email'
          ),
          _react2.default.createElement(_reduxForm.Field, {
            component: 'input',
            type: 'email',
            name: 'email',
            className: 'form-control form-control-sm',
            id: 'email',
            placeholder: 'email'
          })
        ),
        _react2.default.createElement(
          _reactstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactstrap.Label,
            { 'for': 'password', hidden: true },
            'Password'
          ),
          _react2.default.createElement(_reduxForm.Field, {
            component: 'input',
            type: 'password',
            name: 'password',
            className: 'form-control form-control-sm',
            id: 'password',
            placeholder: 'password'
          })
        ),
        showSignup ? passwordConfirmation : '',
        _react2.default.createElement(
          _reactstrap.Button,
          { className: 'float-right', color: 'primary', size: 'sm', type: 'submit' },
          'Submit'
        )
      ),
      showSignup ? '' : _react2.default.createElement(
        'p',
        { className: 'signUpLink' },
        'No Account? ',
        _react2.default.createElement(
          'a',
          { href: '#', onClick: onSignUp },
          'Click here.'
        )
      )
    )
  );

  return _react2.default.createElement(
    'div',
    { className: 'NMAuthComponent' },
    emailSignIn,
    _react2.default.createElement(
      _reactstrap.Row,
      null,
      _react2.default.createElement(_reactstrap.Col, { md: '1' }),
      _react2.default.createElement(
        _reactstrap.Col,
        { md: '10', className: 'socialSignin justify-content-md-center' },
        _react2.default.createElement(
          'p',
          { className: 'instructions' },
          'or continue with'
        ),
        _react2.default.createElement(
          _reactstrap.ButtonGroup,
          { className: 'social-signing-buttons' },
          _react2.default.createElement(
            _reactstrap.Button,
            { size: 'sm', color: 'primary', onClick: signInWithGoogle },
            'Google'
          ),
          ' ',
          _react2.default.createElement(
            _reactstrap.Button,
            { size: 'sm', color: 'primary', disabled: true },
            'Facebook'
          ),
          ' ',
          _react2.default.createElement(
            _reactstrap.Button,
            { size: 'sm', color: 'primary', disabled: true },
            'Twitter'
          )
        )
      ),
      _react2.default.createElement(_reactstrap.Col, { md: '1' })
    )
  );
};

var SigninForm = (0, _reduxForm.reduxForm)({
  form: 'signIn'
})(SigninFormBase);

exports.default = (0, _connector2.default)(SigninForm);