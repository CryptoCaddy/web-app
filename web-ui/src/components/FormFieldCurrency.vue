<script lang="ts">
import Vue from 'vue';
import * as ChoiceStore from '@/store/modules/choice';
import { SelectOption } from '@/models/SelectOption';
import { CaddySelect } from '@/packages/forms';

export default Vue.extend({
  mixins: [CaddySelect],

  props: {
    label: { type: String, default: 'Currency' },
    name: { type: String, default: 'currency' },
  },

  computed: {
    options(): SelectOption[] {
      return ChoiceStore.getters.currency(this.$store).options;
    },

    loading(): boolean {
      return ChoiceStore.getters.currency(this.$store).pending;
    },
  },

  mounted() {
    ChoiceStore.dispatchers.loadCurrencyOptions(this.$store);
  },
});
</script>
