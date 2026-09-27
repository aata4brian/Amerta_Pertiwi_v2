"""Check static page structure and local links; no external requests or builds."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.errors = []
        self.h1 = 0
        self.title = 0
        self.viewport = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            if a['id'] in self.ids:
                self.errors.append('Duplicate id: ' + a['id'])
            self.ids.add(a['id'])
        self.h1 += tag == 'h1'
        self.title += tag == 'title'
        self.viewport |= tag == 'meta' and a.get('name') == 'viewport'
        if tag == 'img' and 'alt' not in a:
            self.errors.append('Image missing alt attribute')
        if tag in ('a', 'link', 'script', 'img', 'source'):
            self.links.extend(a[key] for key in ('href', 'src') if a.get(key))


def main():
    pages = {}
    for path in ROOT.glob('*.html'):
        parser = Page()
        parser.feed(path.read_text(encoding='utf-8'))
        pages[path] = parser
    errors = []
    links = 0
    for path, page in pages.items():
        errors.extend(f'{path.name}: {error}' for error in page.errors)
        if page.h1 != 1 or page.title != 1 or not page.viewport:
            errors.append(f'{path.name}: requires one h1, one title and viewport metadata')
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            links += 1
            target = (ROOT / unquote(url.path).lstrip('/')) if url.path else path
            if target.is_dir():
                target /= 'index.html'
            if not target.exists():
                errors.append(f'{path.name}: missing file {link}')
            elif url.fragment and target in pages and url.fragment not in pages[target].ids:
                errors.append(f'{path.name}: missing anchor {link}')
    if errors:
        print('\n'.join(errors))
        raise SystemExit(1)
    print(f'PASS: {len(pages)} HTML pages; {links} local references; headings, viewport, IDs and alt attributes.')
    print('External destinations, factual content and interactive accessibility require separate review.')


if __name__ == '__main__':
    main()
