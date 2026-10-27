import type { APIRoute } from 'astro';
import { rawMarkdown } from '../lib/markdown';
export const GET: APIRoute = () => new Response(rawMarkdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
