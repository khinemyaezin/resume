import './styles/main.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const contentEl = document.querySelector('#content');

async function renderMarkdown(): Promise<void> {
  if (!contentEl) {
    console.warn('Markdown container or status element missing.');
    return;
  }

  try {
    const response = await fetch('./content/resume.md', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} loading markdown`);
    }

    const markdown = await response.text();
    const parsed = await Promise.resolve(marked.parse(markdown));
    contentEl.innerHTML = DOMPurify.sanitize(parsed);
  } catch (error) {
    console.error(error);
    contentEl.innerHTML = '<p>Could not render the .md file.</p>';
  }
}

renderMarkdown();
