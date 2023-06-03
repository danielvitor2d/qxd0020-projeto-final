import { describe, it, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils'
import MyComponent from '../QuestionItem.vue'

describe('MyComponent', () => {
  it('renders the label and course of the item', () => {
    const item = { id: 1, label: 'Item 1', course: 'Math' }
    const wrapper = mount(MyComponent, {
      props: { item, onDelete: vi.fn() }
    })
    expect(wrapper.find('p').text()).toContain('Item 1')
    expect(wrapper.findAll('p')[1].text()).toBe('Math')
  })

  it('calls onDelete when the delete button is clicked', () => {
    const item = { id: 1, label: 'Item 1', course: 'Math' }
    const onDelete = vi.fn()
    const wrapper = mount(MyComponent, {
      props: { item, onDelete }
    })
    wrapper.find('button').trigger('click')
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
