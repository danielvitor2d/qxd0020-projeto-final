import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils';
import NavbarVue from '../Navbar.vue';

describe('NavBar', () => {
  it('renders the correct title', () => {
    const wrapper = mount(NavbarVue);
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('Cursos');
    expect(wrapper.text()).toContain('Admin');
  });
});