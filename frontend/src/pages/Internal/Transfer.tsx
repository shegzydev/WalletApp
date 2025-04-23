import { MouseEvent, useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
// import { useAuthStore } from '../../store/useAuthStore';
import { useAcctStore } from '../../store/useAcctStore';
import { CircleCheckBig, CircleX, LucideUserCircle2 } from 'lucide-react';
import formatDate from '../../utils/DateFormatter';

const Transfer = () => {
  const {
    userAcct,
    receiverName,
    isRetrievingDetails,
    retrieveName,
    makeTransfer,
    transferReport,
    resetTransfer,
  } = useAcctStore();

  const [formData, setFormData] = useState({
    receiverAccountNumber: '',
    amount: 0,
    details: '',
    save: false,
  });

  const [checked, setChecked] = useState(false);
  function handleFormCheck(flag: boolean) {
    setChecked(flag);
    setFormData({ ...formData, save: flag });
  }

  const [acctInputValue, setAcctInputValue] = useState('');

  function handleTransfer(e: MouseEvent) {
    e.preventDefault();
    makeTransfer(formData);
  }

  useEffect(() => resetTransfer, [resetTransfer]);

  if (transferReport !== null) {
    return (
      <>
        <TopBar color="dark" background="light">
          Report
        </TopBar>
        <div
          className="w-100 d-flex flex-column align-items-center justify-content-center"
          style={{ height: '80vh' }}
        >
          {transferReport.transactionStatus === 'success' ? (
            <>
              <CircleCheckBig
                size={100}
                className="text-success"
              ></CircleCheckBig>
              <p className="fw-semibold fs-5">Transfer Successful</p>
            </>
          ) : (
            <>
              <CircleX size={100} className="text-danger" />
              <p className="fw-semibold fs-5">Transfer Failed</p>
            </>
          )}
          <div className="p-3" style={{ width: '100%' }}>
            <div className="p-3 bg-light rounded-3 d-flex flex-column justify-content-around">
              <div className="d-flex justify-content-between mt-3 mb-3">
                <span>Recepient Name</span>
                <span className="text-right">{receiverName}</span>
              </div>

              <div className="d-flex justify-content-between mt-3 mb-3">
                <span>Recepient Account</span>
                <span className="text-right">
                  {transferReport.receiverAccount}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-3 mb-3">
                <span>Amount</span>
                <span className="text-right">
                  ₦{transferReport.transactionAmount}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3 mb-3">
                <span>Details</span>
                <span className="text-right">
                  {transferReport.transactionDetails}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3 mb-3">
                <span>Time and Date</span>
                <span className="text-right">
                  {formatDate(transferReport.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <TopBar color="dark" background="light">
        Transfer
      </TopBar>
      <div className="ms-3 me-3">
        <h4 className="text-primary fw-semibold fs-6 mt-4 mb-4">
          Account Balance: ₦{userAcct?.balance}
        </h4>
        {/* Form */}
        <div className="" style={{}}>
          <div className="mb-4">
            <input
              type="number"
              inputMode="numeric"
              value={acctInputValue}
              className="form-control rounded-3"
              placeholder="Account Number"
              onChange={(e) => {
                setAcctInputValue(e.target.value);
                setFormData({
                  ...formData,
                  receiverAccountNumber: e.target.value,
                });
                if (e.target.value.length > 10) {
                  retrieveName({ accountNumber: e.target.value });
                }
              }}
            />
          </div>
          <div className="mb-4 form-control">
            Name: {isRetrievingDetails ? '...' : receiverName}
          </div>
          <div className="mb-4">
            <input
              type="number"
              inputMode="numeric"
              className="form-control rounded-3"
              placeholder="Amount"
              onChange={(e) => {
                setFormData({ ...formData, amount: Number(e.target.value) });
              }}
            />
          </div>
          <div className="mb-4">
            <textarea
              name=""
              id=""
              rows={3}
              placeholder="Transaction details"
              className="form-control rounded-3"
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </div>
          <div className="d-flex align-items-center mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              style={{ width: '24px', height: '24px' }}
              onChange={() => {
                handleFormCheck(!checked);
              }}
            />
            <span className="ms-3">Save recepient as beneficiary</span>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary w-75 rounded-pill fw-semibold mt-2 mb-2"
              onClick={(e) => handleTransfer(e)}
              disabled={
                formData.amount <= 0 ||
                (userAcct && formData.amount > userAcct.balance) ||
                (receiverName !== null && receiverName.length < 0) ||
                !receiverName
              }
            >
              Confirm
            </button>
          </div>
        </div>
        {/* Recepients */}
      </div>
      <div className="m-3 d-flex flex-column bg-light rounded-4 p-3">
        <span className="fw-semibold">Beneficiaries</span>
        {userAcct?.beneficiaries.map((beneficiary) => (
          <div
            className="btn p-2 mt-2 mb-2 d-flex align-items-center bg-light rounded-3 shadow"
            onClick={() => {
              setFormData({
                ...formData,
                receiverAccountNumber: beneficiary.accountNumber,
              });
              setAcctInputValue(beneficiary.accountNumber);
              retrieveName({ accountNumber: beneficiary.accountNumber });
            }}
          >
            <LucideUserCircle2 className="text-dark" size={40} />
            <div className="d-flex flex-column align-items-start ms-3">
              <span className="fw-bold">{beneficiary.accountName}</span>
              <span>{beneficiary.accountNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transfer;
