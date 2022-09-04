import Cookies from "js-cookie";
import Button from "../nsw/ui/components/Button";
import TextField from "../nsw/ui/components/TextField";

// others
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  ACCESS_TOKEN,
  IS_DEMO_MOE,
  IS_LOGGED_IN_KEY,
  IS_LOGGED_IN_VALUE,
} from "../config/app";
import { DEMO_ADMINS, DEMO_USERS } from "../config/constants";
import { useLoginMutation } from "../hooks/useLoginMutation";
import Alert from "../nsw/ui/components/Alert";
import Card from "../nsw/ui/components/Card";
import CardContent from "../nsw/ui/components/CardContent";
import CardHeader from "../nsw/ui/components/CardHeader";
import Typography from "../nsw/ui/components/Typography";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginMutation();
  const [message, setMessage] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, touchedFields },
    setError,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * run before submit
   *
   * @return void
   */
  function onBeforeSubmit(): void {
    setMessage(null);
  }

  /**
   * set cookie in client
   *
   * @param accessToken string
   */
  function setCookie(accessToken: string) {
    Cookies.set(IS_LOGGED_IN_KEY, IS_LOGGED_IN_VALUE);
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  /**
   * handle submit
   *
   * @param values any
   */
  async function onSubmit({ username, password }: FormValues) {
    onBeforeSubmit();

    mutate(
      {
        username,
        password,
      },
      {
        onSuccess: ({ data: { accessToken } }) => {
          setCookie(accessToken);
          navigate("/");
        },
        onError: (error: any) => {
          setMessage(
            error.message ? error.message : "Incorrect phone or password.",
          );
        },
      },
    );
  }

  return (
    <Layout>
      {message && (
        <Alert className="mb-4" severity="error">
          {message}
        </Alert>
      )}

      <Card cardLoading={isLoading}>
        <CardHeader
          title="Login"
          subheader="Please sign in to continue"
          className="px-6 pt-6 pb-4"
        />

        {IS_DEMO_MOE && (
          <div className="p-6">
            <div className="mb-1">Demo Users</div>
            {[...DEMO_ADMINS, ...DEMO_USERS].map(
              ({ username, password }, index) => (
                <div key={index} className="mb-1">
                  <p>username: {username}</p>
                  <p>password: {password}</p>
                </div>
              ),
            )}
          </div>
        )}

        <CardContent className="pt-4 px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <div className="space-y-4">
                <div>
                  <Typography className="text-gray-600 dark:text-white mb-2">
                    Username
                  </Typography>

                  <TextField
                    {...register("username", {
                      required: "username is required field",
                      maxLength: {
                        value: 255,
                        message: "username must be at most 255 characters",
                      },
                    })}
                    placeholder="Username"
                    fullWidth
                    disabled={isLoading}
                    error={
                      touchedFields.username &&
                      errors.username &&
                      Boolean(errors.username)
                    }
                    helperText={
                      touchedFields.username &&
                      errors.username &&
                      errors.username.message
                    }
                  />
                </div>

                <div>
                  <Typography className="text-gray-600 dark:text-white mb-2">
                    Password
                  </Typography>

                  <TextField
                    {...register("password", {
                      required: "password is required field",
                    })}
                    type="password"
                    placeholder="Password"
                    fullWidth
                    disabled={isLoading}
                    error={
                      touchedFields.password &&
                      errors.password &&
                      Boolean(errors.password)
                    }
                    helperText={
                      touchedFields.password &&
                      errors.password &&
                      errors.password.message
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              className="bg-blue-600 text-white"
              disabled={isLoading || !(isValid && isDirty)}
            >
              {isLoading ? "Please Wait..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LoginPage;
