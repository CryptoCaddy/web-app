import * as ExchangesStore from '@/store/modules/exchanges';
import { clone } from '@/util/object';
import { shallow, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

import ExchangeConfigForm from '../ExchangeConfigForm.vue';

Vue.use(Vuetify);

jest.mock('@/store/modules/exchanges', () => ({
  getters: {
    addExchange: jest.fn(() => Promise.resolve()),
    supported: jest.fn(() => ({
      data: [
        {
          key: 'BINANCE',
          parameterList: [
            { parameter: 'api key', type: 'string' },
            { parameter: 'api secret', type: 'string' },
          ],
        }, {
          key: 'GDAX',
          parameterList: [
            { parameter: 'api key', type: 'string' },
            { parameter: 'api secret', type: 'string' },
            { parameter: 'passphrase', type: 'string' },
          ],
        }, {
          key: 'BITTREX',
          parameterList: [
            { parameter: 'api key', type: 'string' },
            { parameter: 'api secret', type: 'string' },
          ],
        },
      ],
    })),
  },
  dispatchers: {
    addExchange: jest.fn(() => Promise.resolve()),
    loadSupported: jest.fn(() => null),
  },
}));

describe('ExchangeConfigForm', () => {
  // typings not yet supported
  // let wrapper: Wrapper<ExchangeConfigForm>;
  let wrapper: Wrapper<any>;
  let vm: any;

  function setFormValueExchangeName(key: string) {
    const form = clone(vm.form);
    form.value.exchangeName = key;
    wrapper.setData({ form });
  }

  function setFormValueParameters(parameters: {[key: string]: string}) {
    const form = clone(vm.form);
    form.value.parameters = parameters;
    wrapper.setData({ form });
  }

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(ExchangeConfigForm);
    ({ vm } = wrapper);
    vm.$refs.form.validate = jest.fn();
  });

  describe('[lifecycle] mounted', () => {
    it('should dispatch loading of supported exchange', () => {
      expect(ExchangesStore.dispatchers.loadSupported).toHaveBeenCalled();
    });

    it('should read the supported exchanges from the store', () => {
      expect(ExchangesStore.getters.supported).toHaveBeenCalled();
    });

    describe('initiak state', () => {
      describe('[computed] supportedExchanges', () => {
        it('should contain the supported exchanges', () => {
          expect(vm.supportedExchanges.length).toEqual(3);
        });
      });

      describe('[computed] exchangeOptions', () => {
        it('should contain the select options for supported exchanges', () => {
          expect(vm.exchangeOptions).toEqual([
            { value: 'BINANCE', label: 'BINANCE' },
            { value: 'GDAX', label: 'GDAX' },
            { value: 'BITTREX', label: 'BITTREX' },
          ]);
        });
      });

      describe('[computed] selectedExchange', () => {
        it('should not be set', () => {
          expect(vm.selectedExchange).toBeUndefined();
        });
      });

      describe('[computed] parameterFields', () => {
        it('should not be set', () => {
          expect(vm.parameterFields).toEqual([]);
        });
      });
    });
  });

  describe('<user> selecting an exchange', () => {
    describe('[computed] selectedExchange', () => {
      it('should be updated', () => {
        setFormValueExchangeName('BINANCE');

        expect(vm.selectedExchange).toBeDefined();
        expect(vm.selectedExchange.key).toEqual('BINANCE');
        expect(vm.selectedExchange.parameterList.length).toEqual(2);
      });
    });

    describe('[computed] parameterFields', () => {
      it('should be updated', () => {
        setFormValueExchangeName('BINANCE');

        expect(vm.parameterFields).toEqual([
          { key: 'api key', type: 'string' },
          { key: 'api secret', type: 'string' },
        ]);
      });
    });

    describe('[method] submit', () => {
      it('should not dispatch if form is invalid', () => {
        jest.spyOn(vm.$refs.form, 'validate').mockReturnValue(false);
        setFormValueExchangeName('BINANCE');
        setFormValueParameters({
          'api key': 'key 1',
          'api secret': 'secret 1',
        });
        vm.submit();

        expect(ExchangesStore.dispatchers.addExchange).not.toHaveBeenCalled();
        // @TODO test emitter
      });

      it('should dispatch submission of the form value', () => {
        jest.spyOn(vm.$refs.form, 'validate').mockReturnValue(true);
        setFormValueExchangeName('BINANCE');
        setFormValueParameters({
          'api key': 'key 1',
          'api secret': 'secret 1',
        });
        vm.submit();

        expect(ExchangesStore.dispatchers.addExchange).toHaveBeenCalledTimes(1);
        expect(ExchangesStore.dispatchers.addExchange).toHaveBeenCalledWith(
          undefined,
          {
            exchangeName: 'BINANCE',
            parameters: {
              'api key': 'key 1',
              'api secret': 'secret 1',
            },
          },
        );
      });

      it('should drop parameters not supported by the exchange', () => {
        jest.spyOn(vm.$refs.form, 'validate').mockReturnValue(true);
        setFormValueExchangeName('BINANCE');
        setFormValueParameters({
          'api key': 'key 1',
          'api secret': 'secret 1',
          passphrase: 'passphrase 1',
        });
        vm.submit();

        expect(ExchangesStore.dispatchers.addExchange).toHaveBeenCalledTimes(1);
        expect(ExchangesStore.dispatchers.addExchange).toHaveBeenCalledWith(
          undefined,
          {
            exchangeName: 'BINANCE',
            parameters: {
              'api key': 'key 1',
              'api secret': 'secret 1',
            },
          },
        );
      });
    });
  });
});
