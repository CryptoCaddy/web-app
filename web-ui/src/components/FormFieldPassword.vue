<script lang="ts">
import Vue from 'vue';
import { CaddyInput, Validators } from '@/packages/forms';

export default Vue.extend({
  mixins: [CaddyInput],

  props: {
    label: { type: String, default: 'Password' },
    name: { type: String, default: 'password' },
    equals: { type: String, default: null },
  },

  data() {
    return {
      type: 'password',
      autocomplete: 'current-password',
      rules: [
        (v: string) => Validators.equals(v, this.equals) || `${this.label} does not match.`,
      ],
    };
  },
});
</script>
