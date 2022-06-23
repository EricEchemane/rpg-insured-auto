// comprehensive payment
export type PaymentType = {
    code: string | undefined;
    deductible: number;
    towing: number;
    repLim: number;
    coverages_TPL: number;
    coverages_lossAndDamage: number;
    coverages_bodilyInjury: number;
    coverages_propertyDamage: number;
    coverages_APPA: number;
    coverages_AOG: number | null;
    premiums_TPL: number;
    premiums_lossAndDamage: number;
    premiums_bodilyInjury: number;
    premiums_propertyDamage: number;
    premiums_APPA: number;
    premiums_AOG: number | null;
    docStamps: number;
    VAT: number;
    LGT: number;
    otherCharges: number;
};

const comp_payment_info: PaymentType = {
    code: undefined,
    deductible: 3000.00,
    towing: 100.00,
    repLim: 3100.00,
    coverages_TPL: 0.00,
    coverages_lossAndDamage: 568000.00,
    coverages_bodilyInjury: 200000.00,
    coverages_propertyDamage: 200000.00,
    coverages_APPA: 350000.00,
    coverages_AOG: null,
    premiums_TPL: 0.00,
    premiums_lossAndDamage: 6816.00,
    premiums_bodilyInjury: 420.00,
    premiums_propertyDamage: 1245.00,
    premiums_APPA: 766.50,
    premiums_AOG: 1988.00,
    docStamps: 0,
    VAT: 0,
    LGT: 0,
    otherCharges: 0,
};

const ctpl_payment_info: PaymentType = {
    code: undefined,
    deductible: 0,
    towing: 0,
    repLim: 0,
    coverages_TPL: 100000.00,
    coverages_lossAndDamage: 0,
    coverages_bodilyInjury: 0,
    coverages_propertyDamage: 0,
    coverages_APPA: 0,
    coverages_AOG: null,
    premiums_TPL: 740.00,
    premiums_lossAndDamage: 0,
    premiums_bodilyInjury: 0,
    premiums_propertyDamage: 0,
    premiums_APPA: 0,
    premiums_AOG: 0,
    docStamps: 0,
    VAT: 0,
    LGT: 0,
    otherCharges: 0,
};

export { comp_payment_info, ctpl_payment_info };