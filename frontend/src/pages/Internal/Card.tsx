import TopBar from '../../components/TopBar';
import OneCard from '../../components/OneCard';

const Card = () => {
  return (
    <>
      <TopBar color="dark" background="light">
        Card
      </TopBar>
      <div className="p-3 text-light" style={{ width: '100%' }}>
        {/* cards */}
        <OneCard color="primary" type="VERVE"></OneCard>
        <OneCard color="danger" type="VISA"></OneCard>
      </div>
    </>
  );
};

export default Card;
