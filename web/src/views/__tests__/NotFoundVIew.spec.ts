import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import NotFound from '../NotFoundView.vue';

describe('NotFound', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(NotFound);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
