import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TestCardVue from '../TestCard.vue';

describe('TestCardVue', () => {
  it('renders correctly', () => {
    const test = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      numResponses: 5
    };

    const wrapper = shallowMount(TestCardVue, {
      props: {
        test: test
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
