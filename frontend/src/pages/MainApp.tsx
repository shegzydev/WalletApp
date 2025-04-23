//   const content = [
//     Wallet: 'Account and Card',
//     SendToBack: 'Transfer',
//     Landmark: 'Withdraw',
//     Smartphone: 'Mobile Prepaid',
//     ReceiptText: 'Pay the bill',
//     PiggyBank: 'Save online',
//     CreditCard: 'Credit card',
//     Notebook: 'Transaction report',
//     NotebookTabs: 'Beneficiary',
//   ];
// enum Pages {
//   DashBoard,
//   Account_Card,
//   Transfer,
//   Withdraw,
//   Mobile_Prepaid,
//   Pay_Bill,
//   Save_Online,
//   Credit_Card,
//   Transaction_Report,
//   Beneficiary,

import { useEffect, useLayoutEffect } from 'react';
import { useAcctStore } from '../store/useAcctStore';
import { usePageStore } from '../store/usePageStore';
import DashBoard from './DashBoard';
import Account from './Internal/Account';
import History from './Internal/History';
import Transfer from './Internal/Transfer';
import { useAuthStore } from '../store/useAuthStore';
import Airtime from './Internal/Airtime';
import Data from './Internal/Data';
import Card from './Internal/Card';

// }
const Pages = [
  <DashBoard />,
  <Account />,
  <Transfer />,
  <History />,
  <Airtime />,
  <Data />,
  <Card />,
];

const MainApp = () => {
  const { getAcct, getHistory } = useAcctStore();
  const { authUser } = useAuthStore();

  //===========Get Account==============//
  useEffect(() => {
    getAcct({ accountNumber: authUser?.accountNumber[0] });
  }, [getAcct, authUser?.accountNumber]);
  //===========Get Account==============//
  //===========Get History==============//
  useEffect(() => {
    getHistory();
  }, [getHistory]);
  //==========Get History===============//

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const { current } = usePageStore();
  return <>{Pages[current]}</>;
};

export default MainApp;
