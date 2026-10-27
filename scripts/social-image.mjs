import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#132522"/>
<g transform="translate(54 35)" fill="none"><path d="M8 8v16c0 9 7 16 16 16s16-7 16-16V8" stroke="#D5FF63" stroke-width="6" stroke-linecap="round"/><circle cx="24" cy="17" r="5" fill="#85C9DF"/></g>
<text x="113" y="82" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#F5F6F2" font-weight="700" letter-spacing="-1">unified<tspan font-weight="400">live</tspan><tspan fill="#D5FF63">.</tspan></text>
<g fill="#F5F6F2" font-family="Arial, Helvetica, sans-serif" font-size="76" letter-spacing="-2">
<text x="55" y="204">One Partner for the Entire</text><text x="55" y="286">AI-Powered Live Journey</text></g>
<path d="M195 455H985" stroke="#85C9DF" stroke-width="10"/>
<rect x="55" y="385" width="220" height="140" rx="8" fill="#E2EFED"/>
<rect x="74" y="404" width="182" height="102" fill="#85C9DF"/>
<g fill="#132522"><circle cx="130" cy="438" r="18"/><circle cx="200" cy="438" r="18"/><path d="M102 491v-12a28 28 0 0 1 56 0v12M172 491v-12a28 28 0 0 1 56 0v12"/></g>
<rect x="510" y="390" width="130" height="130" rx="22" fill="#D5FF63"/>
<path d="M537 418v39c0 22 17 39 39 39s39-17 39-39v-39" fill="none" stroke="#132522" stroke-width="9" stroke-linecap="round"/><circle cx="576" cy="442" r="11" fill="#85C9DF"/>
<rect x="920" y="387" width="220" height="60" rx="7" fill="#E2EFED"/><rect x="940" y="467" width="200" height="60" rx="7" fill="#85C9DF"/>
<g fill="#132522"><circle cx="953" cy="417" r="14"/><circle cx="973" cy="497" r="14"/></g>
<g fill="#F5F6F2" font-family="Arial, Helvetica, sans-serif" font-size="20">
<text x="55" y="582">Audiovisual · Conferencing · Production · Streaming · Engagement</text></g>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social.png');
console.log('Generated public/social.png');
