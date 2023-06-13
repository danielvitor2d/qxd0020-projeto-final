import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HomeViewVue from '../HomeView.vue';

describe('HomeView', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(HomeViewVue);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
