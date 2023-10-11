import {
  Anchor,
  Button,
  Center,
  LoadingOverlay,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useFetch from 'modules/useFetch';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Signup() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 7 ? null : 'Password must be 8 characters or more',
      confirmPassword: (value, values) =>
        value === values.password ? null : "Password don't match",
    },
  });

  const { loading, post, succeeded } = useFetch('/api/users/add', {
    method: 'POST',
    body: JSON.stringify(form.values),
  });

  const handleSubmit = async () => {
    const validation = form.validate();
    if (validation.hasErrors === false) {
      const data = await post();
      if (!data) {
        form.setErrors({
          email: 'Email already used',
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title> Sign up - RPG Insured Auto </title>
      </Head>

      <Modal
        opened={succeeded}
        onClose={() => {}}
        centered
        withCloseButton={false}
      >
        <Title order={3}> Your account has been created! </Title>
        <Center mt={20}>
          <Link href='/login'>
            <Button color='green'> Login to my account </Button>
          </Link>
        </Center>
      </Modal>

      <div
        style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Paper
          m='3rem auto'
          p={30}
          radius='md'
          shadow='md'
          withBorder
          style={{
            width: 'min(400px,90vw)',
            position: 'relative',
            margin: 'auto',
          }}
        >
          <LoadingOverlay visible={loading} />

          <Stack mb={30}>
            <Title order={2}> Sign up </Title>
            <Text> Start by creating your account </Text>
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
            <PasswordInput
              id='confirm-password'
              placeholder='Confirm Password'
              required
              {...form.getInputProps('confirmPassword')}
            />
            <Button size='md' mt={20} disabled={loading} onClick={handleSubmit}>
              {' '}
              SIGN UP{' '}
            </Button>

            <Anchor size='sm' color='dimmed' href='/login'>
              Already have an account? Login instead
            </Anchor>
          </Stack>
        </Paper>
      </div>
    </>
  );
}
