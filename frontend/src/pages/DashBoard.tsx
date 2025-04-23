import {
  ArrowDownCircle,
  ArrowUpCircle,
  Bell,
  BellDot,
  CreditCard,
  // Landmark,
  Notebook,
  // NotebookTabs,
  // PiggyBank,
  // ReceiptText,
  SendToBack,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { ReactNode, useEffect } from 'react';
import { useAcctStore } from '../store/useAcctStore';
import { usePageStore } from '../store/usePageStore';
import formatDate from '../utils/DateFormatter';

const DashBoard = () => {
  const { authUser } = useAuthStore();
  const { userAcct, isRetrievingDetails } = useAcctStore();

  const { setPage } = usePageStore();
  const choosePage = (index: number) => {
    setPage(index);
  };

  const { transactionHistory, getHistory } = useAcctStore();

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const content: Map<ReactNode, string> = new Map([
    [<Wallet />, 'Account'],
    [<SendToBack />, 'Transfer'],
    [<Notebook />, 'Transaction History'],
    [<Smartphone />, 'Airtime'],
    [<Smartphone />, 'Data'],
    [<CreditCard />, 'Card'],
  ]);

  return (
    <div className="bg-primary">
      {/* Header */}
      <div className="d-flex flex-row justify-content-between p-3">
        <div className="d-flex justify-content-around me-3">
          <img
            src={authUser?.profilePic || '/avatar.png'}
            alt=""
            className="rounded-circle"
            style={{
              width: '54px',
              height: '54px',
              objectFit: 'cover',
              border: '1px solid #aaa',
            }}
          />
          <h5 className="fw-normal text-white mt-auto mb-auto ms-3">
            Hi, {authUser?.name}
          </h5>
        </div>
        <Bell
          size={28}
          className="mt-auto mb-auto text-white d-none"
          onClick={() => {}}
        />
        <BellDot
          size={28}
          className="mt-auto mb-auto text-white"
          onClick={() => {}}
        />
        {/* <img src={vitelogo} alt="" /> */}
      </div>

      <div className="bg-light d-flex flex-column rounded-top-5">
        {/* card */}
        <div className="m-3 bg-primary" style={{ borderRadius: '1rem' }}>
          <div></div>
          <div className="p-3">
            <h3 className="text-white fw-normal fs-6">Available Balance</h3>
            <div className="mt-2 d-flex flex-column">
              <div className="mt-1 d-flex flex-row justify-content-between text-white fs-3">
                <span className="fw-semibold">
                  <span className="fw-light fs-6">₦</span>
                  {isRetrievingDetails ? '*****' : userAcct?.balance}
                </span>
                <span className="fw-bold" style={{ color: '#fffa' }}>
                  NDIF
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Some Transactions */}
        <div className="d-flex flex-column m-3 mt-0 bg-white rounded-4 position-">
          <span className="w-100 text-center text-dark fw-normal">
            Recent Transactions
          </span>
          <div style={{ overflow: 'hidden' }}>
            {transactionHistory &&
              transactionHistory
                .slice(0)
                .reverse()
                .map(
                  (transaction, index) =>
                    index < 3 && (
                      <div className="d-flex flex-column ps-3 pe-3" key={index}>
                        <div
                          className="d-flex align-items-center bg-light rounded-4 mt-2 mb-2"
                          style={{ height: '70px', border: '1px solid #ccc4' }}
                        >
                          {transaction.receiverAccount !==
                          userAcct?.accountNumber ? (
                            <ArrowUpCircle
                              size={'28px'}
                              style={{ flexBasis: '12%' }}
                              className="text-dark"
                            ></ArrowUpCircle>
                          ) : (
                            <ArrowDownCircle
                              size={'28px'}
                              style={{ flexBasis: '12%' }}
                              className="text-dark"
                            ></ArrowDownCircle>
                          )}
                          <div
                            className="d-flex flex-column justify-content-evenly ps-1 pe-1 h-100"
                            style={{ flexBasis: '85%' }}
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{ fontSize: '15px' }}
                            >
                              <span>
                                {transaction.transactionType}
                                {transaction.receiverAccount !==
                                userAcct?.accountNumber
                                  ? ' to '
                                  : ' from '}
                                <span className="fw-semibold">
                                  {transaction.receiverAccount !==
                                  userAcct?.accountNumber
                                    ? transaction.receiverAccount
                                    : transaction.senderAccount}
                                </span>
                              </span>
                              <span className="text-center fw-bold">
                                ₦{transaction.transactionAmount}
                              </span>
                            </div>
                            <div
                              className="d-flex justify-content-between"
                              style={{ fontSize: '14px' }}
                            >
                              <span>{formatDate(transaction.createdAt)}</span>
                              <span className="text-center text-success">
                                {transaction.transactionStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
          </div>
        </div>
        {/* grid */}
        <div className="row g-4 ms-3 mt-0 me-3 mb-3 pt-1 pb-1 rounded-4 bg-white">
          {Array.from(content.keys()).map((itemcard, index) => (
            <div
              className="col-4 mt-2 mb-2"
              style={{ height: '100px' }}
              key={content.get(itemcard)}
            >
              <div
                className="btn bg-white shadow p-1 rounded-3 h-100 d-flex flex-column align-items-center text-center"
                onClick={() => choosePage(index + 1)}
              >
                <div className="w-50 mt-3 mb-2 rounded-3">{itemcard}</div>
                <span
                  className="fw-light mt-auto mb-auto ms-1 me-1"
                  style={{ fontSize: '13px' }}
                >
                  {content.get(itemcard)}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* BottomBar */}
        <div></div>
      </div>
    </div>
  );
};

export default DashBoard;
