import { Phone } from 'lucide-react';
import TopBar from '../../components/TopBar';

const Airtime = () => {
  const prices = [50, 100, 200, 500, 1000, 2000];
  return (
    <>
      <TopBar color="dark" background="light">
        Airtime
      </TopBar>
      {/* Receiver */}
      <div className="d-flex flex-row p-3 align-items-center">
        <Phone style={{ width: '32px', height: '32px' }}></Phone>
        <input
          type="number"
          inputMode="numeric"
          placeholder="0XX XXXX XXXX"
          className="form-control ms-2 me-2 fw-semibold"
        />
        <img
          src="/avatar.png"
          alt=""
          style={{ width: '32px', height: '32px' }}
        />
      </div>
      {/* Amount */}
      <div className="p-3 m-3 rounded-4 bg-light">
        <div className="row m-0">
          {prices.map((price) => (
            <div className="col-4 text-center d-flex justify-content-center p-1">
              <div
                className="bg-white rounded-3 shadow"
                style={{ width: '100%' }}
              >
                <p className="mt-3">₦{price}</p>
                <p>Pay ₦{price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-row pt-3 ps-2 pe-2 align-items-center">
          <span>₦</span>
          <input
            type="number"
            inputMode="numeric"
            className="form-control ms-2 me-2 fw-semibold"
            placeholder="50-500000"
          />
          <button className="btn btn-primary rounded-4">Pay</button>
        </div>
      </div>
    </>
  );
};

export default Airtime;
