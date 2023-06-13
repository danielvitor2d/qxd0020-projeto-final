import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import UnauthorizedViewVue from '../UnauthorizedView.vue';

describe('Unauthorized', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(UnauthorizedViewVue);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
