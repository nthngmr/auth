'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _reduxForm = require('redux-form');

var _reduxFormValidators = require('redux-form-validators');

var _connector = require('./../connector');

var _connector2 = _interopRequireDefault(_connector);

require('./AuthPage.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      warning = _ref$meta.warning,
      props = _objectWithoutProperties(_ref, ['input', 'label', 'type', 'meta']);

  return _react2.default.createElement(
    'div',
    null,
    label ? _react2.default.createElement(
      'label',
      null,
      label
    ) : '',
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reactstrap.Input, _extends({}, input, props, { type: type, className: error && touched ? 'is-invalid' : '' })),
      touched && (error && _react2.default.createElement(
        _reactstrap.FormFeedback,
        null,
        error
      ) || warning && _react2.default.createElement(
        'span',
        null,
        warning
      ))
    )
  );
};

var SigninFormBase = function SigninFormBase(props) {
  var _React$createElement;

  var handleSubmit = props.handleSubmit,
      signInWithGoogle = props.signInWithGoogle,
      signUpWithEmail = props.signUpWithEmail,
      signInWithEmail = props.signInWithEmail,
      onSignUp = props.onSignUp,
      showSignup = props.showSignup,
      showPasswordReset = props.showPasswordReset,
      onPasswordReset = props.onPasswordReset,
      resetPassword = props.resetPassword,
      buttonProps = props.buttonProps,
      submitting = props.submitting,
      invalid = props.invalid,
      size = props.size,
      passwordResetStatus = props.passwordResetStatus,
      passwordResetError = props.passwordResetError,
      authError = props.authError,
      showPasswordResetForm = props.showPasswordResetForm,
      updatePassword = props.updatePassword,
      badPasswordResetCode = props.badPasswordResetCode;


  var mergedButtonProps = _.merge({ size: '' + (size || 'md'), color: 'primary' }, buttonProps || {});

  var passwordConfirmation = _react2.default.createElement(
    _reactstrap.FormGroup,
    null,
    _react2.default.createElement(
      _reactstrap.Label,
      { 'for': 'passwordConfirmation', hidden: true },
      'Confirm Password'
    ),
    _react2.default.createElement(_reduxForm.Field, {
      component: renderField,
      type: 'password',
      validate: (0, _reduxFormValidators.confirmation)({ field: 'password', fieldLabel: 'Password' }),
      name: 'passwordConfirmation',
      className: 'form-control form-control-' + (size || 'md'),
      id: 'password-confirmation',
      placeholder: 'confirm password'
    })
  );

  var authErrorMessage = _react2.default.createElement(
    _reactstrap.Row,
    null,
    _react2.default.createElement(
      _reactstrap.Col,
      { className: 'auth-error' },
      _react2.default.createElement(
        _reactstrap.Alert,
        { color: 'danger' },
        authError
      )
    )
  );

  var passwordResetLink = showPasswordResetForm && !badPasswordResetCode ? '' : showPasswordReset && !badPasswordResetCode ? _react2.default.createElement(
    'p',
    { className: 'passwordResetLink' },
    _react2.default.createElement(
      'a',
      { href: '#', onClick: function onClick(e) {
          e.preventDefault();onPasswordReset(false);
        } },
      'Click here to login'
    )
  ) : _react2.default.createElement(
    'p',
    { className: 'passwordResetLink' },
    badPasswordResetCode ? 'Want us to send another reset password email?' : 'Forgot your password?',
    ' ',
    _react2.default.createElement(
      'a',
      { href: '#', onClick: function onClick(e) {
          e.preventDefault();onPasswordReset(true);
        } },
      'Click here.'
    )
  );

  var passwordResetInstructions = _react2.default.createElement(
    _reactstrap.Row,
    null,
    _react2.default.createElement(
      _reactstrap.Col,
      { className: 'password-reset-instructions' },
      _react2.default.createElement(
        _reactstrap.Alert,
        { color: passwordResetStatus === 'sent' ? 'success' : passwordResetStatus === 'error' ? 'danger' : 'info' },
        passwordResetStatus === 'error' ? passwordResetError : '',
        passwordResetStatus === 'sent' ? 'Check your email and follow the link provided to reset your password.' : '',
        showPasswordResetForm ? badPasswordResetCode ? passwordResetLink : 'Enter a new password' : 'Enter the email address you used to signup to reset your password.'
      )
    )
  );

  var loginInstructions = _react2.default.createElement(
    _reactstrap.Row,
    null,
    _react2.default.createElement(
      _reactstrap.Col,
      { className: 'password-reset-instructions' },
      _react2.default.createElement(
        _reactstrap.Alert,
        { color: 'success' },
        passwordResetStatus === 'updated' ? 'Your password was successfully. You may now use it to sign into your account' : ''
      )
    )
  );

  var showSignupLink = showSignup ? _react2.default.createElement(
    'p',
    { className: 'signUpLink' },
    'Have an account? ',
    _react2.default.createElement(
      'a',
      { href: '#', onClick: function onClick(e) {
          e.preventDefault();onSignUp(false);
        } },
      'Click here.'
    )
  ) : _react2.default.createElement(
    'p',
    { className: 'signUpLink' },
    'No Account? ',
    _react2.default.createElement(
      'a',
      { href: '#', onClick: function onClick(e) {
          e.preventDefault();onSignUp(true);
        } },
      'Click here.'
    )
  );

  var emailSignIn = _react2.default.createElement(
    _reactstrap.Row,
    null,
    _react2.default.createElement(
      _reactstrap.Col,
      { className: 'emailSignIn' },
      _react2.default.createElement(
        _reactstrap.Form,
        { onSubmit: showSignup ? signUpWithEmail : showPasswordReset ? showPasswordResetForm ? updatePassword : resetPassword : signInWithEmail },
        showPasswordResetForm ? '' : _react2.default.createElement(
          _reactstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactstrap.Label,
            { 'for': 'email', hidden: true },
            'Email'
          ),
          _react2.default.createElement(_reduxForm.Field, {
            component: renderField,
            validate: [(0, _reduxFormValidators.required)(), (0, _reduxFormValidators.email)()],
            type: 'email',
            name: 'email',
            className: 'form-control form-control-' + (size || 'md'),
            id: 'email',
            placeholder: 'email'
          })
        ),
        showPasswordReset && !showPasswordResetForm ? '' : _react2.default.createElement(
          _reactstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactstrap.Label,
            { 'for': 'password', hidden: true },
            'Password'
          ),
          _react2.default.createElement(_reduxForm.Field, (_React$createElement = {
            component: 'input'
          }, _defineProperty(_React$createElement, 'component', renderField), _defineProperty(_React$createElement, 'validate', [(0, _reduxFormValidators.required)(), (0, _reduxFormValidators.length)({ min: 6 })]), _defineProperty(_React$createElement, 'type', 'password'), _defineProperty(_React$createElement, 'name', 'password'), _defineProperty(_React$createElement, 'className', 'form-control form-control-' + (size || 'md')), _defineProperty(_React$createElement, 'id', 'password'), _defineProperty(_React$createElement, 'placeholder', 'password'), _React$createElement))
        ),
        showSignup || showPasswordResetForm ? passwordConfirmation : '',
        _react2.default.createElement(
          _reactstrap.Button,
          _extends({ disabled: submitting || invalid, className: 'float-right' }, mergedButtonProps, { type: 'submit' }),
          'Submit'
        )
      ),
      showPasswordReset ? '' : showSignupLink,
      showSignup || badPasswordResetCode ? '' : passwordResetLink
    )
  );

  console.log("render password form!");

  return _react2.default.createElement(
    'div',
    { className: 'NMAuthComponent' },
    authError ? authErrorMessage : '',
    showPasswordReset ? passwordResetInstructions : '',
    passwordResetStatus === 'updated' ? loginInstructions : '',
    emailSignIn,
    showPasswordReset ? '' : _react2.default.createElement(
      'div',
      null,
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
    )
  );
};

var SigninForm = (0, _reduxForm.reduxForm)({
  form: 'signIn'
})(SigninFormBase);

exports.default = (0, _connector2.default)(SigninForm);