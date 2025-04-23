import { Phone } from 'lucide-react';
import TopBar from '../../components/TopBar';

interface dataBundle {
  volume: string;
  time: string;
  price: number;
}

const Data = () => {
  const prices: Array<dataBundle> = [
    { volume: '1GB', time: '1 day', price: 100 },
    { volume: '2.5GB', time: '1 days', price: 900 },
    { volume: '500MB', time: '7 days', price: 500 },
    { volume: '1GB', time: '7 days', price: 800 },
    { volume: '2GB', time: '30 days', price: 1500 },
    { volume: '3.5GB', time: '30 days', price: 2500 },
  ];

  return (
    <>
      <TopBar color="dark" background="light">
        Data
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
      <div className="m-3 p-3 rounded-4 bg-light">
        <div className="row m-0">
          {prices.map((data) => (
            <div className="col-4 text-center d-flex justify-content-center p-1">
              <div
                className="bg-white rounded-3 shadow"
                style={{ width: '100%' }}
              >
                <p className="mt-3 fw-semibold">{data.volume}</p>
                <p className="mt-3">{data.time}</p>
                <p>Pay ₦{data.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Data;
