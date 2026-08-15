// Data models for AQ-10 (adult/adolescent/child) and SNAP-IV 26-item questionnaires.
// Wording and scoring are kept literal to the provided documentation.

export type ResponseOption = {
  id: string;
  label: string;
  score: number | null;
};

export type ItemScoring = {
  scoreIfResponseIds: string[];
};

export type QuestionnaireItem = {
  id: string;
  text: string;
  subscale?: string;
  scoring?: ItemScoring;
};

export type ScoreRange = {
  min: number;
  max: number;
  label: string;
};

export type SnapScale = {
  id: string;
  name: string;
  itemIds: string[];
  ranges: ScoreRange[];
};

export type QuestionnaireScoring =
  | {
      pointPerItem: number;
      maxScore: number;
      referralThreshold: number;
      rulesText: string[];
    }
  | {
      scales: SnapScale[];
      rulesText: string[];
    };

export type Questionnaire = {
  id: string;
  title: string;
  instrument: string;
  version: string;
  description: string;
  respondent: string;
  ageRange: string;
  instructions: string[];
  responseOptions: ResponseOption[];
  items: QuestionnaireItem[];
  scoring: QuestionnaireScoring;
};

const AQ10_RESPONSE_OPTIONS: ResponseOption[] = [
  { id: "definitely_agree", label: "Definitely Agree", score: null },
  { id: "slightly_agree", label: "Slightly Agree", score: null },
  { id: "slightly_disagree", label: "Slightly Disagree", score: null },
  { id: "definitely_disagree", label: "Definitely Disagree", score: null },
];

const SNAP_RESPONSE_OPTIONS: ResponseOption[] = [
  { id: "not_at_all", label: "Not at all", score: 0 },
  { id: "just_a_little", label: "Just a little", score: 1 },
  { id: "quite_a_bit", label: "Quite a bit", score: 2 },
  { id: "very_much", label: "Very much", score: 3 },
];

export const QUESTIONNAIRES: Questionnaire[] = [
  {
    id: "aq10_adult",
    title: "AQ-10",
    instrument: "Autism Spectrum Quotient (AQ)",
    version: "Adult",
    description:
      "A quick referral guide for adults with suspected autism who do not have a learning disability.",
    respondent: "Self",
    ageRange: "Adult",
    instructions: ["Please tick one option per question only."],
    responseOptions: AQ10_RESPONSE_OPTIONS,
    items: [
      {
        id: "1",
        text: "I often notice small sounds when others do not",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "2",
        text: "I usually concentrate more on the whole picture, rather than the small details",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "3",
        text: "I find it easy to do more than one thing at once",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "4",
        text: "If there is an interruption, I can switch back to what I was doing very quickly",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "5",
        text: "I find it easy to ‘read between the lines’ when someone is talking to me",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "6",
        text: "I know how to tell if someone listening to me is getting bored",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "7",
        text: "When I’m reading a story I find it difficult to work out the characters’ intentions",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "8",
        text: "I like to collect information about categories of things",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "9",
        text: "I find it easy to work out what someone is thinking or feeling just by looking at their face",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "10",
        text: "I find it difficult to work out people’s intentions",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
    ],
    scoring: {
      pointPerItem: 1,
      maxScore: 10,
      referralThreshold: 6,
      rulesText: [
        "Only 1 point can be scored for each question.",
        "Score 1 point for Definitely or Slightly Agree on items 1, 7, 8 and 10.",
        "Score 1 point for Definitely or Slightly Disagree on items 2, 3, 4, 5, 6 and 9.",
        "If the individual scores 6 or above, consider referring them for a specialist diagnostic assessment.",
      ],
    },
  },
  {
    id: "aq10_adolescent",
    title: "AQ-10 (Adolescent Version)",
    instrument: "Autism Spectrum Quotient (AQ)",
    version: "Adolescent",
    description:
      "A quick referral guide for parents to complete about a teenager aged 12–15 years old with suspected autism who does not have a learning disability.",
    respondent: "Parent",
    ageRange: "12–15 years",
    instructions: ["Please tick one option per question only."],
    responseOptions: AQ10_RESPONSE_OPTIONS,
    items: [
      {
        id: "1",
        text: "S/he notices patterns in things all the time",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "2",
        text: "S/he usually concentrates more on the whole picture, rather than the small details",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "3",
        text: "In a social group, s/he can easily keep track of several different people’s conversations",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "4",
        text: "If there is an interruption, s/he can switch back to what s/he was doing very quickly",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "5",
        text: "S/he frequently finds that s/he doesn’t know how to keep a conversation going",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "6",
        text: "S/he is good at social chit-chat",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "7",
        text: "When s/he was younger, s/he used to enjoy playing games involving pretending with other children",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "8",
        text: "S/he finds it difficult to imagine what it would be like to be someone else",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "9",
        text: "S/he finds social situations easy",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "10",
        text: "S/he finds it hard to make new friends",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
    ],
    scoring: {
      pointPerItem: 1,
      maxScore: 10,
      referralThreshold: 6,
      rulesText: [
        "Only 1 point can be scored for each question.",
        "Score 1 point for Definitely or Slightly Agree on items 1, 5, 8 and 10.",
        "Score 1 point for Definitely or Slightly Disagree on items 2, 3, 4, 6, 7 and 9.",
        "If the individual scores 6 or above, consider referring them for a specialist diagnostic assessment.",
      ],
    },
  },
  {
    id: "aq10_child",
    title: "AQ-10 (Child Version)",
    instrument: "Autism Spectrum Quotient (AQ)",
    version: "Child",
    description:
      "A quick referral guide for parents to complete about a child aged 4–11 years with suspected autism who does not have a learning disability.",
    respondent: "Parent",
    ageRange: "4–11 years",
    instructions: ["Please tick one option per question only."],
    responseOptions: AQ10_RESPONSE_OPTIONS,
    items: [
      {
        id: "1",
        text: "S/he often notices small sounds when others do not",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "2",
        text: "S/he usually concentrates more on the whole picture, rather than the small details",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "3",
        text: "In a social group, s/he can easily keep track of several different people’s conversations",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "4",
        text: "S/he finds it easy to go back and forth between different activities",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "5",
        text: "S/he doesn’t know how to keep a conversation going with his/her peers",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "6",
        text: "S/he is good at social chit-chat",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "7",
        text: "When s/he is read a story, s/he finds it difficult to work out the character’s intentions or feelings",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
      {
        id: "8",
        text: "When s/he was in preschool, s/he used to enjoy playing games involving pretending with other children",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "9",
        text: "S/he finds it easy to work out what someone is thinking or feeling just by looking at their face",
        scoring: {
          scoreIfResponseIds: ["slightly_disagree", "definitely_disagree"],
        },
      },
      {
        id: "10",
        text: "S/he finds it hard to make new friends",
        scoring: {
          scoreIfResponseIds: ["definitely_agree", "slightly_agree"],
        },
      },
    ],
    scoring: {
      pointPerItem: 1,
      maxScore: 10,
      referralThreshold: 6,
      rulesText: [
        "Only 1 point can be scored for each question.",
        "Score 1 point for Definitely or Slightly Agree on items 1, 5, 7 and 10.",
        "Score 1 point for Definitely or Slightly Disagree on items 2, 3, 4, 6, 8 and 9.",
        "If the individual scores 6 or above, consider referring them for a specialist diagnostic assessment.",
        "This is the child version of the test recommended in the NICE clinical guideline CG142.",
      ],
    },
  },
  {
    id: "snap_iv_26_item",
    title: "SNAP-IV 26-Item Teacher and Parent Rating Scale",
    instrument: "SNAP-IV",
    version: "26-Item",
    description: "James M. Swanson, Ph.D., University of California, Irvine, CA 92715",
    respondent: "Teacher or Parent",
    ageRange: "Child/Adolescent",
    instructions: [],
    responseOptions: SNAP_RESPONSE_OPTIONS,
    items: [
      {
        id: "1",
        text: "Often fails to give close attention to details or makes careless mistakes in schoolwork or tasks",
        subscale: "inattention",
      },
      {
        id: "2",
        text: "Often has difficulty sustaining attention in tasks or play activities",
        subscale: "inattention",
      },
      {
        id: "3",
        text: "Often does not seem to listen when spoken to directly",
        subscale: "inattention",
      },
      {
        id: "4",
        text: "Often does not follow through on instructions and fails to finish schoolwork, chores, or duties",
        subscale: "inattention",
      },
      {
        id: "5",
        text: "Often has difficulty organizing tasks and activities",
        subscale: "inattention",
      },
      {
        id: "6",
        text: "Often avoids, dislikes, or reluctantly engages in tasks requiring sustained mental effort",
        subscale: "inattention",
      },
      {
        id: "7",
        text: "Often loses things necessary for activities",
        subscale: "inattention",
      },
      {
        id: "8",
        text: "Often is distracted by extraneous stimuli",
        subscale: "inattention",
      },
      {
        id: "9",
        text: "Often is forgetful in daily activities",
        subscale: "inattention",
      },
      {
        id: "10",
        text: "Often fidgets with hands or feet or squirms in seat",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "11",
        text: "Often leaves seat in classroom",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "12",
        text: "Often runs about or climbs excessively",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "13",
        text: "Often has difficulty playing or engaging in leisure activities quietly",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "14",
        text: "Often is “on the go” or acts as if “driven by a motor”",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "15",
        text: "Often talks excessively",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "16",
        text: "Often blurts out answers before questions have been completed",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "17",
        text: "Often has difficulty awaiting turn",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "18",
        text: "Often interrupts or intrudes on others",
        subscale: "hyperactivity_impulsivity",
      },
      {
        id: "19",
        text: "Often loses temper",
        subscale: "oppositional_defiant",
      },
      {
        id: "20",
        text: "Often argues with adults",
        subscale: "oppositional_defiant",
      },
      {
        id: "21",
        text: "Often actively defies or refuses adult requests or rules",
        subscale: "oppositional_defiant",
      },
      {
        id: "22",
        text: "Often deliberately does things that annoy other people",
        subscale: "oppositional_defiant",
      },
      {
        id: "23",
        text: "Often blames others for his or her mistakes or misbehaviour",
        subscale: "oppositional_defiant",
      },
      {
        id: "24",
        text: "Often is touchy or easily annoyed by others",
        subscale: "oppositional_defiant",
      },
      {
        id: "25",
        text: "Often is angry and resentful",
        subscale: "oppositional_defiant",
      },
      {
        id: "26",
        text: "Often is spiteful or vindictive",
        subscale: "oppositional_defiant",
      },
    ],
    scoring: {
      scales: [
        {
          id: "inattention",
          name: "Inattention",
          itemIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          ranges: [
            { min: 0, max: 12, label: "not clinically significant" },
            { min: 13, max: 17, label: "mild" },
            { min: 18, max: 22, label: "moderate" },
            { min: 23, max: 27, label: "severe" },
          ],
        },
        {
          id: "hyperactivity_impulsivity",
          name: "Hyperactivity/Impulsivity",
          itemIds: [
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
          ],
          ranges: [
            { min: 0, max: 12, label: "not clinically significant" },
            { min: 13, max: 17, label: "mild" },
            { min: 18, max: 22, label: "moderate" },
            { min: 23, max: 27, label: "severe" },
          ],
        },
        {
          id: "oppositional_defiant",
          name: "Oppositional Defiant",
          itemIds: ["19", "20", "21", "22", "23", "24", "25", "26"],
          ranges: [
            { min: 0, max: 7, label: "not clinically significant" },
            { min: 8, max: 13, label: "mild" },
            { min: 14, max: 18, label: "moderate" },
            { min: 19, max: 24, label: "severe" },
          ],
        },
      ],
      rulesText: [
        "Inattention (items 1–9):",
        "<13 not clinically significant",
        "13–17 mild",
        "18–22 moderate",
        "23–27 severe",
        "Hyperactivity/Impulsivity (items 10–18):",
        "<13 not clinically significant",
        "13–17 mild",
        "18–22 moderate",
        "23–27 severe",
        "Oppositional Defiant (items 19–26):",
        "<8 not clinically significant",
        "8–13 mild",
        "14–18 moderate",
        "19–24 severe",
      ],
    },
  },
];

export const QUESTIONNAIRE_BY_ID: Record<string, Questionnaire> = Object.fromEntries(
  QUESTIONNAIRES.map((questionnaire) => [questionnaire.id, questionnaire])
);
