import { useState } from 'react';

// components
import Button from '../components/Form/Button';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import Currency from '../components/Currency/Currency';

const Savings: React.FC = () => {
  const [selected, setSelected] = useState<string>('');

  /**
   * Handles the selection of a currency symbol.
   *
   * @param {string} symbol - The symbol of the currency to be selected.
   */
  const handleOnSelect = (symbol: string): void => {
    setSelected(symbol);
  };

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Savings</h1>

      <p className='information text-shadow'>
        Annual Equivalent Rate or AER, is used to show what you would earn in interest over a year.
        Please select a currency in the list.
      </p>

      <Divider />

      <div className='history'>
        <Currency
          aer='3.15% AER'
          name='Ukrainian Hryvnia'
          shortName='UAH'
          active={selected === 'UAH'}
          onSelect={() => {
            handleOnSelect('UAH');
          }}
        >
          <span className='currency-symbol-icon'>₴</span>
        </Currency>
        <Currency
          aer='1.49% AER'
          name='US Dollar'
          shortName='USD'
          active={selected === 'USD'}
          onSelect={() => {
            handleOnSelect('USD');
          }}
        >
          <svg fill='#ffffff' width='20px' height='20px' viewBox='0 0 85.43 85.43' stroke='#ffffff'>
            <g>
              <path d='M58.878,42.166c-2.838-2.262-7.025-4.459-12.8-6.717c-6.291-2.446-8.85-3.95-9.891-4.783 c-1.229-0.982-1.801-2.269-1.801-4.047c0-1.271,0-5.14,10.141-5.14c5.443,0,10.383,0.88,14.683,2.615 c0.51,0.206,1.084,0.176,1.569-0.083c0.484-0.258,0.832-0.717,0.947-1.255l1.938-9.064c0.204-0.957-0.367-1.91-1.31-2.179 c-3.549-1.014-8.137-1.629-13.66-1.833V2.01c0.043-0.518-0.135-1.029-0.485-1.411C47.855,0.218,47.359,0,46.843,0h-6.377 c-0.52,0-1.016,0.218-1.369,0.6c-0.353,0.382-0.529,0.896-0.486,1.413l0.053,8.089c-5.588,0.853-9.9,2.938-12.836,6.208 c-3.219,3.588-4.852,7.792-4.852,12.496c0,5.448,2.338,10.081,6.961,13.777c2.707,2.131,6.928,4.325,12.908,6.708 c4.557,1.799,7.702,3.369,9.346,4.668c1.709,1.35,2.541,2.917,2.541,4.79c0,3.493-4.063,5.265-12.078,5.265 c-5.871,0-11.471-1.01-16.648-3.001c-0.508-0.196-1.078-0.159-1.557,0.103c-0.479,0.261-0.82,0.718-0.932,1.25l-1.939,9.189 c-0.209,0.993,0.416,1.971,1.404,2.198c5.516,1.274,11.416,1.976,17.566,2.094l0.033,7.611c-0.029,0.512,0.078,1.014,0.43,1.387 c0.352,0.374,0.842,0.585,1.355,0.585h6.478c0.008,0,0.016,0,0.022,0c1.029,0,1.861-0.833,1.861-1.861 c0-0.143-0.016-0.283-0.047-0.416l0.024-7.928c11.255-1.982,17.188-8.667,17.188-19.412C65.894,50.49,63.533,45.9,58.878,42.166z' />{' '}
            </g>
          </svg>
        </Currency>
        <Currency
          aer='1.19% AER'
          name='Euro'
          shortName='EUR'
          active={selected === 'EUR'}
          onSelect={() => {
            handleOnSelect('EUR');
          }}
        >
          <svg
            fill='#ffffff'
            width='20px'
            height='20px'
            viewBox='0 0 310.75 310.75'
            stroke='#ffffff'
          >
            <g>
              <path d='M183.815,265.726c-32.444,0-60.868-21.837-76.306-54.325h102.101v-45.023H95.643c-0.284-3.642-0.437-7.29-0.437-11.016 c0-3.691,0.152-7.384,0.437-10.977h113.969V99.353H107.51c15.438-32.485,43.861-54.315,76.306-54.315 c31.01,0,60.21,20.759,76.2,54.152l40.626-19.418C277.091,30.554,232.329,0,183.815,0c-36.47,0-70.51,16.665-95.851,46.966 C75.219,62.209,65.481,79.995,59.079,99.353H10.108v45.031h40.39c-0.217,3.617-0.329,7.311-0.329,10.977 c0,3.704,0.112,7.351,0.329,11.016h-40.39V211.4h48.971c6.402,19.356,16.14,37.122,28.886,52.351 c25.341,30.303,59.381,46.999,95.851,46.999c48.515,0,93.275-30.55,116.826-79.767l-40.626-19.454 C244.025,244.965,214.825,265.726,183.815,265.726z' />{' '}
            </g>
          </svg>
        </Currency>
      </div>

      <Divider />

      <div className='add-buttons flex flex-space-between'>
        <Button type='submit' text='Continue' tabIndex={0} disabled={selected === ''} />
      </div>

      <Divider />
    </Layout>
  );
};

export default Savings;
