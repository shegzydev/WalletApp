import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface content {
  children?: string;
  color: 'light' | 'primary' | 'dark' | 'danger';
  type: 'VISA' | 'VERVE';
}

const OneCard = (props: content) => {
  const [isVisible, setVisibility] = useState(false);
  return (
    <div
      className={`d-flex flex-column bg-${props.color} rounded-4 p-3 mb-3`}
      style={{ width: 'min(100%, 390px)' }}
    >
      <div className="d-flex justify-content-between align-items-center fw-semibold fs-3 mb-3">
        <span>Segun Olu-Abe</span>
        <div
          className="btn text-white"
          onClick={() => setVisibility(!isVisible)}
        >
          {isVisible ? <Eye /> : <EyeOff />}
        </div>
      </div>
      <span className="mt-2">ShegzPay</span>
      <span className="mt-2">
        4756 {isVisible ? '5897 2883' : '**** ****'} 1234
      </span>
      <span className="mt-2 mb-1">
        <span>Expires: {isVisible ? '12/25' : '**/**'}</span>
        <span className="ms-3">CVV: {isVisible ? '223' : '***'}</span>
      </span>
      <div className="d-flex justify-content-between fw-bold fs-3">
        <span>₦{isVisible ? '1000' : '****'}</span>
        <span>{props.type}</span>
      </div>
    </div>
  );
};

export default OneCard;
