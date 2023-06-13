import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoadingComponentVue from '../LoadingComponent.vue';

describe('LoadingComponentVue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LoadingComponentVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
