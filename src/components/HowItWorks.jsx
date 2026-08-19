import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';

const CHILD_STEPS_AUTISM = [
  {
    title: 'Online Questionnaires (60 minutes)',
    detail: 'Secure online forms are sent to parents, educational settings, or alternative informants to gather essential background information before the assessment begins.',
    extraInfo: 'Our secure system will send you some different questionnaires to complete about your child\'s history, strengths and challenges. We will also send out a questionnaire to your child\'s educational setting for your child\'s class teacher, SENCo or teaching assistant to complete. Information gathered from questionnaires is reviewed and analysed by our clinical team before your child\'s assessment. \n\nIf your child is not attending school, this is not a problem for us - you can provide (with consent of that person) contact details of someone who have know your child for at leat 6 month in a social context situation and who does not live with your child, it could be a relative, sport coach, home schooled tutor, or a close family friend. \n\nThese forms are essential in providing our clinicians with the information they need to understand your/your child\'s unique situation and help us reach an accurate diagnostic outcome. We understand that this process might feel a bit daunting, so we\'ve created a user friendly platform to help you with this first step of the assessment. Below, you\'ll find everything you need to know to access, complete, and submit your forms through your Nova Clinics client dashboard.',
  },
  {
    title: 'Parent/Carer Interview (90 minutes)',
    detail: 'A detailed, ADI-R-informed questionnaire explores the child\'s early developmental milestones and current presentation, capturing vital insights from parents or carers.',
    extraInfo: 'As the parent/guardian/carer of a child or young person, your insights are a key part of the assessment process. We use a detailed questionnaire to explore your child\'s early development and milestones and to follow their progress through to their current presentation. We use an ADIR (Autism Diagnostic Interview-Revised) informed questionnaire. The ADI-R is considered a ‘gold standard’ tool when exploring an Autism diagnosis.',
  },
  {
    title: 'Child/Young Person Observation (60 minutes)',
    detail: 'Clinicians conduct an ADOS-2 observational assessment to evaluate the individual\'s communication skills, social interaction, and imaginative play.',
    extraInfo: 'We will complete an observation assessment with the child/young person/adult. We use an ADOS-2 (the Autism Diagnostic Observation Schedule – Second Edition) informed format, which includes activities that can help a specialised trained clinician to understand an individual\'s communication skills, social interaction style and play or imaginative use of materials, depending upon the individual\'s developmental age. The ADOS-2 is a ‘gold standard’ observational tool when assessing for possible Autism.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'A multi-disciplinary team reviews all gathered evidence against DSM-5 criteria to determine if the minimum threshold for an autism diagnosis is met',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in the child\'s assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for autism spectrum disorder to determine if there is sufficient evidence from the assessment to meet the minimum criteria for autism or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and Feedback Session (60 minutes)',
    detail: 'Parents receive a detailed assessment report one week prior to an online appointment where clinicians discuss the agreed diagnostic outcome.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome for the child based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with the named contact in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'A follow-up session, offered up to four weeks later, provides a safe space for parents to understand the outcome and learn how to best advocate for their child.',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your child\' assessment - no need to tell us again your concerns/story/problems/… Our post assessment support sessions are a safe space for parents to learn about autism and what it means for their child. If your child has not received a diagnosis of autism this is the perfect time and space to understand their needs and advocacy for their support.',
  },
];

const CHILD_STEPS_ADHD = [
  {
    title: 'Online questionnaires (60 minutes)',
    detail: 'The clinical team gathers crucial background information by sending secure forms to parents and the child\'s educational setting or an alternative informant.',
    extraInfo: 'Our secure system will send you some different questionnaires to complete about your child\'s history, strengths and challenges. We will also send out a questionnaire to your child\'s educational setting for your child\'s class teacher, SENCo or teaching assistant to complete. Information gathered from questionnaires is reviewed and analysed by our clinical team before your child\'s assessment. If your child is not attending school, this is not a problem for us - you can provide (with consent of that person) contact details of someone who have know your child for at leat 6 month in a social context situation and who does not live with your child, it could be a relative, sport coach, home schooled tutor, or a close family friend. These forms are essential in providing our clinicians with the information they need to understand your/your child\'s unique situation and help us reach an accurate diagnostic outcome. We understand that this process might feel a bit daunting, so we\'ve created a user friendly platform to help you with this first step of the assessment. Below, you\'ll find everything you need to know to access, complete, and submit your forms through your Nova Clinics client dashboard.',
  },
  {
    title: 'Parent/carer interview (90 minutes)',
    detail: 'An experienced clinician explores the child\'s developmental milestones and current presentation using a DIVA/ACE plus questionnaire with the parents.',
    extraInfo: 'As the parent/guardian/carer of a child or young person, your insights are a key part of the assessment process. We use a detailed questionnaire to explore your child\'s early development and milestones and to follow their progress through to their current presentation. We use a DIVA/ ACE plus and developmental history with an experienced trained clinician.',
  },
  {
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'This step involves a clinical meeting with the child and a DIVA/ACE questionnaire to evaluate the daily impact of ADHD traits.',
    extraInfo: 'Our clinical team will meet with your child to gather his/her strengths and needs. We will also use a DIVA/ACE questionnaire to gather more information about ADHD traits and the impact that those are having in your child day - to - day.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'All involved clinicians meet to review the collected evidence against DSM-5 criteria to establish if the child has ADHD.',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in the child\'s assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for ADHD to determine if there is sufficient evidence from the assessment to meet the minimum criteria for ADHD or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'A comprehensive assessment report is provided a week before an online appointment, where the agreed multi-disciplinary outcome is discussed.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome for the child based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with the named contact in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'A supportive space for parents to understand their child\'s needs and learn about ADHD advocacy, available up to four weeks after the feedback.',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your child\' assessment - no need to tell us again your concerns/story/problems/… Our post assessment support sessions are a safe space for parents to learn about ADHD and what it means for their child. If your child has not received a diagnosis of ADHD this is the perfect time and space to understand their needs and advocacy for their support.',
  },
];

const CHILD_STEPS_COMBINED = [
  {
    title: 'Online questionnaires (60 minutes)',
    detail: 'Questionnaires are sent via a secure platform to parents and educational settings to provide clinicians with essential background information.',
    extraInfo: 'Our secure system will send you some different questionnaires to complete about your child\'s history, strengths and challenges. We will also send out a questionnaire to your child\'s educational setting for your child\'s class teacher, SENCo or teaching assistant to complete. Information gathered from questionnaires is reviewed and analysed by our clinical team before your child\'s assessment. If your child is not attending school, this is not a problem for us - you can provide (with consent of that person) contact details of someone who have know your child for at leat 6 month in a social context situation and who does not live with your child, it could be a relative, sport coach, home schooled tutor, or a close family friend. These forms are essential in providing our clinicians with the information they need to understand your child\'s unique situation and help us reach an accurate diagnostic outcome. We understand that this process might feel a bit daunting, so we\'ve created a user friendly platform to help you with this first step of the assessment. Below, you\'ll find everything you need to know to access, complete, and submit your forms through your Nova Clinics client dashboard.',
  },
  {
    title: 'Parent/carer interview (90 minutes)',
    detail: 'Clinicians conduct a comprehensive interview using the ADI-R to explore autism and the DIVA/ACE plus to evaluate ADHD traits.',
    extraInfo: 'As the parent/guardian/carer of a child or young person, your insights are a key part of the assessment process. We use a detailed questionnaire to explore your child\'s early development and milestones and to follow their progress through to their current presentation. We use an ADIR (Autism Diagnostic Interview-Revised) informed questionnaire. The ADI-R is considered a ‘gold standard’ tool when exploring an Autism diagnosis. We will also use the use a DIVA/ACE plus and developmental history with an experienced trained clinician to explore ADHD traits.',
  },
  {
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'An extensive observation combining the ADOS-2 for autism with clinical meetings to assess daily challenges and ADHD traits.',
    extraInfo: 'We will complete an observation assessment with the child/young person/adult. We use an ADOS-2 (the Autism Diagnostic Observation Schedule – Second Edition) informed format, which includes activities that can help a specialised trained clinician to understand an individual\'s communication skills, social interaction style and play or imaginative use of materials, depending upon the individual\'s developmental age. The ADOS-2 is a ‘gold standard’ observational tool when assessing for possible Autism. Our clinical team will also meet with your child to gather his/her strengths and needs. We will also use a DIVA/ACE questionnaire to gather more information about ADHD traits and the impact that those are having in your child day - to - day.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'The multi-disciplinary team collaboratively reviews the assessment evidence against DSM-5 criteria for both autism and ADHD.',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in the child\'s assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for autism spectrum disorder and ADHD to determine if there is sufficient evidence from the assessment to meet the minimum criteria for autism and/or ADHD or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'Parents are given a comprehensive report to digest before an online appointment to discuss the multi-disciplinary team\'s conclusions.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome for the child based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with the named contact in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'A dedicated support session helps parents understand the combined outcomes and enables them to advocate for their child\'s specific needs',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your child\' assessment - no need to tell us again your concerns/story/problems/… Our post assessment support sessions are a safe space for parents to learn about autism, ADHD and what it means for their child. If your child has not received a diagnosis this is the perfect time and space to understand their needs and advocacy for their support.',
  },
];

const ADULT_STEPS_AUTISM = [
  {
    title: 'Online questionnaires (60 minutes)',
    detail: 'Questionnaires are sent to the patient, a close informant, and someone from their social or professional circle to gather broad background information.',
    extraInfo: 'We will send out a pack of questionnaires by email for you and your informant to complete and return to your clinicians. We will ask you to download and complete some forms to provide our clinicians with some background information. These forms need to be completed by you and someone who knows you well, known as an informant. A separate questionnaire from someone from your social or professional circule (like a colleague or activity instructor, different from the previous informant), to provide broader insight into your social interactions style.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'A trained clinician uses high-standard tools, including the ADI-R and ADOS-2, to explore current presentation and observe communication skills.',
    extraInfo: 'We use a detailed questionnaire to explore your current presentation. We use an ADIR (Autism Diagnostic Interview-Revised) informed questionnaire. The ADI-R is considered a ‘gold standard’ tool when exploring an Autism diagnosis, and our interview is Aldo based on the DMS-5 criteria for Autism. In this step, we will also complete an observation assessment with you. We use the ADOS-2 (the Autism Diagnostic Observation Schedule – Second Edition) which includes activities that can help a trained clinician to evaluate your communication skills, social interaction style and imaginative use of materials. The ADOS-2 is a ‘gold standard’ observational tool when assessing for possible Autism.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'An informant who knows the individual well attends a separate appointment to share the patient\'s neurodevelopmental history using DSM-5 criteria.',
    extraInfo: 'Getting information from someone who knows you well, getting their insights are a key part of the assessment process. We will invite your informant to attend a separate appointment to share your neurodevelopmental history and how you present day to day. You are welcome to attend this appointment too. We will use an interview based on the DMS-5 criteria for Autism.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'Clinicians meet to collectively evaluate all collected information against DSM-5 guidelines to determine an autism diagnosis.',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in your assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for autism spectrum disorder to determine if there is sufficient evidence from the assessment to meet the minimum criteria for autism or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'An online meeting is scheduled to discuss the outcome, with a comprehensive, detailed report sent a week beforehand.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with you in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'An ongoing support session gives adults a safe space to process their results and understand their needs and self-advocacy.',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your assessment - no need to tell us again your concerns/ story/problems/… Our post assessment support sessions are a safe space to learn about autism and what it means for you. If your have not received a diagnosis of autism this is the perfect time and space to understand better your needs and advocacy for yourself.',
  },
];

const ADULT_STEPS_ADHD = [
  {
    title: 'Online questionnaires (60 minutes)',
    detail: 'Background questionnaires are completed by the individual, a close informant, and a social or professional contact to offer broad clinical insights.',
    extraInfo: 'We will send out a pack of questionnaires by email for you and your informant to complete and return to your clinicians. We will ask you to download and complete some forms to provide our clinicians with some background information. These forms need to be completed by you and someone who knows you well, known as an informant. A separate questionnaire from someone from your social or professional circule (like a colleague or activity instructor, different from the previous informant), to provide broader insight into your social interactions style.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'Assessment includes a clinical meeting to identify strengths and needs, and a DIVA/ACE questionnaire to evaluate ADHD traits.',
    extraInfo: 'Our clinical team will meet with you to gather a better understanding of your strengths and needs. We will also use a DIVA/ACE questionnaire to gather more information about ADHD traits and the impact that those are having in your day - to - day.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'A close informant participates in a separate appointment using a DIVA/ACE questionnaire to discuss the patient\'s developmental history and daily presentation.',
    extraInfo: 'Getting information from someone who knows you well, getting their insights are a key part of the assessment process. We will invite your informant to attend a separate appointment to share your neurodevelopmental history and how you present day to day. You are welcome to attend this appointment too. We will also use a DIVA/ACE questionnaire to gather more information about ADHD traits.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'The multi-disciplinary team reviews the assessment evidence collectively using the DSM-5 criteria for ADHD.',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in your assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for ADHD to determine if there is sufficient evidence from the assessment to meet the minimum criteria for ADHD or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'Individuals receive an extensive report to read prior to an online feedback session where clinicians discuss the agreed outcome.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with you in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'A post-assessment session provides adults with the opportunity to understand what an ADHD diagnosis means for them and learn self-advocacy strategies.',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your assessment - no need to tell us again your concerns/ story/problems/… Our post assessment support sessions are a safe space to learn about ADHD and what it means for you. If your have not received a diagnosis of ADHD this is the perfect time and space to understand better your needs and advocacy for yourself.',
  },
];

const ADULT_STEPS_COMBINED = [
  {
    title: 'Online questionnaires (60 minutes)',
    detail: 'Assessment forms are collected from the patient, a primary informant, and an additional social/professional contact for comprehensive context.',
    extraInfo: 'We will send out a pack of questionnaires by email for you and your informant to complete and return to your clinicians. We will ask you to download and complete some forms to provide our clinicians with some background information. These forms need to be completed by you and someone who knows you well, known as an informant. A separate questionnaire from someone from your social or professional circule (like a colleague or activity instructor, different from the previous informant), to provide broader insight into your social interactions style.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'An extensive evaluation combining the ADI-R, ADOS-2, and DIVA/ACE tools to explore both autism and ADHD traits thoroughly.',
    extraInfo: 'We use a detailed questionnaire to explore your current presentation. We use an ADIR (Autism Diagnostic Interview-Revised) informed questionnaire. The ADI-R is considered a ‘gold standard’ tool when exploring an Autism diagnosis, and our interview is Aldo based on the DMS-5 criteria for Autism. In this step, we will also complete an observation assessment with you. We use the ADOS-2 (the Autism Diagnostic Observation Schedule – Second Edition) which includes activities that can help a trained clinician to evaluate your communication skills, social interaction style and imaginative use of materials. The ADOS-2 is a ‘gold standard’ observational tool when assessing for possible Autism. Our clinical team will also meet with you to gather a better understanding of your strengths and needs. We will also use a DIVA/ACE questionnaire to gather more information about ADHD traits and the impact that those are having in your day - to - day.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'A dedicated interview where a close informant provides the patient\'s developmental history, evaluating both autism and ADHD characteristics.',
    extraInfo: 'Getting information from someone who knows you well, getting their insights are a key part of the assessment process. We will invite your informant to attend a separate appointment to share your neurodevelopmental history and how you present day to day. You are welcome to attend this appointment too. We will use an interview based on the DMS-5 criteria for Autism. We will also use a DIVA/ACE questionnaire to gather information about ADHD traits.',
  },
  {
    title: 'Multi-disciplinary Team Review',
    detail: 'The clinical team conducts a multi-disciplinary review of all collected data using DSM-5 criteria to determine the presence of autism and/or ADHD.',
    extraInfo: 'A multi-disciplinary team meeting is when all the clinicians who are involved in your assessment review and discuss all the information from the assessment. The MDT will use the DSM-5 criteria for autism and ADHD to determine if there is sufficient evidence from the assessment to meet the minimum criteria for autism and/or ADHD or not. Sometimes, at this point, clinicians may request further information from the family, to help them reach an outcome.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'An online appointment is arranged to thoroughly discuss the combined outcomes, with a comprehensive report sent for review beforehand.',
    extraInfo: 'After the MDT meeting, the clinicians will have agreed an appropriate outcome based on all the information and evidence from all components of the assessment. We will arrange an online appointment (2 weeks after our multi-disciplinary team have reached a conclusion) with you in order to discuss the outcome of the assessment. One week before this appointment, you will receive a comprehensive, detailed assessment report. This will allow you time to ‘digest’ all the information and think about any questions you might have about the assessment.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'A safe space is provided following the feedback to support adults in understanding their neurodivergent traits and advancing their self-advocacy.',
    extraInfo: 'We believe that support should continue once you receive your report. You can choose when to have this session (up to 4 weeks after the feedback session). This session will be conducted by one of the professionals involved in your assessment - no need to tell us again your concerns/ story/problems/… Our post assessment support sessions are a safe space to learn about autism and ADHD and what it means for you. If your have not received a diagnosis of autism or/and ADHD this is the perfect time and space to understand better your needs and advocacy for yourself.',
  },
];

const FLOWS = {
  autism: {
    child: CHILD_STEPS_AUTISM,
    adult: ADULT_STEPS_AUTISM,
  },
  adhd: {
    child: CHILD_STEPS_ADHD,
    adult: ADULT_STEPS_ADHD,
  },
  combined: {
    child: CHILD_STEPS_COMBINED,
    adult: ADULT_STEPS_COMBINED,
  },
};

export default function HowItWorks() {
  const [assessment, setAssessment] = useState('autism');
  const [audience, setAudience] = useState('child');
  const items = useMemo(() => {
    const list = FLOWS[assessment]?.[audience] ?? [];
    return list.map((it, idx) => ({
      ...it,
      n: idx + 1,
      idx,
      extraInfo: it.extraInfo ?? it.detail,
    }));
  }, [assessment, audience]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeInfoIndex, setActiveInfoIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(0);
    setActiveInfoIndex(null);
  }, [audience, assessment]);

  useEffect(() => {
    if (activeInfoIndex === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.hiw-info-wrap')) {
        setActiveInfoIndex(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveInfoIndex(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeInfoIndex]);

  return (
    <div className="howItWorks">
      <div className="howItWorksHeader">
        <h2 className="howItWorksTitle">How it <span style={{display: 'block', fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>works?</span></h2>
      </div>
      <div className="howItWorksContent">
        <div className="howItWorksTimeline">
          <div className="hiw-toggles" aria-label="Select timeline filters">
            <div className="hiw-toggle" role="group" aria-label="Select assessment type">
              <button
                type="button"
                className={`hiw-toggle-btn${assessment === 'autism' ? ' active' : ''}`}
                onClick={() => setAssessment('autism')}
              >
                Autism
              </button>
              <button
                type="button"
                className={`hiw-toggle-btn${assessment === 'adhd' ? ' active' : ''}`}
                onClick={() => setAssessment('adhd')}
              >
                ADHD
              </button>
              <button
                type="button"
                className={`hiw-toggle-btn${assessment === 'combined' ? ' active' : ''}`}
                onClick={() => setAssessment('combined')}
              >
                Combined
              </button>
            </div>
            <div className="hiw-toggle" role="group" aria-label="Select audience">
              <button
                type="button"
                className={`hiw-toggle-btn${audience === 'child' ? ' active' : ''}`}
                onClick={() => setAudience('child')}
              >
                Child
              </button>
              <button
                type="button"
                className={`hiw-toggle-btn${audience === 'adult' ? ' active' : ''}`}
                onClick={() => setAudience('adult')}
              >
                Adult
              </button>
            </div>
          </div>
          <Timeline
            value={items}
            layout="vertical"
            align="left"
            marker={(item) => (
              <span className={`hiw-marker${item.idx === activeIndex ? ' active' : ''}`}>
                {item.n}
              </span>
            )}
            content={(item) => {
              const expanded = item.idx === activeIndex;
              const detailId = `hiw-detail-${item.idx}`;
              const infoId = `hiw-extra-info-${item.idx}`;
              const infoExpanded = item.idx === activeInfoIndex;
              return (
                <div className="hiw-pill-wrap">
                  <div
                    role="button"
                    tabIndex={0}
                    className={`hiw-pill${expanded ? ' expanded' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={item.detail ? detailId : undefined}
                    onMouseEnter={() => {
                      setActiveIndex(item.idx);
                    }}
                    onFocus={() => {
                      setActiveIndex(item.idx);
                    }}
                    onClick={() => {
                      setActiveIndex(item.idx);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveIndex(item.idx);
                      }
                    }}
                  >
                    <div className="hiw-pill-head">
                      <div className="hiw-pill-title">{item.title}</div>
                      {item.extraInfo && (
                        <div
                          className="hiw-info-wrap"
                          onMouseEnter={() => {
                            setActiveInfoIndex(item.idx);
                          }}
                          onMouseLeave={() => {
                            setActiveInfoIndex((current) => (current === item.idx ? null : current));
                          }}
                        >
                          <button
                            type="button"
                            className="hiw-info-btn"
                            aria-label={`More information about step ${item.n}`}
                            aria-expanded={infoExpanded}
                            aria-controls={infoId}
                            onPointerDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveInfoIndex((current) => (current === item.idx ? null : item.idx));
                            }}
                            onFocus={() => {
                              setActiveInfoIndex(item.idx);
                            }}
                            onBlur={(event) => {
                              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                                setActiveInfoIndex((current) => (current === item.idx ? null : current));
                              }
                            }}
                          >
                            <i className="pi pi-info-circle" aria-hidden="true" />
                          </button>
                          <div
                            id={infoId}
                            role="tooltip"
                            className={`hiw-info-tooltip${infoExpanded ? ' visible' : ''}`}
                          >
                            {item.extraInfo}
                          </div>
                        </div>
                      )}
                    </div>
                    {item.detail && (
                      <div id={detailId} className="hiw-pill-detail">{item.detail}</div>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
        <div className="howItWorksImage">
          {audience === 'child' ? (
            <Image src="/images/necklace-kid.avif" alt="how it works" />
          ) : (
            <Image src="/images/grass-girls.avif" alt="how it works" />
          )}
        </div>
      </div>
    </div>
  );
}
