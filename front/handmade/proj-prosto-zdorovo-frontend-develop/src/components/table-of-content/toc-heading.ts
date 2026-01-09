export class TocHeading {
  private element: Element | null;
  public children: TocHeading[];
  public parent: TocHeading | null;

  constructor(element: Element | null) {
    this.element = element;
    this.children = [];
    this.parent = null;
  }

  get content() {
    return this.element?.textContent;
  }

  get id() {
    return this.element?.id;
  }

  get level() {
    return Number.parseInt(this.element?.tagName.slice(1) ?? '0', 10);
  }
}
