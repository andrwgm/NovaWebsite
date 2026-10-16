function pdfResource(id, filename, line, emphasis, tags, description, previewCount, moreBeyondPreview) {
  return {
    id,
    line,
    emphasis,
    kind: 'pdf',
    src: `/resources/${filename}`,
    filename,
    tags,
    description,
    previews: Array.from({ length: previewCount }, (_, index) => `/resources/previews/${id}-${index + 1}.webp`),
    moreBeyondPreview,
  };
}

export const FREE_RESOURCE_TAGS = [
  { id: 'children', label: 'Children' },
  { id: 'adults', label: 'Adults' },
  { id: 'school', label: 'School' },
  { id: 'work', label: 'Work' },
  { id: 'everyday', label: 'Everyday' },
];

export const FREE_RESOURCES = [
  pdfResource(
    'halloween',
    'Halloween_Nova_Clinics.pdf',
    'Trick or treat',
    "your child's way",
    ['children', 'everyday'],
    `🎃 Halloween, your child's way.

A free collection of Halloween activities designed to help neurodivergent children prepare for the unexpected, explore sensory preferences and enjoy Halloween in a way that feels right for them. From costume comfort to planning the day, each activity encourages choice, understanding and confidence.

💡 Printing tip: We recommend printing single-sided, as some activities involve cutting out, arranging or personalising pages.`,
    4,
    true,
  ),
  pdfResource(
    'dental-passport',
    'My_Dental_Passport_Nova_Clinics.pdf',
    'My dental',
    'passport',
    ['children', 'adults', 'everyday'],
    `🦷 My Dental Passport

Dental visits can feel overwhelming, especially when sensory sensitivities, communication differences or unexpected situations are involved.
Our free Dental Passport helps neurodivergent children and adults share their needs, preferences and what makes them feel comfortable, so dental teams can better understand and support them.

🖨️ Printing tip: Print on A4 paper, double-sided, using the 'flip on short edge' setting. Then simply fold the sheet in half to create a handy A5 booklet to take to your appointment.`,
    2,
    false,
  ),
];
