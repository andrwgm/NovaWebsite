// Raw text so one malformed file is skipped instead of breaking the page.
const resourceModules = import.meta.glob('../../content/resources/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const FREE_RESOURCE_TAGS = [
  { id: 'children', label: 'Children' },
  { id: 'adults', label: 'Adults' },
  { id: 'school', label: 'School' },
  { id: 'work', label: 'Work' },
  { id: 'everyday', label: 'Everyday' },
];

function parseRecord(source) {
  try {
    const record = typeof source === 'string' ? JSON.parse(source) : source?.default ?? source;
    if (!record || typeof record !== 'object' || Array.isArray(record)) return null;
    if (record.published !== true) return null;
    if (typeof record.id !== 'string' || record.id === '') return null;
    return record;
  } catch {
    return null;
  }
}

function toGuideResource(record) {
  const filename = typeof record.filename === 'string' ? record.filename : '';
  const previewFiles = Array.isArray(record.previewFiles) ? record.previewFiles : [];
  return {
    id: record.id,
    line: record.line,
    emphasis: record.emphasis,
    kind: 'pdf',
    src: `/resources/${filename}`,
    filename,
    tags: Array.isArray(record.tags) ? record.tags : [],
    description: typeof record.description === 'string' ? record.description : '',
    previews: previewFiles.map((name) => `/resources/previews/${name}`),
    moreBeyondPreview: record.moreBeyondPreview,
  };
}

function loadFreeResources(modules) {
  const records = [];
  for (const source of Object.values(modules || {})) {
    try {
      const record = parseRecord(source);
      if (record) records.push(record);
    } catch {
      // One bad record must not empty the rest of the list.
    }
  }

  records.sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? a.order : 0;
    const orderB = Number.isFinite(b.order) ? b.order : 0;
    if (orderA !== orderB) return orderA - orderB;
    return String(a.id).localeCompare(String(b.id));
  });

  return records.map((record) => {
    try {
      return toGuideResource(record);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

export const FREE_RESOURCES = loadFreeResources(resourceModules);
