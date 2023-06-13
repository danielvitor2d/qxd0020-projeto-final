import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EmptyDataVue from '../EmptyData.vue';

describe('EmptyDataVue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EmptyDataVue, {
      props: {
        primary: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
