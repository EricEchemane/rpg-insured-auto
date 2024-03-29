import {
  Paper,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useUserContext, { UserContextType } from 'contexts/userContext';
import useFetch from 'modules/useFetch';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function Login() {
  const userContext: UserContextType = useUserContext();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.trim().length > 0 ? null : "Can't login without your password",
    },
  });

  const { loading, post } = useFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(form.values),
  });

  const handleSubmit = async () => {
    const validation = form.validate();
    if (validation.hasErrors === false) {
      const data = await post();
      if (!data) {
        form.setFieldError('password', 'Something is incorrect');
      } else {
        userContext.setEmail(form.values.email);
        document.cookie = 'email=' + data.token;
        router.replace('/insurance');
      }
    }
  };

  return (
    <>
      <Head>
        <title> Login - RPG Insured Auto </title>
      </Head>
      <div
        style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Paper
          m='3rem auto'
          p={30}
          radius='md'
          shadow='md'
          withBorder
          style={{ width: 'min(400px,90vw)', position: 'relative' }}
        >
          <LoadingOverlay visible={loading} />

          <Stack mb={30}>
            <Title order={2}> Login </Title>
          </Stack>

          <Stack>
            <TextInput
              id='email'
              placeholder='Email'
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              id='password'
              placeholder='Password'
              required
              {...form.getInputProps('password')}
            />

            <Button size='md' mt={20} disabled={loading} onClick={handleSubmit}>
              {' '}
              LOGIN{' '}
            </Button>

            <Anchor size='sm' color='dimmed' href='/signup'>
              {"Don't have an account? Sign up instead"}
            </Anchor>
          </Stack>
        </Paper>
      </div>
    </>
  );
}
