// Component.spec.js
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CoursesViewVue from '../CoursesView.vue';

describe('CoursesView', () => {
  it('matches the snapshot', () => {
    const wrapper = shallowMount(CoursesViewVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
