import React from 'react';
import './supportGuideContent.css';
import './notAloneGuide.css';

function TitleParts({ parts }) {
  return (
    <h3 className="notAloneGuideResourceTitle">
      {parts.map((part, index) =>
        part.breakBefore ? (
          <React.Fragment key={index}>
            <br />
            {part.italic ? <em>{part.text}</em> : part.text}
          </React.Fragment>
        ) : part.italic ? (
          <em key={index}>{part.text}</em>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        )
      )}
    </h3>
  );
}

function ResourceLink({ href, children }) {
  return (
    <a
      className="notAloneGuideLink"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

const RESOURCES = [
  {
    id: 'national-autistic-society',
    layout: 'text-image',
    title: [
      { text: 'National' },
      { text: 'Autistic Society', italic: true, breakBefore: true },
    ],
    description:
      'One of the UK’s main autism charities, offering trusted guidance, local and online branches, an Autism Services Directory and support for autistic adults, children and their families.',
    meta: 'Autism · Children & adults · UK-wide',
    metaItalic: false,
    url: 'https://www.autism.org.uk/advice-and-guidance/help-and-support',
    logo: '/images/national-autistic-society.avif',
    logoAlt: 'National Autistic Society logo',
  },
  {
    id: 'autism-central',
    layout: 'image-text',
    title: [
      { text: 'Autism ' },
      { text: 'Central', italic: true },
    ],
    description:
      'A free NHS-funded programme for families and people supporting autistic children or adults. It offers one-to-one peer coaching, online group sessions and practical guidance on everyday life, services and support.',
    meta: 'Autism · All ages · Families & carers · England',
    metaItalic: true,
    url: 'https://www.autismcentral.nhs.uk/',
    logo: '/images/autism-central.avif',
    logoAlt: 'Autism Central logo',
  },
  {
    id: 'ambitious-youth-network',
    layout: 'text-image',
    title: [
      { text: 'Ambitious ' },
      { text: 'Youth Network', italic: true },
    ],
    description:
      'A supportive online community where autistic young people can connect with others, share experiences and access opportunities around wellbeing, education, employment and everyday life.',
    meta: 'Autism · Ages 16–25 · UK-wide',
    metaItalic: true,
    url: 'https://www.ambitiousaboutautism.org.uk',
    logo: '/images/ambitious-youth-network.avif',
    logoAlt: 'Ambitious about Autism logo',
  },
  {
    id: 'autistica-tips-hub',
    layout: 'image-text',
    title: [
      { text: 'Autistica ' },
      { text: 'Tips Hub', italic: true },
    ],
    description:
      'A free app created with and for autistic people, bringing together evidence-based information and community tips on everyday life, mental health, wellbeing and post-diagnostic support.',
    meta: 'Autism · Autistic people & families · Nationwide',
    metaItalic: true,
    url: 'https://www.autistica.org.uk/get-involved/autistica-tips-hub',
    logo: '/images/autistica-tips-hub.avif',
    logoAlt: 'Autistica Tips Hub logo',
  },
];

const ADHD_RESOURCES = [
  {
    id: 'adhd-uk',
    layout: 'text-image',
    title: [
      { text: 'ADHD ' },
      { text: 'UK', italic: true },
    ],
    description:
      'Peer support for people affected by ADHD, with online support groups, drop-in sessions and dedicated communities for adults, parents of children with ADHD, parents of adult children and people who are both autistic and ADHD.',
    meta: 'ADHD · Adults & families · Online',
    metaItalic: false,
    url: 'https://adhduk.co.uk/support/',
    logo: '/images/adhd-uk.avif',
    logoAlt: 'ADHD UK logo',
  },
  {
    id: 'addiss',
    layout: 'image-text',
    title: [{ text: 'ADDISS' }],
    description:
      'The National Attention Deficit Disorder Information and Support Service provides ADHD information, training and support, with resources for adults, parents, children and teenagers and a telephone service for people who need advice or further information.',
    meta: 'ADHD · Children & adults · UK',
    metaItalic: true,
    url: 'https://www.addiss.co.uk/',
    logo: '/images/addiss.avif',
    logoAlt: 'ADDISS logo',
  },
];

function ResourceRow({ resource }) {
  const text = (
    <div className="notAloneGuideResourceText">
      <TitleParts parts={resource.title} />
      <p className="notAloneGuideResourceBody">{resource.description}</p>
      <p
        className={`notAloneGuideResourceMeta${
          resource.metaItalic ? ' notAloneGuideResourceMeta--italic' : ''
        }`}
      >
        {resource.meta}
      </p>
      <ResourceLink href={resource.url}>{resource.url}</ResourceLink>
    </div>
  );

  const media = (
    <div className="notAloneGuideResourceMedia">
      <div className="notAloneGuideLogo">
        <img src={resource.logo} alt={resource.logoAlt} loading="lazy" decoding="async" />
      </div>
    </div>
  );

  return (
    <article
      className={`notAloneGuideResource notAloneGuideResource--${resource.layout}`}
    >
      {media}
      {text}
    </article>
  );
}

export default function NotAloneGuide() {
  return (
    <div className="supportGuideContent notAloneGuide">
      <div className="notAloneGuideInner">
        <p className="supportGuideContentIntro notAloneGuideIntro">
          Living with autism or ADHD can bring questions that continue well beyond an assessment.
          These organisations offer specialist information, practical guidance, peer support and
          communities for neurodivergent people and the families who support them.
        </p>

        <h3 className="notAloneGuideSectionHeading">
          Autism
          <br />
          <em>support</em>
        </h3>

        <div className="notAloneGuideResources">
          {RESOURCES.map((resource) => (
            <ResourceRow key={resource.id} resource={resource} />
          ))}
        </div>

        <h3 className="notAloneGuideSectionHeading notAloneGuideSectionHeading--adhd">
          ADHD
          <br />
          <em>support</em>
        </h3>

        <div className="notAloneGuideResources">
          {ADHD_RESOURCES.map((resource) => (
            <ResourceRow key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      <div className="notAloneGuideClosing">
        <h3 className="notAloneGuideClosingTitle">
          Not sure where
          <br />
          <em>to start?</em>
        </h3>
        <p className="notAloneGuideClosingBody">
          You don’t need to find the perfect service straight away. Start with the kind of support
          you need now, someone who understands, practical guidance, help for your child, or a
          community with shared experience, and explore from there.
        </p>
        <p className="notAloneGuideClosingBody">
          These organisations are independent from Nova Clinics. Services, eligibility and
          availability may change, so we recommend checking each provider directly for the most
          up-to-date information.
        </p>
        <div className="notAloneGuidePhoto">
          <img
            src="/images/girl-from-the-back.avif"
            alt=""
            loading="lazy"
            decoding="async"
            width={960}
            height={380}
          />
        </div>
      </div>
    </div>
  );
}
