import type { APIRoute } from 'astro';
import { routes } from '../data/routes';
import { content } from '../data/content';
export const GET: APIRoute = () => new Response(`# UnifiedLive\n\n> ${content.description}\n\n## Structured resources\n\n- [Complete company Markdown](/ai-agent-content.md): Services, industries, company facts, locations, partnerships, FAQs, and contact guidance.\n- [Rendered AI Agent View](/ai): Readable Markdown with copy and download controls.\n\n## Website pages\n\n${routes.filter(r => r.path !== '/ai').map(r => `- [${r.label}](${r.path}): ${r.description}`).join('\n')}\n\n## Contact availability\n\n${content.contact.status}\n\nLast updated: ${content.lastUpdated}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
