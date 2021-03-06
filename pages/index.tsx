import { Box, Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const smallDevice = useMediaQuery('(max-width: 800px)', false);

  return <>
    <Head>
      <title> RPG Insured Auto </title>
    </Head>

    <Grid
      py={40} px={15} m='auto'
      align='center'
      gutter={smallDevice ? 50 : 20}
      style={{ maxWidth: '1080px' }}>

      <Grid.Col span={smallDevice ? 12 : 6} >

        <Stack align={smallDevice ? 'center' : 'flex-start'} spacing={0}>
          <Title style={{ fontSize: smallDevice ? '2rem' : '3rem' }}> RPG Insured Auto </Title>
          <Text align={smallDevice ? 'center' : 'left'}>
            Vehicle Insurance Information System For Rpg Insurance Agency
          </Text>
          <Group spacing={20} mt={40}>
            <Link href='/login'>
              <Button size='md'> Login </Button>
            </Link>
            <Link href='/signup'>
              <Button size='md' variant='outline'> Sign up </Button>
            </Link>
          </Group>
        </Stack>

      </Grid.Col>

      <Grid.Col span={smallDevice ? 12 : 6}>
        <Box style={{
          width: smallDevice ? '45vmax' : '35vmax',
          height: smallDevice ? '45vmax' : '35vmax',
          position: 'relative',
          margin: 'auto'
        }}>
          <Image
            src='/assets/vehicles.jpg'
            alt='vehicles'
            layout='fill'
            style={{ borderRadius: '50%' }} />
        </Box>
      </Grid.Col>

    </Grid>
  </>;
}