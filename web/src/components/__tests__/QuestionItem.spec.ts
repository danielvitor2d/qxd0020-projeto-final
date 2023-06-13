import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import QuestionItemVue from '../QuestionItem.vue';

describe('QuestionItemVue', () => {
  it('renders correctly', () => {
    const item = {
      id: 1,
      label: 'Test Label',
      course: 'Test Course'
    };

    const onDelete = vi.fn()

    const wrapper = shallowMount(QuestionItemVue, {
      props: {
        item: item,
        onDelete: onDelete
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
