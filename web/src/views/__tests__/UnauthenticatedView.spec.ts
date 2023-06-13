import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import UnauthenticatedViewVue from '../UnauthenticatedView.vue';

describe('UnauthenticatedView', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(UnauthenticatedViewVue);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
