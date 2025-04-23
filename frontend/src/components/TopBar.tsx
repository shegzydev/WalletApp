import { ChevronLeft } from 'lucide-react';
import { usePageStore } from '../store/usePageStore';

interface content {
  children?: string;
  color: 'light' | 'primary' | 'dark';
  background: 'light' | 'primary' | 'dark';
}

const TopBar = (text: content) => {
  const { setPage } = usePageStore();
  return (
    <div
      className={`position-sticky w-100 d-flex pt-4 pb-4 ps-2 text-${text.color} bg-${text.background}`}
      style={{ top: '0', zIndex: '1' }}
    >
      <div className="btn" onClick={() => setPage(0)}>
        <ChevronLeft />
      </div>
      <h5 className="ms-2 mt-auto mb-auto fw-semibold">{text.children}</h5>
    </div>
  );
};

export default TopBar;
