/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';

import { nanoid } from 'nanoid';

import { TocHeading } from '@/components/table-of-content/toc-heading';

function getParent(prev: TocHeading, current: TocHeading) {
  if (current.level > prev.level) {
    // вложенный заголовок
    return prev;
  }
  if (current.level === prev.level) {
    // соседний
    return prev.parent!;
  }
  // выше уровнем, чем предыдущий
  return getParent(prev.parent!, current);
}

export function useTableOfContent() {
  const [toc, setToc] = useState<TocHeading | null>(null);

  const buildToc = useCallback((ref: HTMLElement) => {
    if (!ref) return;
    const elements = [...ref.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLElement[];

    const rootItem = new TocHeading(null);
    rootItem.parent = rootItem;

    let previousItem = rootItem;

    const filteredHeaders = elements.filter((header) => header.dataset.tocSkip !== 'yes');

    if (filteredHeaders.length === 0) {
      return;
    }

    for (const header of filteredHeaders) {
      const currentItem = new TocHeading(header);
      if (!currentItem.id) {
        header.setAttribute('id', 'title-' + nanoid());
      }
      const parentItem = getParent(previousItem, currentItem);
      currentItem.parent = parentItem;
      parentItem.children.push(currentItem);
      previousItem = currentItem;
    }

    setToc(rootItem);
  }, []);

  return [toc, buildToc] as const;
}
