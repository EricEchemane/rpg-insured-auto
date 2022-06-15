import { Anchor, Button, Center, LoadingOverlay, Modal, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import useFetch from 'modules/useFetch';
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
            password: (value) => (value.length > 7 ? null : 'Password must be 8 characters or more'),
            confirmPassword: (value, values) => (value === values.password ? null : 'Password don\'t match'),
        },
    });

    const { loading, post, succeeded } = useFetch('/api/users/add', {
        method: 'POST',
        body: JSON.stringify(form.values)
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

    return <>
        <Modal
            opened={succeeded}
            onClose={() => { }}
            centered
            overlayOpacity={0.5}
            withCloseButton={false}
        >
            <Title order={3} align='center'> Your account has been created! </Title>
            <Center mt={20}>
                <Link href='/login'>
                    <Button color='green'> Login to my account </Button>
                </Link>
            </Center>
        </Modal>

        <Paper
            m='3rem auto' p={30}
            radius='md'
            shadow='md'
            withBorder
            style={{ width: 'min(400px,90vw)', position: 'relative' }}>

            <LoadingOverlay visible={loading} />

            <Stack spacing={5} mb={30}>
                <Title order={2}> Sign up </Title>
                <Text> Start by creating your account </Text>
            </Stack>

            <Stack spacing={20}>
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
                <Button
                    size='md'
                    mt={20}
                    disabled={loading}
                    onClick={handleSubmit}> SIGN UP </Button>

                <Anchor
                    align='center'
                    size='sm'
                    color='dimmed'
                    href='/login'>
                    Already have an account? Login instead
                </Anchor>
            </Stack>
        </Paper>
    </>;
}
