// components
import Layout from '../components/Layout/Layout';
import Balance from '../components/Balance/Balance';
import Actions from '../components/Actions/Actions';
import History from '../components/History/History';
import Widgets from '../components/Widgets/Widgets';
import Divider from '../components/Divider/Divider';

// context
import { useAppContext } from '../context/AppContext';

const Home: React.FC = () => {
  const { transactions, selectedAccountId } = useAppContext();

  const accountTransactions = transactions
    .filter((t) => t.accountId === selectedAccountId)
    .slice(0, 4);

  return (
    <Layout>
      <Balance />

      <Actions />

      <Divider />

      <History transactions={accountTransactions} showSeeAll compact clickable />

      <Divider />

      <Widgets />

      <Divider />
    </Layout>
  );
};

export default Home;
