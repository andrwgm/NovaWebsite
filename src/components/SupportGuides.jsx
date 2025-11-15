import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './supportGuides.css';

export default function SupportGuides() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="support-guides">
      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="support-guides__accordion"
      >
        <AccordionTab
          header="Before the assessment"
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
          header="After the assessment"
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
          header="Supporting your child at home"
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
          header="You're not alone"
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
