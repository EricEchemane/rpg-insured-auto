import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>({});

export default function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState<UserType>(UserContextInitialValue);

    const update = (key: string, value: any) => {
        setUser((prev) => ({ ...prev, [key]: value }));
    };

    const setEmail = (email: string) => update('email', email);
    const setInsuranceType = (type: "comp" | "ctp") => update('insuranceType', type);
    const setIssuePolicyInfo = (info: IssuePolicyInfoType) => update('issuePolicyInfo', info);

    return (
        <UserContext.Provider value={{
            user,
            setEmail, setInsuranceType, setIssuePolicyInfo
        }}>
            {children}
        </UserContext.Provider>
    );
}

/* ======== TYPES ========================================= */

export type UserContextType = {
    user: UserType;
    setEmail: (email: string) => void;
    setInsuranceType: (type: "comp" | "ctp") => void;
    setIssuePolicyInfo: (info: IssuePolicyInfoType) => void;
};

export type UserType = {
    email: string;
    insuranceType: "comp" | "ctp" | undefined;
    issuePolicyInfo: IssuePolicyInfoType;
};

export type IssuePolicyInfoType = {
    nameOfAssured: string;
    address: string;
    issueDate: string;
    MVFileNumber: string,
    COCNumber: string,
    expiryDate: string;
    inceptionDate: string;
    MakeOrDescription: string;
    UnitTypeORBodytType: string;
    YearModel: string;
    color: string,
    EngineOrmotorNumber: string;
    ChassisNumber: string;
    PlateNumber: string;
    MortgageFinancing: string;
};

const UserContextInitialValue: UserType = {
    email: "not loged in",
    insuranceType: "ctp",
    issuePolicyInfo: {
        nameOfAssured: '',
        address: '',
        issueDate: '',
        inceptionDate: '',
        expiryDate: '',
        MVFileNumber: '',
        COCNumber: '',
        MakeOrDescription: '',
        UnitTypeORBodytType: '',
        YearModel: '',
        color: '',
        EngineOrmotorNumber: '',
        ChassisNumber: '',
        PlateNumber: '',
        MortgageFinancing: ''
    }
};
