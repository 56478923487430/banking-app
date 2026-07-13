interface IProps {
  onClick: () => void;
}

const AddCard: React.FC<IProps> = ({ onClick }) => (
  <button type='button' className='add-card no-select' onClick={onClick}>
    <span className='material-symbols-outlined add-card-icon'>add</span>
    <p className='add-card-title'>Open new card</p>
    <p className='add-card-subtitle'>Tap to request a new card</p>
  </button>
);

export default AddCard;
