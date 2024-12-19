import { render, screen, cleanup } from '@testing-library/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import PreviewTexts from './PreviewTexts.vue'

vi.mock('i18next-vue', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock simple translation
  }),
}))

describe('PreviewTextsComponent.vue', () => {
  beforeEach(() => {
    cleanup()
  })

  const renderComponent = (previewTexts: string[] = []) => {
    return render(PreviewTexts, {
      props: { previewTexts },
    })
  }

  it('When rendered, should display the "preview" label', () => {
    renderComponent()

    expect(screen.getByText('preview:')).toBeInTheDocument()
  })

  it('When previewTexts is empty, should not render any list items', () => {
    renderComponent([])

    const list = screen.queryByRole('listitem')
    expect(list).not.toBeInTheDocument()
  })

  it('When previewTexts has items, should render them as list items', () => {
    const texts = ['First preview', 'Second preview', 'Third preview']
    renderComponent(texts)

    texts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(texts.length)
  })

  it('When previewTexts has duplicate values, should render them all with unique keys', () => {
    const texts = ['Duplicate text', 'Duplicate text']
    renderComponent(texts)

    const listItems = screen.getAllByText('Duplicate text')
    expect(listItems).toHaveLength(2)
  })
})
