import { Camera } from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useAcctStore } from '../../store/useAcctStore';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface imageData {
  imgData: string | ArrayBuffer | null;
}

const Account = () => {
  const { userAcct } = useAcctStore();
  const { authUser, logout, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg]: [
    imageData,
    Dispatch<SetStateAction<imageData>>
  ] = useState<imageData>({ imgData: null });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg({ imgData: base64Image });
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <>
      <TopBar color="dark" background="light">
        Account
      </TopBar>
      <div className="d-flex flex-column align-items-center">
        <div className="position-relative mt-4">
          <img
            src={
              (selectedImg.imgData && String(selectedImg.imgData)) ||
              authUser?.profilePic ||
              '/avatar.png'
            }
            alt=""
            className="rounded-circle"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '3px solid #aaaf',
            }}
          />
          <label
            htmlFor="avatar-upload"
            className="rounded-circle p-1 position-absolute"
            style={{
              bottom: '0',
              right: '0',
              backgroundColor: '#aaaf',
            }}
          >
            <Camera className="text-dark" />
            <input
              type="file"
              name=""
              id="avatar-upload"
              className="d-none"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <span className="text-center fw-bold fs-5 mt-3">
          {userAcct?.accountName.toUpperCase()}
        </span>
        <div
          className="rounded-3 bg-light ps-3 pe-3 mt-3 mb-3"
          style={{ width: '90%' }}
        >
          <div className="d-flex justify-content-between w-100 mt-3 mb-4">
            <span className="text-left"> Account Number</span>
            <span className="text-right">{userAcct?.accountNumber}</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left"> Account Balance</span>
            <span className="text-right">₦{userAcct?.balance}.00</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-3">
            <span className="text-left">Account Tier</span>
            <span className="text-right">Tier {userAcct?.KYCLevel}</span>
          </div>
        </div>
        <div
          className="rounded-3 bg-light ps-3 pe-3 mt-3 mb-3"
          style={{ width: '90%' }}
        >
          <div className="d-flex justify-content-between w-100 mt-3 mb-4">
            <span className="text-left"> Full Name</span>
            <span className="text-right">{userAcct?.accountName}</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left"> Phone Number</span>
            <span className="text-right">{authUser?.phone}</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left">Nickname</span>
            <span className="text-right">________</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left">Gender</span>
            <span className="text-right">________</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left">D.O.B</span>
            <span className="text-right">________</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-4">
            <span className="text-left">Email</span>
            <span className="text-right">________</span>
          </div>
          <div className="d-flex justify-content-between w-100 mt-4 mb-3">
            <span className="text-left">Address</span>
            <span className="text-right">________</span>
          </div>
        </div>
        <button
          className="btn bg-danger ps-5 pe-5 text-light fw-semibold mb-3"
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Account;
