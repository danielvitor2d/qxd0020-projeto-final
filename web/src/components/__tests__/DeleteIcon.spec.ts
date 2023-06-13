import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DeleteIconVue from '../DeleteIcon.vue';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DeleteIconVue);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
