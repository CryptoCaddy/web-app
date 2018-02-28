<script lang="ts">
import { CaddyInput } from '@/packages/forms';
import * as Validators from '@/packages/forms/util/validators';
import Vue from 'vue';

export default Vue.extend({
  mixins: [CaddyInput],

  props: {
    label: { type: String, default: 'Email' },
    name: { type: String, default: 'email' },
  },

  data() {
    return {
      type: 'email',
      autocomplete: 'email',
      rules: [
        (v: string) =>
          Validators.email(v) || `${this.label} must be a valid email address.`,
      ],
    };
  },
});
</script>
