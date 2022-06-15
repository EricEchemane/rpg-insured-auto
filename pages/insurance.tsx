import { Button, Container, Grid, Paper, Spoiler, Stack, Stepper, Text, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import UserContext from 'contexts/userContext';
import Head from 'next/head';
import React, { useContext, useState } from 'react';

export default function Insurance() {
    const { user } = useContext(UserContext);
    const [active, setActive] = useState(0);
    const [selectedInsurance, setSelectedInsurance] = useState<number>(-1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
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
                        <Paper
                            p={20} mb={15}
                            withBorder
                            radius={10}
                            shadow='md'
                            style={{ border: selectedInsurance === 0 ? '2px solid orange' : 'none' }}>

                            <Title mb={10} order={4}> Comprehensive Insurance </Title>

                            <div>
                                Comprehensive insurance is a type of automobile insurance that covers damage to your car from causes other than a collision. Comprehensive insurance will cover your vehicle if destroyed by a tornado, dented by a run-in with a deer, spray-painted by a vandal, damaged by a break-in, or crushed by a collapsing garage, among other causes. Comprehensive insurance, collision insurance, and liability insurance are the three components of an automobile insurance policy. In most states, the law requires drivers to carry liability insurance, but collision and comprehensive insurance are optional if someone owns a vehicle outright. 1f a person has financed the vehicle, the auto loan company might require comprehensive insurance.
                                <Title order={6} mb={10} mt={30}> KEY TAKEAWAYS </Title>
                                Comprehensive insurance is designed to pay for repairs to your vehicle caused by things other than a collision.
                                If you finance a vehicle purchase, you may be required to purchase comprehensive coverage as well as collision coverage.
                                Purchasing comprehensive coverage may not make sense financially if you drive an older vehicle that is already lost a significant amount of value.
                                Raising your deductibles for comprehensive insurance could help to lower your premiums.
                            </div>

                            <Button
                                mt={20}
                                onClick={() => setSelectedInsurance(0)}
                                variant='outline'> SELECT </Button>
                        </Paper>

                        <Paper
                            p={20} mb={15}
                            withBorder
                            radius={10}
                            shadow='md'
                            style={{ border: selectedInsurance === 1 ? '2px solid orange' : 'none' }}>

                            <Title mb={10} order={4}> {'Compulsory Third Party (CTP) insurance'} </Title>

                            <div>
                                Your Compulsory Third Party (CTP) insurance is paid at the same time as your motor vehicle registration. Just as registration of your vehicle is compulsory, so is CTP insurance.
                                <br /><br />
                                The Policy of Insurance protects you (and other people who use your registered and insured vehicle, with or without your consent) against the financial impact of causing injury or death to other road users through the use of your vehicle anywhere in the Philippines

                                <Title order={5} mb={10} mt={30}> {'CTP insurance does not cover:'} </Title>

                                damage to property (including to a vehicle or its contents)
                                an at-fault cyclist who injures themselves or another road user
                                causing injury or death to another participant in a road race
                                the driver of a single car accident, for example if you hit a tree (with the exception of very serious, lifelong injuries which may be covered under the Lifetime Support Scheme).
                                If you fail to perform the obligations outlined in the Policy of Insurance and your conduct causes an injury, the insurer has the right to potentially recover from you the costs of injury claims arising out of that accident.

                                <Title order={5} mt={30}> {'Obligations under the Policy of Insurance include not:'} </Title>

                                <ul>
                                    <li> driving while under the influence of alcohol or drugs </li>
                                    <li> driving dangerously </li>
                                    <li> intentionally causing injury </li>
                                    <li> driving a vehicle without the owner’s permission </li>
                                    <li> driving without holding a current driver’s licence </li>
                                    <li> driving an unroadworthy or overloaded vehicle </li>
                                </ul>
                            </div>

                            <Button
                                mt={20}
                                onClick={() => setSelectedInsurance(1)}
                                variant='outline'> SELECT </Button>
                        </Paper>

                        <Button mt={20} onClick={nextStep}> NEXT STEP </Button>
                    </Stepper.Step>

                    <Stepper.Step
                        allowStepSelect={active > 1}
                        label="2nd step"
                        description="Issue Policy">
                        Step 2
                    </Stepper.Step>
                </Stepper>

            </Paper>
        </Container>
    </>;
}
