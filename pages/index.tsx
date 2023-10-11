import { Box, Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Mail, Phone, User } from 'tabler-icons-react';

export default function Home() {
  const smallDevice = useMediaQuery('(max-width: 800px)', false);

  return (
    <>
      <Head>
        <title> RPJ Insured Auto </title>
      </Head>

      <Grid
        py={40}
        px={15}
        m='auto'
        align='center'
        gutter={smallDevice ? 50 : 20}
        style={{ maxWidth: '1080px' }}
      >
        <Grid.Col span={smallDevice ? 12 : 6}>
          <Stack align={smallDevice ? 'center' : 'flex-start'}>
            <Title style={{ fontSize: smallDevice ? '2rem' : '3rem' }}>
              RPJ Insured Auto
            </Title>
            <Text>
              Vehicle Insurance Information System For Rpg Insurance Agency
            </Text>
            <Group mt={40}>
              <Link href='/login'>
                <Button size='md'> Login </Button>
              </Link>
              <Link href='/signup'>
                <Button size='md' variant='outline'>
                  Sign up
                </Button>
              </Link>
            </Group>

            <Title mt={40} mb={10} order={2}>
              Contact Us
            </Title>
            <Group align={'center'} mb='xs'>
              <User />
              <Text>Rollyprecyjavobepg</Text>
            </Group>
            <Group align={'center'} mb='xs'>
              <Phone />
              <Text>09959750550</Text>
            </Group>
            <Group align={'center'} mb='xs'>
              <Mail />
              <Text>rollyprecyjacobrpg@gmail.com</Text>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={smallDevice ? 12 : 6}>
          <Box
            style={{
              width: smallDevice ? '45vmax' : '35vmax',
              height: smallDevice ? '45vmax' : '35vmax',
              position: 'relative',
              margin: 'auto',
            }}
          >
            <Image
              height={500}
              width={500}
              src='/assets/vehicles.jpg'
              alt='vehicles'
              style={{ borderRadius: '50%', marginTop: '10%' }}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
}
