import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

const Inbox: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>Inbox</h1>

    <Divider />

    <div className='inbox-empty flex flex-col flex-v-center flex-h-center'>
      <span className='material-symbols-outlined inbox-empty-icon'>inbox</span>
      <h2 className='no-select'>No new notifications</h2>
      <p className='information text-shadow center'>
        You&apos;re all caught up. We&apos;ll let you know when there&apos;s something new.
      </p>
    </div>

    <Divider />
  </Layout>
);

export default Inbox;
