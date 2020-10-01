import Typography from "../../components/Typography/Typography";
import AppForm from "../../components/AppForm/AppForm";
import React, { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import { email, required, name } from "../../form/validation";
import RFTextField from "../../form/RFTextField";
import FormButton from "../../form/FormButton";
import FormFeedback from "../../form/FormFeedback";
import { withAuth } from "../../components/Authentication/Authentication";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const deaultValues = {
  name: "",
  email: "",
  password: "",
};

const deaultErrors = {
  name: undefined,
  email: undefined,
  password: undefined,
};

const SignUp = (authenticate) => {
  const location = useLocation();

  const classes = useStyles();

  const [values, setValues] = useState(deaultValues);

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState(deaultErrors);

  const [submitError, setSubmitError] = useState(false);

  const { from } = location.state || { from: { pathname: "/" } };

  const [authData, setAuthData] = useState({
    isLoggingIn: true,
    redirectToReferrer: false,
    hasAuthenticationFailed: false,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    const validateErrors = required(["email", "password", "name"], values);

    if (!validateErrors.email || !validateErrors.name) {
      const emailError = email(values.email, values);
      const nameError = name(values.name, values);
      if (emailError) {
        validateErrors.email = email(values.email, values);
      }
      if (nameError) {
        validateErrors.name = name(values.name, values);
      }
    }

    return validateErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }
    try {
      setSubmitting(true);
      const resp = await authenticate(
        values.email,
        values.password,
        values.name
      );
      setSubmitting(false);
      if (resp.status === 200) {
        setAuthData({
          isLoggingIn: false,
          redirectToReferrer: true,
          hasAuthenticationFailed: false,
        });
      } else {
        const error = await resp.json();
        setSubmitError(error.message);
      }
    } catch (error) {
      setAuthData({
        isLoggingIn: false,
        redirectToReferrer: false,
        hasAuthenticationFailed: true,
      });
      setSubmitting(false);
    }
  };
  return (
    <AppForm>
      <>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign Up
        </Typography>
      </>
      <form className={classes.root} autoComplete="off" noValidate>
        <RFTextField
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          disabled={submitting}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          error={errors.email}
          size="large"
          value={values.email}
        />
        <RFTextField
          fullWidth
          size="large"
          onChange={handleChange}
          disabled={submitting}
          error={errors.name}
          name="name"
          autoComplete="name"
          label="Name"
          type="string"
          margin="normal"
          value={values.name}
        />

        <RFTextField
          fullWidth
          size="large"
          onChange={handleChange}
          disabled={submitting}
          error={errors.password}
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
          margin="normal"
          value={values.password}
        />
        <RFTextField
          fullWidth
          size="large"
          onChange={handleChange}
          disabled={submitting}
          error={errors.password}
          name="password"
          autoComplete="current-password"
          label="Password Confirmation"
          type="password"
          margin="normal"
          value={values.password}
        />
        {/* 不太知道怎么显示这个feedback出来 */}
        {submitError ? (
          <FormFeedback className={classes.feedback} error>
            {submitError}
          </FormFeedback>
        ) : null}

        <FormButton
          className={classes.button}
          disabled={submitting}
          size="large"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
        >
          {"Sign Up"}
        </FormButton>
      </form>
    </AppForm>
  );
};

export default SignUp;
