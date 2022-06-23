// comprehensive payment
export type PaymentType = {
    code: string | undefined;
    deductible: number;
    towing: number;
    repLim: number;
    coverages: {
        TPL: number;
        lossAndDamage: number;
        bodilyInjury: number;
        propertyDamage: number;
        APPA: number;
        AOG: number | null;
    };
    premiums: {
        TPL: number;
        lossAndDamage: number;
        bodilyInjury: number;
        propertyDamage: number;
        APPA: number;
        AOG: number | null;
    };
    docStamps: number;
    VAT: number;
    LGT: number;
    otherCharges: number;
};

const comp_payment_info: PaymentType = {
    code: undefined,
    deductible: 3000,
    towing: 100,
    repLim: 3100,
    coverages: {
        TPL: 0,
        lossAndDamage: 568000,
        bodilyInjury: 200000,
        propertyDamage: 200000,
        APPA: 350000,
        AOG: null
    },
    premiums: {
        TPL: 0,
        lossAndDamage: 6816,
        bodilyInjury: 420,
        propertyDamage: 1245,
        APPA: 766.50,
        AOG: 1988
    },
    // these values will be computed base on premiums total
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
    coverages: {
        TPL: 100000,
        lossAndDamage: 0,
        bodilyInjury: 0,
        propertyDamage: 0,
        APPA: 0,
        AOG: null
    },
    premiums: {
        TPL: 740,
        lossAndDamage: 0,
        bodilyInjury: 0,
        propertyDamage: 0,
        APPA: 0,
        AOG: 0
    },
    // these values will be computed base on premiums total
    docStamps: 0,
    VAT: 0,
    LGT: 0,
    otherCharges: 0,
};

export { comp_payment_info, ctpl_payment_info };