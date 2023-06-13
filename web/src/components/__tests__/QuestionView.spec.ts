import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import QuestionViewVue from '../QuestionView.vue';

describe('QuestionView', () => {
  it('renders correctly', () => {
    const question = {
      id: 1,
      items: [
        { id: 1, label: 'Label 1', course: 'Course 1' },
        { id: 2, label: 'Label 2', course: 'Course 2' }
      ]
    };
    const onDelete = vi.fn();

    const wrapper = shallowMount(QuestionViewVue, {
      props: {
        question: question,
        onDelete: onDelete
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
