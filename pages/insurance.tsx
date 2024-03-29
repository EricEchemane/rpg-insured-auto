import {
  Button,
  Container,
  Paper,
  Stack,
  Stepper,
  Text,
  Title,
} from '@mantine/core';
import CompContent from 'component/CompContent';
import CTPContent from 'component/CTPContent';
import IssuePolicy from 'component/IssuePolicy';
import useUserContext, {
  UserContextType,
  UserType,
} from 'contexts/userContext';
import prisma from 'lib/prisma_client';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Printing from 'component/Printing';
import { useRouter } from 'next/router';
import Payment from 'component/Payment';

export default function Insurance({ _user }: any) {
  const { user, setUser }: UserContextType = useUserContext();
  const [active, setActive] = useState(0);
  const router = useRouter();
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (!_user) {
      router.replace('/');
      return;
    }

    if (!_user.insurance) {
      setUser((prev: UserType) => ({
        ...prev,
        email: _user.email,
        insuranceType: _user.insuranceType,
      }));
      return;
    }
    const issuePolicyInfo = {
      id: _user.insurance.id,
      nameOfAssured: _user.insurance.nameOfAssured,
      address: _user.insurance.address,
      issueDate: _user.insurance.issueDate,
      inceptionDate: _user.insurance.inceptionDate,
      expiryDate: _user.insurance.expiryDate,
      MVFileNumber: _user.insurance.MVFileNumber,
      COCNumber: _user.insurance.COCNumber,
      MakeOrDescription: _user.insurance.MakeOrDescription,
      UnitTypeORBodytType: _user.insurance.UnitTypeORBodytType,
      YearModel: _user.insurance.YearModel,
      color: _user.insurance.color,
      EngineOrmotorNumber: _user.insurance.EngineOrmotorNumber,
      ChassisNumber: _user.insurance.ChassisNumber,
      PlateNumber: _user.insurance.PlateNumber,
      unitPrice: _user.insurance.unitPrice,
      MortgageFinancing: _user.insurance.MortgageFinancing,
    };
    setUser({
      email: _user.email,
      insuranceType: _user.insuranceType,
      issuePolicyInfo: issuePolicyInfo,
    });
  }, [_user, router, setUser]);

  return (
    <>
      <Head>
        {' '}
        <title> RPG Insurance </title>{' '}
      </Head>
      <Container style={{ height: 'auto' }}>
        <Paper p={20}>
          <Stack mb={40} mt={10}>
            <Title order={4}> {user.email} </Title>
            <Text> Follow the steps below very carefully </Text>
          </Stack>

          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label='First step' description='Select insurance'>
              <Text my={20}> Please select one </Text>
              <CompContent />
              <CTPContent />
              <Button mt={20} onClick={nextStep}>
                {' '}
                NEXT STEP{' '}
              </Button>
            </Stepper.Step>

            <Stepper.Step label='2nd step' description='Issue Policy'>
              <IssuePolicy nextStep={nextStep} prevStep={prevStep} />
            </Stepper.Step>

            <Stepper.Step label='3rd step' description='Printing'>
              <Printing nextStep={nextStep} prevStep={prevStep} />
            </Stepper.Step>

            <Stepper.Step label='4th step' description='Payment'>
              <Payment />
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let _user = null;
  try {
    const cookies = context.req.cookies;
    const token = cookies.email;
    const signature = process.env.SIGNATURE;

    let email: any;
    if (signature && token) email = jwt.verify(token, signature);
    else return;

    _user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        insurance: true,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return { props: { _user } };
  }
}
