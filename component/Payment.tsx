import {
  Box,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useUserContext, {
  UserContextType,
  UserType,
} from 'contexts/userContext';
import {
  comp_payment_info,
  ctpl_payment_info,
  PaymentType,
} from 'lib/payment_info';
import React from 'react';
import PaymentTable from './PaymentTable';

const getPolicyCode = (type: 'comp' | 'ctp', id: number) => {
  const prefix = type === 'comp' ? 'PC' : 'PCTPL';
  let suffix = '0000000';
  suffix = suffix.slice(id.toString().length);
  return prefix + suffix + id.toString();
};

export default function Payment() {
  const { user }: UserContextType = useUserContext();
  const policyNo = getPolicyCode(
    user.insuranceType || 'comp',
    user.issuePolicyInfo.id
  );
  const paymentInfo =
    user.insuranceType === 'comp' ? comp_payment_info : ctpl_payment_info;
  const form = useForm({ initialValues: { ...paymentInfo, code: policyNo } });

  return (
    <>
      <Stack my={20}>
        <Group>
          <Stack>
            <Text> Policy No: </Text>
            <Text> Name of assured: </Text>
            <Text> Address: </Text>
          </Stack>
          <Stack>
            <Text> {policyNo} </Text>
            <Text> {user.issuePolicyInfo.nameOfAssured} </Text>
            <Text> {user.issuePolicyInfo.address} </Text>
          </Stack>
          <Stack>
            <Text> Deductible: </Text>
            <Text> Towing: </Text>
            <Text> Rep. Lim: </Text>
          </Stack>
          <Stack>
            <NumberInput {...form.getInputProps('deductible')} size='xs' />
            <NumberInput {...form.getInputProps('towing')} size='xs' />
            <NumberInput {...form.getInputProps('repLim')} size='xs' />
          </Stack>
        </Group>
        <PaymentTable form={form} />
      </Stack>
    </>
  );
}
