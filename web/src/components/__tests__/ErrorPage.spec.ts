import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ErrorPageVue from '../ErrorPage.vue';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const errorMessage = 'Something went wrong';
    
    const wrapper = shallowMount(ErrorPageVue, {
      props: {
        errorMessage: errorMessage
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
