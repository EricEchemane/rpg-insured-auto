import {
  Anchor,
  Button,
  Grid,
  Group,
  NumberInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { hideNotification, showNotification } from '@mantine/notifications';
import useUserContext, { UserContextType } from 'contexts/userContext';
import useFetch from 'modules/useFetch';
import React from 'react';
import { CircleCheck } from 'tabler-icons-react';

export default function IssuePolicy({ nextStep, prevStep }: any) {
  const { user, setIssuePolicyInfo }: UserContextType = useUserContext();

  const form = useForm({
    initialValues: user.issuePolicyInfo,
    validate: {
      nameOfAssured: (value) =>
        value.trim().length > 0 ? null : 'Your name is required',
      address: (value) =>
        value.trim().length > 0 ? null : 'Address is required',
      issueDate: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      MVFileNumber: (value) => {
        if (user.insuranceType !== 'ctp') return null;
        return value.trim().length > 0 ? null : 'This filed is required';
      },
      COCNumber: (value) => {
        if (user.insuranceType !== 'ctp') return null;
        return value.trim().length > 0 ? null : 'This filed is required';
      },
      expiryDate: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      inceptionDate: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      MakeOrDescription: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      UnitTypeORBodytType: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      YearModel: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      color: (value) => (value.trim().length > 0 ? null : 'Color is required'),
      EngineOrmotorNumber: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      ChassisNumber: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      PlateNumber: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
      unitPrice: (value) => (value > 0 ? null : 'This filed is required'),
      MortgageFinancing: (value) =>
        value.trim().length > 0 ? null : 'This filed is required',
    },
  });

  const { loading, post, succeeded } = useFetch('/api/users/issue_insurance', {
    method: 'POST',
    body: JSON.stringify({
      insuranceType: user.insuranceType,
      issuePolicyInfo: form.values,
    }),
  });

  const save = async () => {
    if (succeeded) {
      nextStep();
      return;
    }

    const notloggedIn = user.email === 'not loged in';
    if (notloggedIn) {
      showNotification({
        title: 'You are not logged in',
        message: <Anchor href='/login'>Login to your account first</Anchor>,
        color: 'orange',
      });
      return;
    }

    if (!user.insuranceType) {
      showNotification({
        title: 'Choose an insurance type first',
        message: <Anchor onClick={prevStep}> Choose now </Anchor>,
        color: 'orange',
      });
      return;
    }

    const validation = form.validate();

    if (validation.hasErrors) {
      console.log(validation.errors);
    } else {
      setIssuePolicyInfo(form.values);
      showNotification({
        id: 'saving',
        title: 'Saving your data',
        message: 'Please white before proceeding to next step',
        loading: true,
        color: 'blue',
        autoClose: false,
      });
      const success = await post();
      hideNotification('saving');
      if (success) {
        showNotification({
          title: 'Saved successfully!',
          message: 'You can now proceed to next step',
          color: 'green',
          icon: <CircleCheck />,
        });
      } else {
        showNotification({
          title: 'Cannot save your data',
          message: 'An unexpected event happened. Please try again',
          color: 'red',
          autoClose: false,
        });
      }
    }
  };

  const smallDevice = useMediaQuery('(max-width: 500px)', false);
  const span = smallDevice ? 12 : 6;
  const insuranceType =
    user.insuranceType === 'comp' ? 'Comprehensive' : 'Compulsory Third Party';

  return (
    <>
      <Title order={5}> Fill up the form below carefully </Title>

      {user.insuranceType && <Text> Insurance type: {insuranceType} </Text>}

      <Grid my={20}>
        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Name of assured'
            {...form.getInputProps('nameOfAssured')}
            placeholder='Name of assured'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Address'
            {...form.getInputProps('address')}
            placeholder='Address'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Issue date'
            {...form.getInputProps('issueDate')}
            placeholder='Issue Date'
          />
        </Grid.Col>

        {user.insuranceType === 'ctp' && (
          <Grid.Col span={span}>
            <TextInput
              style={{ width: '100%' }}
              label='COC Number'
              {...form.getInputProps('COCNumber')}
              placeholder='COC Number'
            />
          </Grid.Col>
        )}

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Inception Date'
            {...form.getInputProps('inceptionDate')}
            placeholder='Inception Date'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Expiry Date'
            {...form.getInputProps('expiryDate')}
            placeholder='Expiry date'
          />
        </Grid.Col>

        {user.insuranceType === 'ctp' && (
          <Grid.Col span={span}>
            <TextInput
              style={{ width: '100%' }}
              label='MV File Number'
              {...form.getInputProps('MVFileNumber')}
              placeholder='MV File Number'
            />
          </Grid.Col>
        )}

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Year Model'
            {...form.getInputProps('YearModel')}
            placeholder='Year Model'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Make/Description'
            {...form.getInputProps('MakeOrDescription')}
            placeholder='Make/Description'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Chasses Number'
            {...form.getInputProps('ChassisNumber')}
            placeholder='Chasses Number'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Unit Type'
            {...form.getInputProps('UnitTypeORBodytType')}
            placeholder='Unit Type'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Engine number'
            {...form.getInputProps('EngineOrmotorNumber')}
            placeholder='Engine number'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Color'
            {...form.getInputProps('color')}
            placeholder='Color'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Plate Number'
            {...form.getInputProps('PlateNumber')}
            placeholder='Plate Number'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <NumberInput
            style={{ width: '100%' }}
            label='Unit Price (₱)'
            {...form.getInputProps('unitPrice')}
            placeholder='Unit Price'
          />
        </Grid.Col>

        <Grid.Col span={span}>
          <TextInput
            style={{ width: '100%' }}
            label='Mortgagee / Financing'
            {...form.getInputProps('MortgageFinancing')}
            placeholder='Mortgagee / Financing'
          />
        </Grid.Col>
      </Grid>

      <Group>
        <Button onClick={prevStep} disabled={loading} variant='outline'>
          {' '}
          BACK{' '}
        </Button>
        <Button onClick={save} disabled={loading}>
          {succeeded ? 'NEXT STEP' : 'SAVE'}
        </Button>
      </Group>
    </>
  );
}
