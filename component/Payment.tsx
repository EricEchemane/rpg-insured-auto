import { Group, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import useUserContext, { UserContextType, UserType } from 'contexts/userContext';
import React from 'react';

const getPolicyCode = (type: "comp" | "ctp", id: number) => {
    const prefix = type === 'comp' ? 'PC' : 'PCTPL';
    let suffix = "0000000";
    suffix = suffix.slice(id.toString().length);
    return prefix + suffix + id.toString();
};

export default function Payment() {
    const { user }: UserContextType = useUserContext();
    const policyNo = getPolicyCode(user.insuranceType, user.issuePolicyInfo.id);
    return (
        <>
            <Stack my={20}>
                <Group>
                    <Stack>
                        <Text weight={600}> Policy No: </Text>
                        <Text weight={600}> Name of assured: </Text>
                        <Text weight={600}> Address: </Text>
                    </Stack>
                    <Stack>
                        <Text> {policyNo} </Text>
                        <Text> {user.issuePolicyInfo.nameOfAssured} </Text>
                        <Text> {user.issuePolicyInfo.address} </Text>
                    </Stack>
                </Group>
                <Group>
                    <Stack>
                        <NumberInput label='Deductible' placeholder='Deductible' size='xs' />
                        <NumberInput label='Towing' placeholder='Towing' size='xs' />
                        <NumberInput label='Rep. Lim' placeholder='Rep. Lim' size='xs' />
                    </Stack>
                </Group>
            </Stack>
        </>
    );
}
