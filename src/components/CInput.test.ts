import { render, screen, fireEvent, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from 'vitest'
import CInput from './CInput.vue'

describe('CInput.vue', () => {
  beforeEach(() => {
    cleanup()
  })

  const renderComponent = (props = {}) => {
    const allProps = {
      label: '',
      type: 'text',
      modelValue: '',
      ...props,
    }

    return render(CInput, {
      props: allProps,
    })
  }

  it('renders the label correctly', () => {
    renderComponent({ label: 'Test Label' })

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders the input with the correct type', () => {
    renderComponent({ type: 'password', label: 'Test Label' })
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'password')
  })

  it('binds the model value correctly', async () => {
    const { rerender, emitted } = renderComponent({ modelValue: 'initial value' })
    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('initial value')

    await fireEvent.update(input, 'new value')
    expect(input).toHaveValue('new value')

    expect(emitted('update:modelValue')).toHaveLength(1)
    expect(emitted('update:modelValue')[0]).toEqual(['new value'])

    await rerender({ modelValue: 'updated value' })
    expect(emitted('update:modelValue')).toHaveLength(1)
    expect(emitted('update:modelValue')[0]).toEqual(['new value'])

    expect(input).toHaveValue('updated value')
  })
})
