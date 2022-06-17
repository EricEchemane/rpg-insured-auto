import { Paper, Title, Button } from '@mantine/core';
import useUserContext, { UserContextType } from 'contexts/userContext';
import React from 'react';

export default function CTPContent() {
    const { user, setInsuranceType }: UserContextType = useUserContext();
    return (
        <>
            <Paper
                p={20} mb={15}
                withBorder
                radius={10}
                shadow='md'
                style={{ border: user.insuranceType === "ctp" ? '2px solid orange' : 'none' }}>

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
                    onClick={() => setInsuranceType("ctp")}
                    variant='outline'> SELECT </Button>
            </Paper>
        </>
    );
}
