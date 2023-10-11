import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>({});

export default function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>(UserContextInitialValue);

  const update = (key: string, value: any) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const setEmail = (email: string) => update('email', email);
  const setInsuranceType = (type: 'comp' | 'ctp') =>
    update('insuranceType', type);
  const setIssuePolicyInfo = (info: IssuePolicyInfoType) =>
    update('issuePolicyInfo', info);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setEmail,
        setInsuranceType,
        setIssuePolicyInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/* ======== TYPES ========================================= */

export type UserContextType = {
  user: UserType;
  setUser: any;
  setEmail: (email: string) => void;
  setInsuranceType: (type: 'comp' | 'ctp') => void;
  setIssuePolicyInfo: (info: IssuePolicyInfoType) => void;
};

export type UserType = {
  email: string;
  insuranceType: 'comp' | 'ctp' | undefined;
  issuePolicyInfo: IssuePolicyInfoType;
};

export type IssuePolicyInfoType = {
  id: number;
  nameOfAssured: string;
  address: string;
  issueDate: string;
  MVFileNumber: string;
  COCNumber: string;
  expiryDate: string;
  inceptionDate: string;
  MakeOrDescription: string;
  UnitTypeORBodytType: string;
  YearModel: string;
  color: string;
  EngineOrmotorNumber: string;
  ChassisNumber: string;
  PlateNumber: string;
  unitPrice: number;
  MortgageFinancing: string;
};

const UserContextInitialValue: UserType = {
  email: 'not loged in',
  insuranceType: undefined,
  issuePolicyInfo: {
    id: 0,
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
    unitPrice: 0.0,
    MortgageFinancing: '',
  },
};
