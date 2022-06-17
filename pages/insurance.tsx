import { Button, Container, Paper, Stack, Stepper, Text, Title } from '@mantine/core';
import CompContent from 'component/CompContent';
import CTPContent from 'component/CTPContent';
import IssuePolicy from 'component/IssuePolicy';
import useUserContext, { UserContextType } from 'contexts/userContext';
import Head from 'next/head';
import React, { useState } from 'react';

export default function Insurance() {
    const { user }: UserContextType = useUserContext();
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return <>
        <Head> <title> RPG Insurance </title> </Head>
        <Container style={{ height: 'auto' }}>
            <Paper p={20}>

                <Stack spacing={0} mb={40} mt={10}>
                    <Title order={4}> {user.email} </Title>
                    <Text> Follow the steps below very carefully </Text>
                </Stack>

                <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                    <Stepper.Step
                        allowStepSelect={active > 0}
                        label="First step"
                        description="Select insurance">
                        <Text my={20} > Please select one </Text>
                        <CompContent />
                        <CTPContent />
                        <Button mt={20} onClick={nextStep}> NEXT STEP </Button>
                    </Stepper.Step>

                    <Stepper.Step
                        allowStepSelect={active > 1}
                        label="2nd step"
                        description="Issue Policy">
                        <IssuePolicy nextStep={nextStep} prevStep={prevStep} />
                    </Stepper.Step>
                </Stepper>

            </Paper>
        </Container>
    </>;
}
