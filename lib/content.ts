/**
 * Single source of truth for all site copy.
 * Text is reproduced verbatim from the approved OBITER Legal website content document.
 */

export type Item = { title: string; body: string };
export type Practice = {
  slug: string;
  title: string;
  /** Condensed label for the vertical rail and section navigation. */
  short: string;
  lede: string;
  items: Item[];
  note?: string;
};

export const site = {
  name: "Obiter Legal",
  wordmark: "Obiter",
  wordmarkTail: "Legal",
  tagline: "Commercially Focused Legal Counsel for Business",
  description:
    "Obiter Legal is a boutique law firm advising businesses, founders, investors and creators across corporate, commercial, capital markets, media and entertainment, intellectual property, real estate and regulatory matters.",
  url: "https://obiterlegal.in",
  email: "stutika@obiterlegal.in",
  phone: "+91 9004278633",
  phoneHref: "+919004278633",
  address: [
    "Office 112, Rex Chambers",
    "Walchand Hirachand Marg",
    "Ballard Estate, Fort",
    "Mumbai 400001",
  ],
  city: "Mumbai, India",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Startup Advisory", href: "/startup-advisory" },
  { label: "Industries", href: "/industries" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
] as const;

export const home = {
  heading: "Commercially Focused Legal Counsel for Business",
  lede: "Obiter Legal is a boutique law firm advising businesses, founders, investors and creators across corporate, commercial, capital markets, media and entertainment, intellectual property, real estate and regulatory matters.",
  body: "We approach legal matters with an understanding of the business, transaction or relationship behind them. Our role is to provide clear, considered and commercially grounded advice that enables clients to make sound decisions.",
  cta: "Contact Obiter Legal",
};

export const about = {
  lede: "Obiter Legal is a boutique law firm advising businesses, founders, investors and professionals on corporate, commercial and transactional matters.",
  paragraphs: [
    "Our practice spans Corporate and Commercial, Capital Markets, Media and Entertainment, Intellectual Property, Real Estate, Dispute Resolution, Insolvency and Financial Services and Regulatory Advisory.",
    "We work across the lifecycle of a matter, from structuring and due diligence through documentation, negotiation and execution, and where required, ongoing legal and regulatory support.",
    "We believe effective legal advice should be clear, commercially relevant and capable of being acted upon. We look beyond the document itself to understand the transaction, the relationship between the parties and the business objective that the legal framework is intended to support.",
    "Our approach is grounded in judgement, discretion and attention to the matters that are material to the client. We aim to build lasting professional relationships through careful advice, responsiveness and a consistent understanding of our clients’ priorities.",
  ],
  pillars: [
    {
      label: "Our Approach",
      statement: "Legal advice is most useful when it is clear, considered and practical.",
      body: "We seek to understand the commercial context before addressing the legal issue, identify the matters that require attention and provide advice that can support a clear business decision.",
    },
    {
      label: "Our Philosophy",
      statement: "We value sound judgement, discretion and direct involvement in client matters.",
      body: "Our objective is not simply to resolve the immediate legal issue, but to provide counsel that remains aligned with the broader commercial interests of the client.",
    },
    {
      label: "Our Vision",
      statement: "Enduring relationships, built to last.",
      body: "To grow with our clients and build enduring professional relationships founded on trust, sound judgement and long term value.",
    },
  ],
};

export const whyObiter: Item[] = [
  {
    title: "Commercial Understanding",
    body: "We consider the commercial context in which legal decisions are made and tailor our advice accordingly.",
  },
  {
    title: "Practical Counsel",
    body: "We focus on identifying material legal and commercial issues early and addressing them in a manner that is practical and capable of implementation.",
  },
  {
    title: "Attention to Detail",
    body: "Careful analysis, thorough diligence and considered documentation form the foundation of our work.",
  },
  {
    title: "Senior Level Involvement",
    body: "Clients have direct access to senior legal counsel who remain closely involved in their matters and understand the legal, commercial and strategic considerations involved.",
  },
  {
    title: "Continuity and Responsiveness",
    body: "We value continuity in client relationships and seek to remain accessible and responsive throughout the course of a matter.",
  },
];

export const practices: Practice[] = [
  {
    slug: "corporate-and-commercial",
    title: "Corporate and Commercial",
    short: "Corporate",
    lede: "We advise businesses across the legal and commercial issues that arise in their operations, transactions and relationships.",
    items: [
      {
        title: "Commercial Contracts",
        body: "Drafting, reviewing and negotiating agreements with customers, vendors, service providers, consultants, distributors, agents, partners and other counterparties.",
      },
      {
        title: "Corporate Structuring and Advisory",
        body: "Advice on business structures, ownership, governance and legal considerations arising from changes in a business.",
      },
      {
        title: "Legal Due Diligence",
        body: "Review of corporate, contractual, regulatory, litigation, intellectual property and other material legal matters in connection with transactions and strategic decisions.",
      },
      {
        title: "Mergers and Acquisitions",
        body: "Legal support on acquisitions, business transfers, mergers and related transaction documentation.",
      },
      {
        title: "Joint Ventures and Strategic Partnerships",
        body: "Structuring and documentation of joint ventures, collaborations and strategic business arrangements.",
      },
      {
        title: "Private Equity and Investment Transactions",
        body: "Legal support on investments, shareholder arrangements, subscription and related transaction documents.",
      },
      {
        title: "Restructuring and Reorganisation",
        body: "Advice on corporate and commercial restructuring, reorganisation and realignment.",
      },
      {
        title: "Corporate Governance and Compliance",
        body: "Advice on governance, shareholder and board matters, statutory requirements and ongoing corporate compliance.",
      },
      {
        title: "CSR and Regulatory Matters",
        body: "Advisory on CSR requirements, regulatory approvals, filings and transaction related compliance.",
      },
    ],
  },
  {
    slug: "capital-markets-and-sme-ipos",
    title: "Capital Markets and SME IPOs",
    short: "Capital Markets",
    lede: "We advise issuers, promoters, merchant bankers and other transaction stakeholders on capital raising and public market transactions, with particular experience in SME IPOs.",
    items: [
      {
        title: "IPO and SME IPO Advisory",
        body: "Legal support through IPO preparation, transaction structuring, due diligence, documentation and coordination with transaction stakeholders.",
      },
      {
        title: "DRHP and Offer Documentation",
        body: "Drafting, review and coordination of legal inputs for DRHPs and related offering documents and disclosures.",
      },
      {
        title: "Legal Due Diligence for IPOs",
        body: "Due diligence across corporate records, material contracts, litigation, regulatory matters, intellectual property, real estate and other material legal issues.",
      },
      {
        title: "Merchant Banker and Issue Side Support",
        body: "Assistance to merchant bankers and transaction teams on legal diligence, disclosures, documentation and issue requirements.",
      },
      {
        title: "Securities and Regulatory Advisory",
        body: "Advice on applicable securities laws, regulations, approvals, filings and transaction requirements.",
      },
      {
        title: "Private Placements and Fundraising",
        body: "Legal assistance on private placements, institutional investments and other capital raising transactions.",
      },
      {
        title: "Rights, Preferential and Other Issuances",
        body: "Documentation and advisory for securities issuances and capital raising structures.",
      },
      {
        title: "IPO Readiness and Corporate Clean Up",
        body: "Identification and resolution of documentation, governance, contractual and structural matters relevant to public market readiness.",
      },
    ],
  },
  {
    slug: "media-and-entertainment",
    title: "Media and Entertainment",
    short: "Media",
    lede: "We advise clients across film, television, music and digital media on the legal aspects of content creation, production, financing, exploitation and distribution.",
    items: [
      {
        title: "Content and Film Production",
        body: "Production agreements and legal structuring for films, television, digital and other content.",
      },
      {
        title: "Co Production and Financing",
        body: "Structuring and documentation of co production, financing and collaboration arrangements.",
      },
      {
        title: "Artist, Talent, Writer and Director Agreements",
        body: "Negotiation and documentation relating to engagement, deliverables, remuneration, rights and obligations.",
      },
      {
        title: "OTT and Digital Content",
        body: "Advice on digital distribution, streaming, content exploitation and platform arrangements.",
      },
      {
        title: "Music Licensing and Rights",
        body: "Licensing and related documentation for music and associated intellectual property rights.",
      },
      {
        title: "Distribution and Licensing",
        body: "Agreements for distribution, licensing, syndication and exploitation of content across media and territories.",
      },
      {
        title: "Entertainment IP",
        body: "Protection, assignment, licensing and commercial exploitation of intellectual property connected with content, characters, formats and brands.",
      },
      {
        title: "Chain of Title and Rights",
        body: "Review and structuring of underlying rights, assignments, permissions and documentation required for the lawful exploitation of content.",
      },
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    short: "Intellectual Property",
    lede: "We advise clients on the ownership, protection, use and commercialisation of intellectual property.",
    items: [
      {
        title: "Trademarks, Copyright and Designs",
        body: "Registration, portfolio management, licensing and advisory across intellectual property rights.",
      },
      {
        title: "IP Strategy and Protection",
        body: "Advice on ownership, protection and management of intellectual property portfolios.",
      },
      {
        title: "IP Due Diligence",
        body: "Review of intellectual property ownership and related contractual, licensing and regulatory considerations in transactions.",
      },
      {
        title: "IP Licensing and Commercialisation",
        body: "Structuring and documentation for licensing, assignment, technology transfer and joint development arrangements.",
      },
      {
        title: "IP Enforcement",
        body: "Support in relation to oppositions, infringement matters and other enforcement proceedings.",
      },
    ],
    note: "Our experience extends across brands, software, technology, creative works, content and other commercially significant intellectual property.",
  },
  {
    slug: "real-estate-and-rera-advisory",
    title: "Real Estate and RERA Advisory",
    short: "Real Estate",
    lede: "We advise developers, investors, businesses, landlords and other stakeholders on property transactions, development and related regulatory matters.",
    items: [
      {
        title: "Property Acquisition and Sale",
        body: "Drafting, review and negotiation of agreements for the purchase and sale of residential, commercial and other property.",
      },
      {
        title: "Title Verification and Due Diligence",
        body: "Review of title, ownership history, encumbrances, permissions, approvals and other matters relevant to a property transaction.",
      },
      {
        title: "Leave and Licence and Lease Arrangements",
        body: "Drafting and negotiation of commercial and residential lease and leave and licence documentation.",
      },
      {
        title: "Joint Development and Development Agreements",
        body: "Structuring and documentation of development and redevelopment arrangements.",
      },
      {
        title: "RERA Advisory",
        body: "Advice on applicable RERA requirements, documentation, registration and compliance.",
      },
      {
        title: "Commercial Real Estate",
        body: "Legal support for acquisition, occupation, investment and contractual arrangements relating to commercial premises.",
      },
    ],
  },
  {
    slug: "dispute-resolution-and-arbitration",
    title: "Dispute Resolution and Arbitration",
    short: "Disputes",
    lede: "We advise and represent clients in commercial, corporate, contractual and regulatory disputes.",
    items: [
      {
        title: "Commercial Litigation",
        body: "Representation and advisory in commercial and corporate disputes before courts and tribunals.",
      },
      {
        title: "Domestic and International Arbitration",
        body: "Advice and representation across the arbitral process, including drafting and negotiating arbitration provisions.",
      },
      {
        title: "Enforcement and Challenge of Awards",
        body: "Advice on enforcement and proceedings concerning the setting aside of arbitral awards.",
      },
      {
        title: "Contractual and Corporate Disputes",
        body: "Counsel on disputes arising from commercial contracts, shareholder relationships, corporate arrangements and business transactions.",
      },
      {
        title: "Negotiation and Mediation",
        body: "Strategic advice on negotiated resolutions and alternative dispute resolution where commercially appropriate.",
      },
    ],
  },
  {
    slug: "insolvency-and-restructuring",
    title: "Insolvency and Restructuring",
    short: "Insolvency",
    lede: "We advise stakeholders on corporate insolvency, debt resolution and restructuring matters under the Insolvency and Bankruptcy Code and related laws.",
    items: [
      {
        title: "Insolvency Proceedings",
        body: "Advice and representation in proceedings before the NCLT and NCLAT.",
      },
      {
        title: "Creditor and Debtor Advisory",
        body: "Counsel for financial creditors, corporate debtors and promoters in relation to insolvency proceedings, claims and related matters.",
      },
      {
        title: "Resolution Plans",
        body: "Assistance with resolution plan documentation, negotiations and related legal considerations.",
      },
      {
        title: "Corporate Restructuring",
        body: "Advice on restructuring outside formal insolvency, including refinancing, negotiated settlements, reorganisation and business realignment.",
      },
      {
        title: "Related Corporate Matters",
        body: "Advice on shareholder, board and other corporate issues arising in the context of restructuring and insolvency.",
      },
    ],
  },
  {
    slug: "financial-services-and-regulatory-advisory",
    title: "Financial Services and Regulatory Advisory",
    short: "Financial Services",
    lede: "We advise businesses operating within regulated financial sectors, including NBFCs, fintech businesses, payment platforms and other financial services enterprises.",
    items: [
      {
        title: "NBFC Advisory",
        body: "Advice on RBI related licensing, regulatory requirements, compliance and inspections.",
      },
      {
        title: "Fintech and Payments",
        body: "Counsel on regulatory frameworks relating to digital lending, payment systems, prepaid instruments and other fintech activities.",
      },
      {
        title: "Banking and Financial Regulation",
        body: "Advice on RBI, SEBI, foreign exchange and other applicable financial sector regulations.",
      },
      {
        title: "Regulatory Compliance",
        body: "Support in understanding and implementing regulatory requirements applicable to evolving financial and technology driven business models.",
      },
      {
        title: "Financial Transactions",
        body: "Regulatory and legal support in connection with investments, financing, restructuring and other financial transactions.",
      },
    ],
  },
];

export const startupAdvisory = {
  lede: "For founders and emerging businesses, we provide legal support from incorporation through fundraising, growth, governance and strategic transactions.",
  items: [
    {
      title: "Incorporation and Structuring",
      body: "Advice on incorporation, ownership, founder arrangements and legal structuring.",
    },
    {
      title: "Founders and Shareholders",
      body: "Documentation and advice on founder rights, governance, transfer restrictions and shareholder arrangements.",
    },
    {
      title: "ESOPs and Governance",
      body: "Legal documentation for employee incentive arrangements and governance frameworks appropriate to growing businesses.",
    },
    {
      title: "Seed, Venture and Private Funding",
      body: "Support on term sheets, investment documentation, negotiations and funding rounds.",
    },
    {
      title: "Commercial and Regulatory Advisory",
      body: "Contracts, compliance and legal advice supporting the operation and growth of the business.",
    },
    {
      title: "Exit Planning",
      body: "Legal support for acquisitions, promoter and investor exits, business transfers and other liquidity events.",
    },
  ] satisfies Item[],
};

export const industries = {
  lede: "Our legal work is informed by the commercial and regulatory environment in which our clients operate.",
  items: [
    {
      title: "Media and Entertainment",
      body: "Film and media companies, production houses, studios, television and OTT platforms, publishers, artists and other content businesses.",
    },
    {
      title: "Startups and Emerging Businesses",
      body: "Technology startups, e commerce businesses and emerging enterprises navigating formation, investment, growth and commercial relationships.",
    },
    {
      title: "Financial Services",
      body: "Banks, NBFCs, fintech businesses, investment firms and payment platforms requiring regulatory and transactional support.",
    },
    {
      title: "Real Estate and Infrastructure",
      body: "Developers, investors, landlords and businesses involved in property acquisition, development, leasing and related regulatory matters.",
    },
    {
      title: "Technology and Digital",
      body: "Technology companies, software businesses, internet platforms and digital service providers addressing contracts, intellectual property, technology arrangements and regulatory considerations.",
    },
    {
      title: "Consumer and Brands",
      body: "Retail, consumer goods, fashion and lifestyle businesses requiring support across commercial contracts, intellectual property, licensing and advertising related matters.",
    },
    {
      title: "Pharmaceuticals and Healthcare",
      body: "Pharmaceutical, biotechnology and healthcare businesses dealing with intellectual property, licensing, commercial arrangements and regulatory matters.",
    },
  ] satisfies Item[],
};

export const founder = {
  name: "Stutika Rathi Gupta",
  role: "Founder and Principal",
  lede: "Stutika Rathi Gupta is the Founder and Principal of Obiter Legal, with experience advising Indian and international clients on corporate, commercial and transactional matters.",
  paragraphs: [
    "Her practice spans corporate and commercial transactions, capital markets, media and entertainment, intellectual property, real estate and regulatory matters, with experience across transactions, advisory mandates and complex negotiations.",
    "She has advised clients on matters including mergers and acquisitions, investments, SME IPOs, intellectual property licensing, media and entertainment transactions, pharmaceutical and regulatory matters and commercial arrangements.",
    "Her approach is grounded in practical advice, careful analysis and an understanding of the commercial considerations underlying each matter.",
  ],
};

export const contact = {
  heading: "Contact Obiter Legal",
  lede: "Discuss your legal requirement with us and we will direct it to the relevant practice.",
};

export const footer = {
  title: "Obiter Legal",
  statement:
    "Thoughtful legal counsel for the matters that shape a business, transaction or venture.",
  paragraphs: [
    "Obiter Legal advises businesses, founders, investors, professionals and creators across corporate, commercial, capital markets, media and entertainment, intellectual property, real estate, dispute resolution, insolvency and regulatory matters.",
    "We focus on understanding the objective behind a matter, identifying the issues that require attention and providing clear legal counsel that supports sound business decisions.",
  ],
};

export const DISCLAIMER = `The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge and confirm that you are seeking information relating to Obiter Legal of your own accord and that there has been no form of solicitation, advertisement or inducement by Obiter Legal or its members. The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice. Obiter Legal shall not be liable for consequences of any action taken by relying on the material/information provided on this website. The contents of this website are the intellectual property of Obiter Legal.`;

export const DISCLAIMER_PARAGRAPHS = [
  "The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge and confirm that you are seeking information relating to Obiter Legal of your own accord and that there has been no form of solicitation, advertisement or inducement by Obiter Legal or its members.",
  "The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice.",
  "Obiter Legal shall not be liable for consequences of any action taken by relying on the material/information provided on this website. The contents of this website are the intellectual property of Obiter Legal.",
];

/* -------------------------------------------------------------------------- */
/* Legal documents — Privacy Policy and Terms & Conditions                     */
/* -------------------------------------------------------------------------- */

export type LegalSection = {
  index: string;
  title: string;
  /** Opening statement of the clause, set slightly larger than the body. */
  lead?: string;
  /** Dashed list, where the clause enumerates. */
  list?: string[];
  /** Paragraphs following the lead and any list. */
  body?: string[];
  /** Contact block closing a clause. */
  contact?: { name: string; email: string };
};

export type LegalDocument = {
  slug: string;
  title: string;
  kicker: string;
  /** Short summary used as the masthead lede and in page metadata. */
  summary: string;
  effective?: string;
  intro: string[];
  sections: LegalSection[];
};

/** The address the legal documents publish. Kept in step with `site.email`. */
export const legalContactEmail = site.email;

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  kicker: "Privacy Policy",
  summary:
    "What information Obiter Legal may collect through this website, how it is used, when it may be shared, and the choices available to you.",
  effective: "Effective 5 September 2026",
  intro: [
    "OBITER Legal (“OBITER Legal”, “we”, “us” or “our”) respects your privacy and is committed to protecting the personal information shared with us through our website, www.obiterlegal.in, and through other communications with us.",
    "This Privacy Policy explains what information we may collect, how we use it, when we may share it and the choices available to you.",
  ],
  sections: [
    {
      index: "01",
      title: "Information We Collect",
      lead: "We may collect information that you voluntarily provide to us, including your:",
      list: [
        "Name, email address, telephone number, organisation or designation, and other contact details;",
        "Information provided when you submit an enquiry, request legal services, communicate with us or otherwise interact with our website;",
        "Information contained in documents or correspondence shared with us in connection with a legal matter; and",
        "Information relating to your use of our website, including technical or usage information, where collected through cookies or similar technologies.",
      ],
      body: [
        "We may also receive information from publicly available sources or third parties where reasonably necessary for providing our services or complying with applicable law.",
      ],
    },
    {
      index: "02",
      title: "How We Use Your Information",
      lead: "We may use your information to:",
      list: [
        "Respond to enquiries and communicate with you;",
        "Provide, manage and administer legal services;",
        "Prepare and manage legal documentation and related transactions;",
        "Comply with applicable legal, regulatory and professional obligations;",
        "Maintain records and manage billing and administrative matters;",
        "Protect the security of our website, systems and information; and",
        "Improve our website, services and communications.",
      ],
      body: ["We do not sell or commercially trade your personal information."],
    },
    {
      index: "03",
      title: "Disclosure of Information",
      lead: "We may disclose personal information where reasonably necessary for the purposes described in this Policy, including to:",
      list: [
        "Our professional advisers, consultants, technology providers and other service providers assisting us;",
        "Courts, tribunals, regulators, governmental authorities or law enforcement agencies where required or permitted by law; and",
        "Other persons where disclosure is necessary to provide legal services or is authorised by you.",
      ],
      body: [
        "Any disclosure will be limited to what is reasonably necessary for the relevant purpose and, where appropriate, subject to confidentiality obligations.",
      ],
    },
    {
      index: "04",
      title: "Confidentiality",
      lead: "Information shared with OBITER Legal in connection with a client matter is handled in accordance with our professional and confidentiality obligations.",
      body: [
        "This Privacy Policy relates to personal data collected through our website and other interactions with us and does not replace any separate terms of engagement or confidentiality arrangements applicable to a client matter.",
      ],
    },
    {
      index: "05",
      title: "Data Security",
      lead: "We take reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, misuse or loss.",
      body: [
        "However, no method of transmission or storage over the internet can be guaranteed to be completely secure.",
      ],
    },
    {
      index: "06",
      title: "Retention of Information",
      lead: "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, to provide our services, maintain appropriate records, comply with legal and professional obligations, or protect our legitimate interests.",
    },
    {
      index: "07",
      title: "Your Rights",
      lead: "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, or raise a concern regarding its use.",
      body: [
        "Where processing is based on consent, you may also withdraw that consent, subject to any legal or contractual limitations.",
        "Requests may be sent to:",
      ],
      contact: { name: "Requests", email: legalContactEmail },
    },
    {
      index: "08",
      title: "Cookies and Website Usage",
      lead: "Our website may use cookies or similar technologies to improve functionality, understand website usage and enhance your experience.",
      body: [
        "You may adjust your browser settings to limit or disable cookies. Certain website features may not function properly as a result.",
      ],
    },
    {
      index: "09",
      title: "Third Party Websites",
      lead: "Our website may contain links to third party websites. OBITER Legal is not responsible for the privacy practices, content or security of such websites. We recommend reviewing their respective privacy policies before providing any personal information.",
    },
    {
      index: "10",
      title: "Changes to this Policy",
      lead: "We may update this Privacy Policy from time to time to reflect changes in our practices, services or applicable law. The updated version will be published on this page with the revised effective date.",
    },
    {
      index: "11",
      title: "Contact",
      lead: "For any privacy related query, request or concern, please contact:",
      contact: { name: "OBITER Legal", email: legalContactEmail },
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  slug: "terms-and-conditions",
  title: "Terms & Conditions",
  kicker: "Terms & Conditions",
  summary:
    "The terms on which Obiter Legal makes this website available, and what your access to it does and does not create.",
  intro: [
    "This website, www.obiterlegal.in (the “Website”), is operated by Obiter Legal (“Obiter Legal”, “we”, “us” or “our”).",
    "By accessing or using this Website, you acknowledge and agree to the following Terms & Conditions.",
  ],
  sections: [
    {
      index: "01",
      title: "No Solicitation",
      lead: "The Bar Council of India does not permit advertising or solicitation by advocates.",
      body: [
        "The information contained on this Website is provided solely for general informational purposes. Your access to or use of this Website is entirely at your own initiative and does not constitute, or amount to, an invitation, advertisement, solicitation or inducement to engage Obiter Legal.",
      ],
    },
    {
      index: "02",
      title: "No Legal Advice",
      lead: "Nothing contained on this Website constitutes legal, professional or other advice.",
      body: [
        "The content is intended for general informational purposes and may not be applicable to your particular circumstances or jurisdiction. You should obtain specific professional advice before taking any action or relying on any information available on this Website.",
        "Obiter Legal shall not be responsible for any loss or consequence arising from reliance on the information contained on the Website.",
      ],
    },
    {
      index: "03",
      title: "Accuracy of Information",
      lead: "We endeavour to maintain accurate and current information on the Website. However, we do not warrant that the content is complete, accurate, current or free from errors or omissions.",
      body: [
        "Legal and regulatory requirements may change from time to time, and information published on the Website may consequently become outdated.",
      ],
    },
    {
      index: "04",
      title: "No Advocate Client Relationship",
      lead: "Accessing this Website, submitting an enquiry or communicating with Obiter Legal through the Website does not, by itself, create an advocate client relationship.",
      body: [
        "Any professional engagement with Obiter Legal will arise only upon acceptance of the engagement and, where applicable, execution or issuance of separate terms of engagement.",
      ],
    },
    {
      index: "05",
      title: "Intellectual Property",
      lead: "Unless otherwise stated, all content on this Website, including text, graphics, photographs, designs, logos, documents and other materials, is owned by or licensed to Obiter Legal and is protected by applicable intellectual property laws.",
      body: [
        "You may access and use the Website for personal, non commercial and informational purposes only. No part of the Website may be reproduced, modified, distributed, published, transmitted or commercially exploited without our prior written consent.",
        "The name and logo of Obiter Legal may not be used without prior written permission.",
      ],
    },
    {
      index: "06",
      title: "Third Party Websites",
      lead: "The Website may contain links to third party websites for convenience or reference. Obiter Legal does not control or endorse such websites and is not responsible for their content, availability, security or privacy practices.",
      body: [
        "Your use of any third party website is subject to its respective terms and policies.",
      ],
    },
    {
      index: "07",
      title: "Limitation of Liability",
      lead: "To the fullest extent permitted by law, Obiter Legal shall not be liable for any direct, indirect, incidental, consequential or other loss arising from or in connection with your access to or use of the Website, or reliance on any information contained on it.",
      body: [
        "The Website is provided on an “as is” and “as available” basis, without warranties of any kind.",
      ],
    },
    {
      index: "08",
      title: "Changes to the Website and Terms",
      lead: "We may modify, update, suspend or discontinue any part of the Website and may amend these Terms & Conditions from time to time.",
      body: [
        "Any revised Terms & Conditions will become effective upon publication on the Website.",
      ],
    },
    {
      index: "09",
      title: "Privacy",
      lead: "Your use of this Website is also subject to our Privacy Policy, which forms part of these Terms & Conditions.",
    },
    {
      index: "10",
      title: "Governing Law and Jurisdiction",
      lead: "These Terms & Conditions shall be governed by and construed in accordance with the laws of India.",
      body: [
        "The courts at Mumbai, Maharashtra shall have exclusive jurisdiction over any dispute arising out of or relating to these Terms & Conditions or your use of the Website.",
      ],
    },
    {
      index: "11",
      title: "Contact",
      lead: "For any queries regarding these Terms & Conditions, please contact:",
      contact: { name: "Obiter Legal", email: legalContactEmail },
    },
  ],
};

/** Everything under the site's legal footer group. */
export const legalNav = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;
