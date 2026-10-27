export type ServiceId = 'media-technology' | 'audiovisual' | 'live-production' | 'streaming-distribution' | 'ai-automation' | 'content-workflow';
export interface Service { id: ServiceId; name: string; headline: string; description: string; capabilities: string[]; outcome: string; }
export interface Scenario { id: string; title: string; summary: string; serviceIds: ServiceId[]; contactInterest: string; }
export interface Industry { name: string; useCases: string[]; }
export type DiagramKind = 'live-journey' | 'rooms' | 'production' | 'audience' | 'workflow';
export interface DiagramNode { id: string; title: string[]; detail: string[]; treatment?: 'focal' | 'store'; }
export interface Diagram { title: string; summary: string; nodes: DiagramNode[]; connections: { from: string; to: string; label: string; optional?: boolean; bidirectional?: boolean; return?: boolean }[]; }
export interface SiteContent {
 name: string; tagline: string; heroDescription: string; secondaryHeadline: string; description: string; lastUpdated: string;
 services: Service[]; scenarios: Scenario[]; diagrams: Record<DiagramKind, Diagram>; industries: Industry[]; faqs: {question: string; answer: string}[]; markets: string[];
 about: {intro: string; approach: {title: string; description: string}[]; reasons: string[]};
 locations: {city: string; country: string; label: string; description: string}[];
 partnerships: {description: string; partners: string[]; models: string[]};
 contact: {route: string; status: string; fields: string[]; interests: string[]; guidance: string[]};
}
// Canonical public content. Human pages and AI resources consume this same object.
export const content: SiteContent = {
  "name": "UnifiedLive",
  "tagline": "One Partner for the Entire AI-Powered Live Journey",
  "heroDescription": "From intelligent video conferencing to live production, streaming, and audience engagement—AI integrated across one connected workflow.",
  "secondaryHeadline": "Bridging Audiovisual, Video Conferencing, Live Streaming & Broadcast",
  "description": "UnifiedLive integrates audiovisual systems, video conferencing, live-streaming infrastructure, broadcast workflows, cloud distribution, and AI-powered engagement. We help organizations communicate, produce, broadcast, and engage audiences across venues, remote locations, and online platforms.",
  "lastUpdated": "2026-10-27",
  "diagrams": {
    "live-journey": {
      "title": "One connected, AI-powered live workflow",
      "summary": "Audiovisual spaces and video conferencing bring people into live production. Multiplatform streaming reaches audiences, while AI-powered audience engagement enables participation through voice agents, polls, and Q&A. UnifiedLive connects these capabilities with AI integrated across the workflow.",
      "nodes": [
        {"id":"av-spaces","title":["Audiovisual"],"detail":["Sound · screens · spaces"]},
        {"id":"conferencing","title":["Video conferencing"],"detail":["People joining anywhere"]},
        {"id":"live-production","title":["Live production"],"detail":["Capture · mix · produce"],"treatment":"focal"},
        {"id":"multiplatform","title":["Multiplatform streaming"],"detail":["Reach every channel"]},
        {"id":"ai-engagement","title":["AI-powered audience engagement"],"detail":["Voice agents · polls · Q&A"],"treatment":"focal"}
      ],
      "connections": [
        {"from":"av-spaces","to":"live-production","label":"Audio and video from your space"},
        {"from":"conferencing","to":"live-production","label":"Remote voices and contributions"},
        {"from":"live-production","to":"multiplatform","label":"One production across platforms"},
        {"from":"multiplatform","to":"ai-engagement","label":"Live content and audience participation","bidirectional":true}
      ]
    },
    "rooms": {
      "title": "Bring everyone into the room",
      "summary": "Room AV and video conferencing connect people in the venue with remote participants. Multiplatform streaming extends the conversation to online audiences.",
      "nodes": [
        {"id":"venue","title":["In the room"],"detail":["People + room AV"]},
        {"id":"remote","title":["Joining remotely"],"detail":["Teams + guests"]},
        {"id":"integration","title":["Connected together"],"detail":["AV + video conferencing"],"treatment":"focal"},
        {"id":"online","title":["Beyond the room"],"detail":["Multiplatform live streaming"]}
      ],
      "connections": [
        {"from":"venue","to":"integration","label":"Two-way audio and video","bidirectional":true},
        {"from":"remote","to":"integration","label":"Two-way video conferencing","bidirectional":true},
        {"from":"integration","to":"online","label":"Multiplatform live stream","optional":true}
      ]
    },
    "production": {
      "title": "Your live moment. A wider audience.",
      "summary": "On-site cameras and remote contributors feed live production. Streaming and distribution connect the finished programme to multiple platforms and audiences across regions.",
      "nodes": [
        {"id":"capture","title":["Every perspective"],"detail":["On-site + remote feeds"]},
        {"id":"production","title":["One live experience"],"detail":["Bring your story together"],"treatment":"focal"},
        {"id":"distribution","title":["Across platforms"],"detail":["Streaming + distribution"]},
        {"id":"audiences","title":["Your audience"],"detail":["Wherever they watch"]}
      ],
      "connections": [
        {"from":"capture","to":"production","label":"On-site cameras and remote contribution"},
        {"from":"production","to":"distribution","label":"Produced programme"},
        {"from":"distribution","to":"audiences","label":"Multi-platform and global CDN delivery"}
      ]
    },
    "audience": {
      "title": "Turn viewers into participants",
      "summary": "A live experience reaches its audience; polls, Q&A, and moderated chat bring audience participation back into the experience.",
      "nodes": [
        {"id":"live","title":["Share the moment"],"detail":["In-person · hybrid · virtual"]},
        {"id":"audience","title":["Invite your audience"],"detail":["Watch · listen · respond"]},
        {"id":"interaction","title":["Keep it two-way"],"detail":["Polls · Q&A · moderated chat"],"treatment":"focal"}
      ],
      "connections": [
        {"from":"live","to":"audience","label":"Live experience"},
        {"from":"audience","to":"interaction","label":"Audience participation"},
        {"from":"interaction","to":"live","label":"Questions and responses","return":true}
      ]
    },
    "workflow": {
      "title": "Make more of every live moment",
      "summary": "Production connects to content storage and media asset workflows. Content is prepared for reuse and distribution, extending its value beyond the live experience.",
      "nodes": [
        {"id":"production","title":["Capture the moment"],"detail":["Content from your production"]},
        {"id":"library","title":["Keep it together"],"detail":["Storage + media assets"],"treatment":"store"},
        {"id":"prepare","title":["Ready for reuse"],"detail":["Prepare your content"],"treatment":"focal"},
        {"id":"reuse","title":["Give it another life"],"detail":["Reuse + distribute"]}
      ],
      "connections": [
        {"from":"production","to":"library","label":"Store content"},
        {"from":"library","to":"prepare","label":"Media asset workflow"},
        {"from":"prepare","to":"reuse","label":"Prepared content"}
      ]
    }
  },
  "services": [
    {
      "id": "media-technology",
      "name": "Media Technology Solutions",
      "headline": "Architecture that brings it all together.",
      "description": "We design, plan, and deliver media technology solutions for organizations that need to communicate, produce, broadcast, and engage audiences.",
      "capabilities": [
        "Ideation and solution architecture",
        "Media technology project management",
        "Systems integration",
        "Workflow design and orchestration",
        "Integration of commercial, cloud, and open-source technologies",
        "WebRTC and low-latency communication solutions",
        "Technical consulting and delivery support"
      ],
      "outcome": "A clear, integrated technology roadmap that connects people, venues, content, and audiences."
    },
    {
      "id": "audiovisual",
      "name": "Audiovisual Integration",
      "headline": "Better connected rooms. Better conversations.",
      "description": "Audiovisual integration is a core UnifiedLive capability. We design and integrate AV systems that support business communication, collaboration, live production, and broadcast.",
      "capabilities": [
        "Audiovisual system design and integration",
        "Meeting-room and boardroom AV",
        "Venue, auditorium, studio, campus, and event-space AV",
        "Video conferencing integration",
        "Business communication systems",
        "Room systems and collaboration technology",
        "Audio, video, control, and network integration",
        "Connection of physical venues with remote participants and online audiences",
        "Enabling business meetings and communications to be streamed or broadcast"
      ],
      "outcome": "Seamless communication between in-room participants, remote teams, external guests, and online audiences."
    },
    {
      "id": "live-production",
      "name": "Live Event Production",
      "headline": "Every perspective. One compelling experience.",
      "description": "We provide broadcast-quality production for on-premise, virtual, and hybrid experiences.",
      "capabilities": [
        "Live event strategy and production planning",
        "Multi-camera production",
        "On-site and remote production",
        "Hybrid and virtual event production",
        "Redundant live workflows",
        "Live switching and production operations",
        "Podcast production",
        "Radio broadcasting",
        "IRL streaming setups for content creators",
        "Cloud-based production deployments",
        "Bonding encoding solutions",
        "SRT cloud relays",
        "Remote contribution and field production workflows"
      ],
      "outcome": "Professional, resilient live experiences for audiences wherever they are."
    },
    {
      "id": "streaming-distribution",
      "name": "Live Streaming & Engagement",
      "headline": "From your venue to every audience.",
      "description": "We build and operate live-streaming pipelines that deliver content reliably across platforms and regions.",
      "capabilities": [
        "Live-stream pipeline design and delivery",
        "Standard and automated streaming workflows",
        "Multi-platform simultaneous distribution",
        "Global CDN delivery",
        "Redundant streaming architectures",
        "Cloud relays",
        "SRT contribution and relay workflows",
        "Real-time streaming analytics",
        "Stream monitoring and operational support",
        "Content delivery for virtual, hybrid, and in-person events"
      ],
      "outcome": "Reliable simultaneous delivery to every intended audience and platform."
    },
    {
      "id": "ai-automation",
      "name": "AI, Automation & Audience Engagement",
      "headline": "Less manual work. More meaningful interaction.",
      "description": "We use AI and automation to turn repetitive media tasks into fast, reliable, intelligent workflows, while helping organizations engage audiences during live experiences.",
      "capabilities": [
        "AI workflows and workflow orchestration",
        "Automation of repetitive media and production tasks",
        "Live moderation",
        "Real-time streaming analytics",
        "Live insights and highlights",
        "Live polls",
        "Q&A and moderated chat",
        "Speech-to-text",
        "Text-to-speech",
        "Live voice agents",
        "Voice-agent training and live operational support",
        "Audience engagement for virtual, hybrid, and in-person experiences"
      ],
      "outcome": "More engaging live experiences and less manual operational effort."
    },
    {
      "id": "content-workflow",
      "name": "Content Storage & Workflow",
      "headline": "Keep your content moving forward.",
      "description": "We help organizations manage, store, and move content through reliable media workflows.",
      "capabilities": [
        "Content storage strategy",
        "Media asset workflows",
        "Content preparation and distribution readiness",
        "Workflow orchestration",
        "Integration with production and distribution systems"
      ],
      "outcome": "Content that is easier to store, find, reuse, and distribute."
    }
  ],
  "scenarios": [
    {
      "id": "meeting-room", "title": "Meeting room",
      "summary": "Connect people in the room with remote participants, then bring the conversation to online audiences when you need to.",
      "serviceIds": ["media-technology", "audiovisual", "streaming-distribution"],
      "contactInterest": "Audiovisual Integration"
    },
    {
      "id": "hybrid-event", "title": "Hybrid event",
      "summary": "Bring venues and remote contributors into one production, distribute it across platforms, and invite your audience to participate.",
      "serviceIds": ["audiovisual", "live-production", "streaming-distribution", "ai-automation"],
      "contactInterest": "Live Event Production"
    },
    {
      "id": "creator-setup", "title": "Creator setup",
      "summary": "Connect your production and streaming setup with content workflows and audience interaction, from the live moment to what comes next.",
      "serviceIds": ["live-production", "streaming-distribution", "content-workflow", "ai-automation"],
      "contactInterest": "Live Streaming & Engagement"
    }
  ],
  "industries": [
    {
      "name": "Education",
      "useCases": [
        "Hybrid classrooms and remote learning",
        "Campus events and graduation ceremonies",
        "Lecture capture and virtual guest speakers",
        "Multi-campus communication",
        "Student and community engagement"
      ]
    },
    {
      "name": "Entertainment",
      "useCases": [
        "Live shows and performances",
        "Artist and creator live streams",
        "Podcast and radio production",
        "Fan engagement",
        "Multi-platform distribution"
      ]
    },
    {
      "name": "Sports",
      "useCases": [
        "Live event coverage",
        "Remote production workflows",
        "Multi-camera production",
        "Fan engagement and live interaction",
        "Highlights and live insights"
      ]
    },
    {
      "name": "Events and Conferences",
      "useCases": [
        "Hybrid conferences and summits",
        "Corporate events and town halls",
        "Multi-venue events",
        "Virtual and on-site production",
        "Audience Q&A, polls, and moderated chat"
      ]
    },
    {
      "name": "Gaming",
      "useCases": [
        "Creator live-stream setups",
        "IRL and mobile streaming workflows",
        "Cloud-based production deployments",
        "Bonding encoding for creators on the move",
        "Community engagement and interactive broadcasts"
      ]
    },
    {
      "name": "E-commerce and Live Commerce",
      "useCases": [
        "Live shopping experiences",
        "Product launches",
        "Brand events",
        "Multi-platform audience reach",
        "Real-time audience engagement"
      ]
    },
    {
      "name": "Corporate Communications",
      "useCases": [
        "Town halls and executive briefings",
        "Internal communications",
        "Training and enablement",
        "Multi-site and remote workforce communication",
        "Video conferencing and AV integration"
      ]
    },
    {
      "name": "Digital Marketing",
      "useCases": [
        "Branded live events",
        "Product launches and campaigns",
        "Webinars and virtual experiences",
        "Audience engagement and lead-generation-focused live formats"
      ]
    },
    {
      "name": "Healthcare",
      "useCases": [
        "Low-latency communication using WebRTC",
        "Telehealth and remote consultation workflows",
        "Medical education and training events",
        "Hybrid conferences and clinical education",
        "Secure, reliable communication workflows"
      ]
    },
    {
      "name": "Government and Public Sector",
      "useCases": [
        "Public meetings and civic engagement",
        "Government briefings and announcements",
        "Hybrid public consultations",
        "Training and internal communications",
        "Accessible multi-platform distribution"
      ]
    },
    {
      "name": "Content Creators",
      "useCases": [
        "IRL streaming setups",
        "Bonding encoding solutions",
        "SRT cloud relays",
        "Cloud-based production deployments",
        "Podcasting and radio broadcasting",
        "Multi-platform live distribution",
        "Audience engagement tools"
      ]
    }
  ],
  "faqs": [
    {
      "question": "What does UnifiedLive do?",
      "answer": "UnifiedLive provides media technology solutions across the entire live journey: strategy, ideation, project management, content production, distribution, storage, and audience engagement."
    },
    {
      "question": "Do you only provide live streaming?",
      "answer": "No. Live streaming is one important capability, but UnifiedLive also provides audiovisual integration, video conferencing, broadcast production, content storage, workflow automation, and AI-powered audience engagement."
    },
    {
      "question": "What is UnifiedLive’s core differentiator?",
      "answer": "We bridge audiovisual integration, video conferencing, live streaming, and broadcast. We connect business communications, venues, remote participants, and online audiences through integrated media technology solutions."
    },
    {
      "question": "Do you work with hybrid events?",
      "answer": "Yes. UnifiedLive supports on-premise, virtual, hybrid, and multi-venue experiences."
    },
    {
      "question": "Can you integrate existing AV and video conferencing systems?",
      "answer": "Yes. We design and integrate AV, video conferencing, control, audio, video, network, and streaming systems to connect physical venues with remote participants and online audiences."
    },
    {
      "question": "Do you provide automation?",
      "answer": "Yes. Automation is a major part of UnifiedLive. We provide standard live-stream pipelines and automate tasks that would otherwise require manual effort."
    },
    {
      "question": "What AI capabilities do you provide?",
      "answer": "Capabilities can include AI workflows, workflow orchestration, live moderation, real-time analytics, live insights and highlights, speech-to-text, text-to-speech, live voice agents, polls, Q&A, and moderated chat."
    },
    {
      "question": "Do you support content creators?",
      "answer": "Yes. UnifiedLive can support IRL streaming setups, cloud relays, SRT relays, bonding encoding, cloud-based production deployments, podcasting, radio broadcasting, and multi-platform distribution."
    },
    {
      "question": "Do you work with government organizations?",
      "answer": "Yes. UnifiedLive serves business-to-government customers, including use cases such as public meetings, civic engagement, briefings, training, and hybrid consultations."
    },
    {
      "question": "Where does UnifiedLive operate?",
      "answer": "UnifiedLive has a presence in Sydney, Australia, and Mumbai, India."
    },
    {
      "question": "Does UnifiedLive partner with other organizations?",
      "answer": "Yes. UnifiedLive is open and eager to partner with businesses, organizations, technology providers, creators, and institutions to expand its network."
    },
    {
      "question": "Do you sell specific products?",
      "answer": "The initial UnifiedLive website is service-led. Specific products may be introduced later where they support a customer’s required outcome."
    }
  ],
  "markets": [
    "Businesses and enterprises (B2B)",
    "Content creators and individual customers (B2C)",
    "Government and public-sector organizations (B2G)"
  ],
  "about": {
    "intro": "UnifiedLive is a media technology solutions company built around a simple idea: organizations should not have to manage audiovisual systems, video conferencing, live streaming, broadcast, distribution, storage, and audience engagement as disconnected silos.\n\nWe bring these capabilities together.",
    "approach": [
      {
        "title": "Understand the objective",
        "description": "Identify the audience, venues, participants, content, and desired outcome."
      },
      {
        "title": "Design the solution",
        "description": "Create an architecture that connects AV, communications, production, distribution, and engagement."
      },
      {
        "title": "Integrate the technology",
        "description": "Combine systems, workflows, cloud services, and open-source components."
      },
      {
        "title": "Automate where valuable",
        "description": "Reduce repetitive manual tasks and improve reliability."
      },
      {
        "title": "Deliver and support",
        "description": "Produce, distribute, monitor, and improve the live experience."
      }
    ],
    "reasons": [
      "One partner for strategy, production, distribution, and engagement",
      "Equal expertise across AV integration, video conferencing, live streaming, and broadcast",
      "Experience integrating commercial, cloud, and open-source technologies",
      "Automation-first approach to repetitive media workflows",
      "AI-enabled engagement, moderation, insights, and voice interaction",
      "Solutions designed for on-premise, virtual, hybrid, and multi-venue environments"
    ]
  },
  "locations": [
    {
      "city": "Sydney",
      "country": "Australia",
      "label": "AU",
      "description": "Serving organizations with audiovisual integration, video conferencing, live production, streaming, broadcast, automation, and audience engagement."
    },
    {
      "city": "Mumbai",
      "country": "India",
      "label": "IN",
      "description": "Supporting customers and partners across the region with media technology solutions, live production, streaming workflows, and AI-enabled engagement."
    }
  ],
  "partnerships": {
    "description": "UnifiedLive is open and eager to partner with businesses, organizations, technology providers, creators, and institutions to expand its network.",
    "partners": [
      "Technology vendors and platforms",
      "AV integrators and installers",
      "Event organizers and venues",
      "Production companies",
      "Content creators and studios",
      "Educational institutions",
      "Healthcare organizations",
      "Government and public-sector organizations",
      "Cloud, network, and connectivity providers",
      "Marketing, communications, and creative agencies"
    ],
    "models": [
      "Referral partnerships",
      "Joint solution delivery",
      "Technology integration collaborations",
      "Reseller and channel discussions",
      "Strategic alliances",
      "Creator and community partnerships",
      "Industry and institutional collaborations"
    ]
  },
  "contact": {
    "route": "/contact",
    "status": "Preview only. This form validates your entries but does not send or store your enquiry. Contact delivery has not been configured.",
    "fields": [
      "Full name",
      "Organization",
      "Email address",
      "Phone number",
      "Country or region",
      "Industry",
      "Service interest",
      "Project details",
      "Preferred contact method"
    ],
    "interests": [
      "Media Technology Solutions",
      "Audiovisual Integration",
      "Video conferencing",
      "Live Event Production",
      "Live Streaming & Engagement",
      "AI, Automation & Audience Engagement",
      "Content Storage & Workflow",
      "Partnership enquiry",
      "Other"
    ],
    "guidance": [
      "Organization or creator name",
      "Industry",
      "Location",
      "Objective",
      "Event date, if applicable",
      "Venues or platforms involved",
      "Service interest"
    ]
  }
};
