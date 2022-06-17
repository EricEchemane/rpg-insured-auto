import { Paper, Title, Button } from '@mantine/core';
import useUserContext, { UserContextType } from 'contexts/userContext';
import React from 'react';

export default function CompContent() {
    const { user, setInsuranceType }: UserContextType = useUserContext();
    return (
        <>
            <Paper
                p={20} mb={15}
                withBorder
                radius={10}
                shadow='md'
                style={{ border: user.insuranceType === "comp" ? '2px solid orange' : 'none' }}>

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
                    onClick={() => setInsuranceType("comp")}
                    variant='outline'> SELECT </Button>
            </Paper>
        </>
    );
}
