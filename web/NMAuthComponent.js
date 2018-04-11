'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      showSignup = props.showSignup,
      buttonProps = props.buttonProps,
      size = props.size;


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
      className: 'form-control form-control-' + (size || 'md'),
      id: 'password',
      placeholder: 'confirm password'
    })
  );

  var mergedButtonProps = _.merge({ size: '' + (size || 'md'), color: 'primary' }, buttonProps || {});

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
            className: 'form-control form-control-' + (size || 'md'),
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
            className: 'form-control form-control-' + (size || 'md'),
            id: 'password',
            placeholder: 'password'
          })
        ),
        showSignup ? passwordConfirmation : '',
        _react2.default.createElement(
          _reactstrap.Button,
          _extends({ className: 'float-right' }, mergedButtonProps, { type: 'submit' }),
          'Submit'
        )
      ),
      showSignup ? _react2.default.createElement(
        'p',
        { className: 'signUpLink' },
        'Have an account? ',
        _react2.default.createElement(
          'a',
          { href: '#', onClick: function onClick() {
              onSignUp(false);
            } },
          'Click here.'
        )
      ) : _react2.default.createElement(
        'p',
        { className: 'signUpLink' },
        'No Account? ',
        _react2.default.createElement(
          'a',
          { href: '#', onClick: function onClick() {
              onSignUp(true);
            } },
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
      _react2.default.createElement(
        _reactstrap.Col,
        null,
        _react2.default.createElement(
          'p',
          { className: 'instructions' },
          'or continue with'
        )
      )
    ),
    _react2.default.createElement(
      _reactstrap.Row,
      null,
      _react2.default.createElement(
        _reactstrap.Col,
        { className: 'd-flex justify-content-center' },
        _react2.default.createElement(
          _reactstrap.ButtonGroup,
          { className: 'social-signing-buttons' },
          _react2.default.createElement(
            _reactstrap.Button,
            _extends({}, mergedButtonProps, { onClick: signInWithGoogle }),
            'Google'
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            _extends({}, mergedButtonProps, { disabled: true }),
            'Facebook'
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            _extends({}, mergedButtonProps, { disabled: true }),
            'Twitter'
          )
        )
      )
    )
  );
};

var SigninForm = (0, _reduxForm.reduxForm)({
  form: 'signIn'
})(SigninFormBase);

exports.default = (0, _connector2.default)(SigninForm);