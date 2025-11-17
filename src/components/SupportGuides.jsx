import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './supportGuides.css';

export default function SupportGuides() {
  const tabSlugs = useMemo(
    () => ['before-the-assessment', 'after-the-assessment', 'supporting-your-child-at-home', 'youre-not-alone'],
    []
  );
  const slugToIndex = useMemo(() => {
    const map = {};
    tabSlugs.forEach((slug, idx) => {
      map[slug] = idx;
    });
    return map;
  }, [tabSlugs]);

  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    if (!hash) {
      setActiveIndex(null);
      return;
    }
    const idx = slugToIndex[hash];
    if (typeof idx === 'number') {
      setActiveIndex(idx);
    }
  }, [location.hash, slugToIndex]);

  const handleTabChange = (event) => {
    const nextIndex = event.index;
    setActiveIndex(nextIndex);

    if (typeof nextIndex === 'number') {
      const nextHash = tabSlugs[nextIndex];
      if (nextHash) {
        navigate({ pathname: location.pathname, hash: nextHash }, { replace: true });
      }
    } else {
      navigate({ pathname: location.pathname, hash: '' }, { replace: true });
    }
  };

  return (
    <section className="support-guides">
      <Accordion
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        className="support-guides__accordion"
      >
        <AccordionTab
          id="before-the-assessment"
          header={
            <h2 >
              Before the assessment
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#FF787C', '--support-guide-z': 4 }}
        >
          <div className="support-guides__panel">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed elit ac arcu feugiat pulvinar. Vivamus
              ac dapibus mauris, vitae lacinia elit. Integer iaculis tellus non ipsum scelerisque commodo.
            </p>
          </div>
        </AccordionTab>

        <AccordionTab
          id="after-the-assessment"
          header={
            <h2>
              After the assessment
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#FFA6A8', '--support-guide-z': 3 }}
        >
          <div className="support-guides__panel">
            <p>
              Nullam vehicula arcu eu tincidunt maximus. Cras vitae justo vehicula, aliquet nisl eget, mattis nibh.
              Donec gravida, lorem ac iaculis porta, est enim volutpat erat, eget consectetur nisl orci sed erat.
            </p>
          </div>
        </AccordionTab>

        <AccordionTab
          id="supporting-your-child-at-home"
          header={
            <h2>
              Supporting your child at home
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#D45286', '--support-guide-z': 2 }}
        >
          <div className="support-guides__panel">
            <p>
              Cras tincidunt a metus at porta. Suspendisse eget ornare risus. Ut blandit mattis nisl non aliquet.
              Maecenas eleifend, risus ut ornare sollicitudin, urna risus aliquet ligula, ut lacinia nisl massa non
              arcu.
            </p>
          </div>
        </AccordionTab>

        <AccordionTab
          id="youre-not-alone"
          header={
            <h2>
              You're not alone
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#961D4E', '--support-guide-z': 1 }}
        >
          <div className="support-guides__panel">
            <p>
              Integer vel ligula aliquam, fermentum est sed, hendrerit justo. Proin sit amet dui sapien. Sed non
              pharetra turpis. Aenean at accumsan orci, non volutpat nibh. Sed sed sapien nec quam hendrerit tincidunt.
            </p>
          </div>
        </AccordionTab>
      </Accordion>
    </section>
  );
}
