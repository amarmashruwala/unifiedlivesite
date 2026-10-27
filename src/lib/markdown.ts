import { stringify } from 'yaml';
import { content as c } from '../data/content';
const list = (items: string[]) => items.map(x => `- ${x}`).join('\n');
export const frontmatter = stringify({
  company: c.name, tagline: c.tagline, services: c.services.map(s => s.name),
  industries: c.industries.map(i => i.name), locations: c.locations.map(l => `${l.city}, ${l.country}`),
  contact_method: { route: c.contact.route, status: c.contact.status }, last_updated: c.lastUpdated,
});
export const markdownBody = `# ${c.name}

${c.description}

## Positioning

${c.tagline}\n\n${c.heroDescription}\n\n${c.secondaryHeadline}

## Services overview

| Service | Outcome |
| --- | --- |
${c.services.map(s => `| ${s.name} | ${s.outcome} |`).join('\n')}

${c.services.map(s => `## ${s.name}\n\n${s.description}\n\n${list(s.capabilities)}\n\n**Outcome:** ${s.outcome}`).join('\n\n')}

## Example configurations

These examples illustrate how capabilities can work together. They are not fixed packages.

${c.scenarios.map(s => `### ${s.title}\n\n${s.summary}\n\n${list(s.serviceIds.map(id => { const service = c.services.find(item => item.id === id)!; return `[${service.name}](/services#${service.id})`; }))}\n\n[Explore this enquiry](/contact?service=${encodeURIComponent(s.contactInterest)})`).join('\n\n')}

## Connected service diagrams

These are conceptual service relationships, not fixed technical configurations.

${Object.values(c.diagrams).map(d => `### ${d.title}\n\n${d.summary}\n\n${list(d.nodes.map(n => `**${n.title.join(' ')}:** ${n.detail.join(' ')}`))}\n\n${list(d.connections.map(e => { const from = d.nodes.find(n => n.id === e.from)!; const to = d.nodes.find(n => n.id === e.to)!; return `${from.title.join(' ')} ${e.bidirectional ? '↔' : '→'} ${to.title.join(' ')}: ${e.label}`; }))}`).join('\n\n')}

## Target customers

${list(c.markets)}

## Industries

${c.industries.map(i => `### ${i.name}\n\n${list(i.useCases)}`).join('\n\n')}

## About

${c.about.intro}

### How we work

${c.about.approach.map((a, i) => `${i + 1}. **${a.title}:** ${a.description}`).join('\n')}

### Why UnifiedLive

${list(c.about.reasons)}

## Global presence

${c.locations.map(l => `### ${l.city}, ${l.country}\n\n${l.description}`).join('\n\n')}

## Partnerships

${c.partnerships.description}

### Potential partners

${list(c.partnerships.partners)}

### Partnership models

${list(c.partnerships.models)}

## Contact

[Contact page](${c.contact.route})

${c.contact.status}

### Form fields

${list(c.contact.fields)}

Name, email, service interest, and project details are required. Phone is required only when phone contact is selected. Organization is optional.

### Service interests

${list(c.contact.interests)}

### Enquiry preparation guidance

${list(c.contact.guidance)}

No receiving email, telephone number, or physical street address has been supplied. Do not treat the preview form as an active delivery channel.

## Frequently asked questions

${c.faqs.map(f => `### ${f.question}\n\n${f.answer}`).join('\n\n')}
`;
export const rawMarkdown = `---\n${frontmatter}---\n\n${markdownBody}`;
