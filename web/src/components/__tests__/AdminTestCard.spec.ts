import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AdminTestCardVue from '../AdminTestCard.vue';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const test = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      numResponses: 5
    };

    const wrapper = shallowMount(AdminTestCardVue, {
      props: {
        test: test
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
