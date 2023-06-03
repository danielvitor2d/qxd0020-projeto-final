import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';

import QuestionItem from '../../components/QuestionItem.vue';
import Question from '../../components/Question.vue';

describe('Question', () => {
  it('renders correctly', () => {
    const onDelete = vi.fn();
    const question = {
      id: 1,
      items: [
        { id: 1, label: 'Option 1', course: 'Course A' },
        { id: 2, label: 'Option 2', course: 'Course B' },
        { id: 3, label: 'Option 3', course: 'Course C' },
      ],
    };

    const wrapper = mount(Question, {
      props: {
        question,
        onDelete,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    const question = {
      id: 1,
      items: [
        { id: 1, label: 'Option 1', course: 'Course A' },
        { id: 2, label: 'Option 2', course: 'Course B' },
        { id: 3, label: 'Option 3', course: 'Course C' },
      ],
    };

    const wrapper = mount(Question, {
      props: {
        question,
        onDelete,
      },
    });

    const deleteButton = wrapper.find('.delete-button');
    deleteButton.trigger('click');

    expect(onDelete).toHaveBeenCalledWith(question.id);
  });

  it('adds a new item when add button is clicked', () => {
    const onDelete = vi.fn();
    const question = {
      id: 1,
      items: [
        { id: 1, label: 'Option 1', course: 'Course A' },
        { id: 2, label: 'Option 2', course: 'Course B' },
        { id: 3, label: 'Option 3', course: 'Course C' },
      ],
    };

    const wrapper = mount(Question, {
      props: {
        question,
        onDelete,
      },
    });

    const addButton = wrapper.find('.add-button');
    addButton.trigger('click');

    const items = wrapper.findAllComponents(QuestionItem);
    expect(items.length).toBe(3);
  });
});
