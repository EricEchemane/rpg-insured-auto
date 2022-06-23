import { Box, Group, NumberInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import useUserContext, { UserContextType, UserType } from 'contexts/userContext';
import { comp_payment_info, ctpl_payment_info, PaymentType } from 'lib/payment_info';
import React from 'react';
import PaymentTable from './PaymentTable';

const getPolicyCode = (type: "comp" | "ctp", id: number) => {
    const prefix = type === 'comp' ? 'PC' : 'PCTPL';
    let suffix = "0000000";
    suffix = suffix.slice(id.toString().length);
    return prefix + suffix + id.toString();
};

export default function Payment() {
    const { user }: UserContextType = useUserContext();
    const policyNo = getPolicyCode(user.insuranceType || "comp", user.issuePolicyInfo.id);
    const paymentInfo = user.insuranceType === 'comp' ? comp_payment_info : ctpl_payment_info;
    const form = useForm({ initialValues: paymentInfo });

    return (
        <>
            <Stack my={20}>
                <Group>
                    <Stack spacing={0}>
                        <Text weight={600}> Policy No: </Text>
                        <Text weight={600}> Name of assured: </Text>
                        <Text weight={600}> Address: </Text>
                    </Stack>
                    <Stack spacing={0}>
                        <Text> {policyNo} </Text>
                        <Text> {user.issuePolicyInfo.nameOfAssured} </Text>
                        <Text> {user.issuePolicyInfo.address} </Text>
                    </Stack>
                    <Stack spacing={0}>
                        <Text weight={600}> Deductible: </Text>
                        <Text weight={600}> Towing: </Text>
                        <Text weight={600}> Rep. Lim: </Text>
                    </Stack>
                    <Stack spacing={0}>
                        <NumberInput
                            {...form.getInputProps('deductible')}
                            size='xs' />
                        <NumberInput
                            {...form.getInputProps('towing')}
                            size='xs' />
                        <NumberInput
                            {...form.getInputProps('repLim')}
                            size='xs' />
                    </Stack>
                </Group>
                <PaymentTable form={form} />
            </Stack>
        </>
    );
}
