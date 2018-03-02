import { SelectOption } from '@/models/SelectOption';

export interface ChoiceState {
  currency: Choice;
  timezone: Choice;
}

export interface Choice {
  options: SelectOption[];
  pending: boolean;
}
