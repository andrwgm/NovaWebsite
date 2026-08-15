import React from 'react';
import './notAloneGuide.css';

function TitleParts({ parts, className = 'notAloneGuideResourceTitle' }) {
  return (
    <h3 className={className}>
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

function ResourceItem({
  title,
  logo,
  logoAlt,
  description,
  meta,
  href,
  showLogo = true,
  showCopy = true,
  className = '',
}) {
  return (
    <article className={`notAloneGuideResource ${className}`.trim()}>
      {showCopy && title ? <TitleParts parts={title} /> : null}

      {showLogo ? (
        <div className="notAloneGuideLogo">
          <img src={logo} alt={logoAlt} loading="lazy" decoding="async" />
        </div>
      ) : null}

      {showCopy ? (
        <div className="notAloneGuideResourceCopy">
          <p className="notAloneGuideResourceBody">{description}</p>
          <p className="notAloneGuideResourceMeta">{meta}</p>
          {href ? (
            <a
              className="notAloneGuideLink"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {href}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

const AUTISM_TOP = [
  {
    id: 'national-autistic-society',
    title: [
      { text: 'National' },
      { text: 'Autistic Society', italic: true, breakBefore: true },
    ],
    description:
      'One of the UK’s main autism charities, offering trusted guidance, local and online branches, an Autism Services Directory and support for autistic adults, children and their families.',
    meta: 'Autism · Children & adults · UK-wide',
    href: 'https://www.autism.org.uk/advice-and-guidance/help-and-support',
    logo: '/images/national-autistic-society.avif',
    logoAlt: 'National Autistic Society logo',
  },
  {
    id: 'autism-central',
    title: [
      { text: 'Autism' },
      { text: 'Central', italic: true, breakBefore: true },
    ],
    description:
      'A free NHS-funded programme for families and people supporting autistic children or adults. It offers one-to-one peer coaching, online group sessions and practical guidance on everyday life, services and support.',
    meta: 'Autism · All ages · Families & carers · England',
    href: 'https://www.autismcentral.nhs.uk/',
    logo: '/images/autism-central.avif',
    logoAlt: 'Autism Central logo',
  },
  {
    id: 'ambitious-youth-network',
    title: [
      { text: 'Ambitious' },
      { text: 'Youth Network', italic: true, breakBefore: true },
    ],
    description:
      'A supportive online community where autistic young people can connect with others, share experiences and access opportunities around wellbeing, education, employment and everyday life.',
    meta: 'Autism · Ages 16–25 · UK-wide',
    href: 'https://www.ambitiousaboutautism.org.uk',
    logo: '/images/ambitious-youth-network.avif',
    logoAlt: 'Ambitious about Autism logo',
  },
];

const AUTISTICA = {
  id: 'autistica-tips-hub',
  title: [
    { text: 'Autistica ' },
    { text: 'Tips Hub', italic: true },
  ],
  description:
    'A free app created with and for autistic people, bringing together evidence-based information and community tips on everyday life, mental health, wellbeing and post-diagnostic support.',
  meta: 'Autism · Autistic people & families · Nationwide',
  href: 'https://www.autistica.org.uk/get-involved/autistica-tips-hub',
  logo: '/images/autistica-tips-hub.avif',
  logoAlt: 'Autistica Tips Hub logo',
};

const ADHD_RESOURCES = [
  {
    id: 'adhd-uk',
    title: [
      { text: 'ADHD ' },
      { text: 'UK', italic: true },
    ],
    description:
      'Peer support for people affected by ADHD, with online support groups, drop-in sessions and dedicated communities for adults, parents of children with ADHD, parents of adult children and people who are both autistic and ADHD.',
    meta: 'ADHD · Adults & families · Online',
    href: 'https://adhduk.co.uk/support/',
    logo: '/images/adhd-uk.avif',
    logoAlt: 'ADHD UK logo',
  },
  {
    id: 'addiss',
    title: [{ text: 'ADDISS' }],
    description:
      'The National Attention Deficit Disorder Information and Support Service provides ADHD information, training and support, with resources for adults, parents, children and teenagers and a telephone service for people who need advice or further information.',
    meta: 'ADHD · Children & adults · UK',
    href: 'https://www.addiss.co.uk/',
    logo: '/images/addiss.avif',
    logoAlt: 'ADDISS logo',
  },
];

const HERO_COPY = (
  <>
    Living with autism or ADHD can bring questions that continue well beyond an assessment.
    <br />
    These organisations offer specialist information, practical guidance, peer support and communities
    for neurodivergent people and the families who support them.
  </>
);

export default function NotAloneGuide() {
  return (
    <div className="notAloneGuide">
      <div className="notAloneGuideHero">
        <img
          src="/images/chair-macbook-girl.avif"
          alt=""
          loading="eager"
          decoding="async"
          width={1600}
          height={700}
        />
        <p className="notAloneGuideHeroCopy">{HERO_COPY}</p>
      </div>

      <section className="notAloneGuideAutism" aria-label="Autism support">
        <h3 className="notAloneGuideBandTitle notAloneGuideBandTitle--autismMobile">
          Autism
          <br />
          <em>support</em>
        </h3>

        <div className="notAloneGuideGrid notAloneGuideGrid--autismTop">
          {AUTISM_TOP.map((resource) => (
            <ResourceItem key={resource.id} {...resource} />
          ))}
        </div>

        <div className="notAloneGuideGrid notAloneGuideGrid--autismBottom">
          <div className="notAloneGuideAutisticaCluster">
            <div className="notAloneGuideLogo notAloneGuideLogo--autistica">
              <img
                src={AUTISTICA.logo}
                alt={AUTISTICA.logoAlt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <ResourceItem
              className="notAloneGuideResource--autistica"
              title={AUTISTICA.title}
              description={AUTISTICA.description}
              meta={AUTISTICA.meta}
              href={AUTISTICA.href}
              showLogo={false}
            />
          </div>

          <h3 className="notAloneGuideBandTitle notAloneGuideBandTitle--autismDesktop">
            Autism
            <br />
            <em>support</em>
          </h3>
        </div>
      </section>

      <section className="notAloneGuideAdhd" aria-label="ADHD support">
        <div className="notAloneGuideGrid notAloneGuideGrid--adhd">
          <h3 className="notAloneGuideBandTitle notAloneGuideBandTitle--adhd">
            ADHD
            <br />
            <em>support</em>
          </h3>

          {ADHD_RESOURCES.map((resource) => (
            <ResourceItem key={resource.id} {...resource} />
          ))}
        </div>
      </section>

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
