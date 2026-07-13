interface IProps {
  title: string;
  message: string;
}

/**
 * Shared "processing" visualization (spinner + title + message).
 * Used for transfers as well as receipt/statement PDF generation so that every
 * long-running action in the app shows the same loading experience.
 */
const ProcessingScreen: React.FC<IProps> = ({ title, message }) => (
  <div className='processing-screen flex flex-col flex-v-center flex-h-center'>
    <div className='processing-spinner' />
    <h2 className='no-select'>{title}</h2>
    <p className='information text-shadow center'>{message}</p>
  </div>
);

export default ProcessingScreen;
