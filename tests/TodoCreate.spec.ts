import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TodoCreate from '../components/molecules/TodoCreate.vue';

describe('TodoCreate.vue', () => {
  it('emits create event with the model value on submit', async () => {
    const wrapper = mount(TodoCreate);
    const input = wrapper.find('input');
    const form = wrapper.find('form');
    
    await input.setValue('Test todo');
    
    await form.trigger('submit.prevent');
    
    expect(wrapper.emitted().create).toBeTruthy();
    expect(wrapper.emitted().create[0]).toEqual(['Test todo']);
  });

  it('will not emit create event with submit on empty string', async () => {
    const wrapper = mount(TodoCreate);
    const input = wrapper.find('input');
    const form = wrapper.find('form');
    
    await input.setValue('');
    
    await form.trigger('submit.prevent');
    
    expect(wrapper.emitted().create).toBeFalsy();
  });

  it('resets the model value after submit', async () => {
    const wrapper = mount(TodoCreate);
    const input = wrapper.find('input');
    const form = wrapper.find('form');

    await input.setValue('Test todo');

    await form.trigger('submit.prevent');

    expect(input.element.value).toBe('');
  });
});