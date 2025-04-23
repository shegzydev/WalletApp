import { useAcctStore } from '../store/useAcctStore';
import { useAuthStore } from '../store/useAuthStore';
import './Loading.css';

const Loading = () => {
  const { isRunningTransaction } = useAcctStore();
  const {
    isLoggingIn,
    isRegistering,
    isCheckingAuth,
    authUser,
    isUpdatingProfile,
  } = useAuthStore();
  return (
    <>
      {(isUpdatingProfile ||
        isRunningTransaction ||
        isLoggingIn ||
        isRegistering ||
        (isCheckingAuth && !authUser)) && (
        <div
          className="position-absolute h-100 w-100 text-center d-flex flex-column"
          style={{
            filter: 'opacity(1)',
            zIndex: '2',
            backgroundColor: '#ffffffdd',
          }}
        >
          <div className="mt-auto mb-auto">
            <div
              className="spinner ms-auto me-auto"
              style={{
                width: '80px',
                height: '80px',
                border: '5px solid black',
                borderColor: 'transparent blue transparent blue',
                backgroundColor: '#0000',
                borderRadius: '50%',
              }}
            ></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
