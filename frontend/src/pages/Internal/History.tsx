import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useAcctStore } from '../../store/useAcctStore';
import { useEffect } from 'react';
import formatDate from './../../utils/DateFormatter.tsx';

const History = () => {
  const { getHistory, transactionHistory } = useAcctStore();
  const { userAcct } = useAcctStore();

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <div className="bg-light">
      <TopBar color="dark" background="light">
        Transaction History
      </TopBar>

      {transactionHistory &&
        transactionHistory
          .slice(0)
          .reverse()
          .map((transaction, index) => (
            <div className="d-flex flex-column ps-3 pe-3" key={index}>
              <div
                className="d-flex align-items-center bg-white shadow rounded-4 mt-2 mb-2"
                style={{ height: '70px' }}
              >
                {transaction.receiverAccount !== userAcct?.accountNumber ? (
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
                      {transaction.receiverAccount !== userAcct?.accountNumber
                        ? ' to '
                        : ' from '}
                      <span className="fw-semibold">
                        {transaction.receiverAccount !== userAcct?.accountNumber
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
          ))}
    </div>
  );
};

export default History;
