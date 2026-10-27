import type { APIRoute } from 'astro';
import { routes } from '../data/routes';
import { content } from '../data/content';
export const GET: APIRoute = ({ site }) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? routes.map(r => `<url><loc>${new URL(r.path, site).href.replaceAll('&','&amp;')}</loc><lastmod>${content.lastUpdated}</lastmod></url>`).join('') : ''}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
