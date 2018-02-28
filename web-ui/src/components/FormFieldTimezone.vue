<script lang="ts">
import Vue from 'vue';
import * as ChoiceStore from '@/store/modules/choice';
import { SelectOption } from '@/models/SelectOption';
import { CaddySelect } from '@/packages/forms';

export default Vue.extend({
  mixins: [CaddySelect],

  props: {
    label: { type: String, default: 'Timezone' },
    name: { type: String, default: 'timezone' },
  },

  computed: {
    options(): SelectOption[] {
      return ChoiceStore.getters.timezone(this.$store).options;
    },

    loading(): boolean {
      return ChoiceStore.getters.timezone(this.$store).pending;
    },
  },

  mounted() {
    ChoiceStore.dispatchers.loadTimezoneOptions(this.$store);
  },
});
</script>
