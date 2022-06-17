import { Anchor, Button, Grid, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useUserContext, { UserContextType } from 'contexts/userContext';
import React from 'react';

export default function Printing({ nextStep, prevStep }: any) {
    const { user }: UserContextType = useUserContext();
    const smallDevice = useMediaQuery('(max-width: 500px)', false);

    const span = smallDevice ? 12 : 6;

    if (user.email === "not loged in") return <Anchor href='/login'> Log in first </Anchor>;
    if (!user.insuranceType) return <Anchor onClick={prevStep}> Fill up the form first </Anchor>;

    const printdiv = () => {
        const divElements = document?.getElementById("insurance_info")?.innerHTML;
        if (!divElements) return;
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = "<html><head><title></title></head><body>" + divElements + "</body>";
        window.print();

    };

    return (
        <>
            <div id='insurance_info'>
                <Title mt={20} mb={10} order={4}> RPG Insurace Auto </Title>
                <Grid >
                    <Grid.Col span={span}>
                        <Table>
                            <tbody>
                                <tr>
                                    <td> Name of Assured </td>
                                    <td> {user.issuePolicyInfo.nameOfAssured} </td>
                                </tr>
                                <tr>
                                    <td> Address </td>
                                    <td> {user.issuePolicyInfo.address} </td>
                                </tr>
                                <tr>
                                    <td> Issue date </td>
                                    <td> {user.issuePolicyInfo.issueDate} </td>
                                </tr>
                                {user.insuranceType === "ctp" && <tr>
                                    <td> COC Member </td>
                                    <td> {user.issuePolicyInfo.COCNumber} </td>
                                </tr>}
                                <tr>
                                    <td> Inception date </td>
                                    <td> {user.issuePolicyInfo.inceptionDate} </td>
                                </tr>
                                <tr>
                                    <td> Expiry date </td>
                                    <td> {user.issuePolicyInfo.expiryDate} </td>
                                </tr>
                                {user.insuranceType === "ctp" && <tr>
                                    <td> MV File Member </td>
                                    <td> {user.issuePolicyInfo.COCNumber} </td>
                                </tr>}
                                <tr>
                                    <td> Year Model </td>
                                    <td> {user.issuePolicyInfo.YearModel} </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Grid.Col>

                    <Grid.Col span={span}>
                        <Table>
                            <tbody>
                                <tr>
                                    <td> Make/Description </td>
                                    <td> {user.issuePolicyInfo.MakeOrDescription} </td>
                                </tr>
                                <tr>
                                    <td> Chasses Number </td>
                                    <td> {user.issuePolicyInfo.ChassisNumber} </td>
                                </tr>
                                <tr>
                                    <td> Unit Type </td>
                                    <td> {user.issuePolicyInfo.UnitTypeORBodytType} </td>
                                </tr>
                                <tr>
                                    <td> Engine Number </td>
                                    <td> {user.issuePolicyInfo.EngineOrmotorNumber} </td>
                                </tr>
                                <tr>
                                    <td> Color </td>
                                    <td> {user.issuePolicyInfo.color} </td>
                                </tr>
                                <tr>
                                    <td> Plate Number </td>
                                    <td> {user.issuePolicyInfo.PlateNumber} </td>
                                </tr>
                                <tr>
                                    <td> Mortgagee / Financing </td>
                                    <td> {user.issuePolicyInfo.MortgageFinancing} </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Grid.Col>
                </Grid>
            </div>

            <Button my={20} variant='light' onClick={() => printdiv()}> Print </Button>
        </>
    );
}
