import { SelectOption } from '@/models/SelectOption';
import moment from 'moment-timezone';

export default {
  getOptions(choiceName: string) {
    switch (choiceName) {
      case 'currency':
        return this.getCurrencies();

      case 'timezone':
        return this.getTimezones();

      default:
        throw new ReferenceError(
          `[ChoicesApi] Unknown choice: "${choiceName}"`,
        );
    }
  },

  getCurrencies(): Promise<SelectOption[]> {
    return new Promise((resolve) => {
      // @TODO
      setTimeout(() => {
        resolve([
          { value: 'usd', label: 'United States dollar - USD ($)' },
          { value: 'eur', label: 'Euro - EUR (€)' },
          { value: 'jpy', label: 'Japanese yen - JPY (¥)' },
          { value: 'gbp', label: 'Pound Sterling - GPB (£)' },
          { value: 'aud', label: 'Australian dollar - AUD (A$)' },
          { value: 'cad', label: 'Canadian dollar - CAD (C$)' },
          { value: 'chf', label: 'Swiss franc - CHF (Fr)' },
          { value: 'cny', label: 'Renminbi - CNY (元;)' },
          { value: 'sek', label: 'Swedish krona - SEK (kr)' },
          { value: 'ndz', label: 'New Zealand dollar - NZD (NZ$)' },
        ]);
      }, Math.random() * 2000);
    });
  },

  getTimezones(): Promise<SelectOption[]> {
    return new Promise((resolve) => {
      // @TODO
      setTimeout(() => {
        resolve(moment.tz.names().map((tz) => ({ value: tz, label: tz })));
      }, Math.random() * 2000);
    });
  },
};
