import { mount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Card);
    expect(wrapper.vm).toBeTruthy();
  });
});
