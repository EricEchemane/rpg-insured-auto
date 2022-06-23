import { Button, Group, NumberInput, Table, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useForm } from '@mantine/form';
import { PaymentType } from 'lib/payment_info';
import React from 'react';
import useFetch from 'modules/useFetch';
import { showNotification } from '@mantine/notifications';
import useUserContext, { UserContextType } from 'contexts/userContext';

const getTotalCoverage = ({ values }: UseFormReturnType<PaymentType>) => {
    return (
        values.coverages_TPL + values.coverages_lossAndDamage +
        values.coverages_propertyDamage + values.coverages_bodilyInjury +
        values.coverages_APPA + (values.coverages_AOG || 0)
    );
};

const getTotalPremiums = ({ values }: UseFormReturnType<PaymentType>) => {
    return (
        values.premiums_TPL + values.premiums_lossAndDamage +
        values.premiums_propertyDamage + values.premiums_bodilyInjury +
        values.premiums_APPA + (values.premiums_AOG || 0)
    );
};

const other = {
    docStamps: 0.125,
    VAT: 0.12,
    LGT: 0.002
};

export default function PaymentTable({ form }: any) {

    const totalPremiums = getTotalPremiums(form);
    const totalCoverage = getTotalCoverage(form);

    const otherChargesForm = useForm({
        initialValues: {
            docStamps: 0.125 * totalPremiums,
            VAT: 0.12 * totalPremiums,
            LGT: 0.002 * totalPremiums,
            otherCharges: 0
        }
    });

    const { user }: UserContextType = useUserContext();

    const { post, error } = useFetch('/api/users/save_payment', {
        method: 'POST',
        body: JSON.stringify({
            payment: {
                ...form.values,
                ...otherChargesForm.values
            }
        })
    });

    const save = async () => {
        if (!user.insuranceType) {
            showNotification({
                title: 'Ooops!',
                message: 'Fill up the issue policy form first. Proceeed to first step',
                color: 'orange',
                autoClose: false
            });
            return;
        }
        const data = await post();
        if (data) {
            showNotification({
                title: 'Payment saved!',
                message: 'Your payment details has been saved successfully',
                color: 'green'
            });
        } else {
            showNotification({
                title: 'Something went wrong',
                message: 'An error occured on the server',
                color: 'red',
            });
        }
    };

    return (
        <>
            <Table my={20}>
                <thead>
                    <tr>
                        <td> </td>
                        <td> <Text weight={600}>Coverages</Text> </td>
                        <td> <Text weight={600}>Premiums</Text> </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TPl</td>
                        <td> <NumberInput size='xs' {...form.getInputProps('coverages_TPL')} /> </td>
                        <td> <NumberInput size='xs' {...form.getInputProps('premiums_TPL')} /> </td>
                    </tr>
                    <tr>
                        <td>Loss and Damage</td>
                        <td> <NumberInput size='xs' {...form.getInputProps('coverages_lossAndDamage')} /> </td>
                        <td> <NumberInput size='xs' {...form.getInputProps('premiums_lossAndDamage')} /> </td>
                    </tr>
                    <tr>
                        <td>Bodily Injury</td>
                        <td> <NumberInput size='xs' {...form.getInputProps('coverages_bodilyInjury')} /> </td>
                        <td> <NumberInput size='xs' {...form.getInputProps('premiums_bodilyInjury')} /> </td>
                    </tr>
                    <tr>
                        <td>APPA</td>
                        <td> <NumberInput size='xs' {...form.getInputProps('coverages_APPA')} /> </td>
                        <td> <NumberInput size='xs' {...form.getInputProps('premiums_APPA')} /> </td>
                    </tr>
                    <tr>
                        <td>AOG</td>
                        <td> {form.values.coverages_AOG && <NumberInput size='xs' {...form.getInputProps('coverages_AOG')} />} </td>
                        <td> {form.values.premiums_AOG && <NumberInput size='xs' {...form.getInputProps('premiums_AOG')} />} </td>
                    </tr>
                    <tr style={{ backdropFilter: 'brightness(.9)' }}>
                        <td> <Text weight={600}>TOTAL: </Text> </td>
                        <td> <Text weight={600}> {totalCoverage} </Text> </td>
                        <td> <Text weight={600}> {totalPremiums} </Text> </td>
                    </tr>
                </tbody>
            </Table>

            <Table width='min-content'>
                <tbody>
                    <tr>
                        <td>DOC Stamps {`(${other.docStamps * 100}%)`} </td>
                        <td> {otherChargesForm.values.docStamps} </td>
                    </tr>
                    <tr>
                        <td>VAT {`(${other.VAT * 100}%)`} </td>
                        <td> {otherChargesForm.values.VAT} </td>
                    </tr>
                    <tr>
                        <td>LGT {`(${other.LGT * 100}%)`} </td>
                        <td> {otherChargesForm.values.LGT} </td>
                    </tr>
                    <tr>
                        <td>Other charges:</td>
                        <td> {otherChargesForm.values.otherCharges} </td>
                    </tr>
                    <tr style={{ backdropFilter: 'brightness(.9)' }}>
                        <td> <Text weight={600}>GROSS</Text> </td>
                        <td>
                            <Text weight={600}>
                                {otherChargesForm.values.docStamps +
                                    otherChargesForm.values.VAT +
                                    otherChargesForm.values.LGT +
                                    otherChargesForm.values.otherCharges}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Group my={30} align='flex-end'>
                <Button onClick={save}> SAVE </Button>
            </Group>
        </>
    );
}
