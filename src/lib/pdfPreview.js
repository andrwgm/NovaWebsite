import * as pdfjs from 'pdfjs-dist';
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

pdfjs.GlobalWorkerOptions.workerPort = new PdfWorker();

const documents = new Map();

export function loadPdf(src) {
  const cached = documents.get(src);
  if (cached) {
    return cached;
  }

  const pending = pdfjs.getDocument(src).promise.then((pdf) => {
    documents.set(src, Promise.resolve(pdf));
    return pdf;
  }).catch((error) => {
    documents.delete(src);
    throw error;
  });

  documents.set(src, pending);
  return pending;
}

const FRAME_WIDTH = 840;
const FRAME_HEIGHT = Math.round(FRAME_WIDTH * (297 / 210));

export function renderPdfPage(pdf, pageNumber, canvas) {
  let renderTask = null;
  let cancelled = false;
  const promise = pdf.getPage(pageNumber).then((page) => {
    if (cancelled) {
      const error = new Error('Rendering cancelled');
      error.name = 'RenderingCancelledException';
      throw error;
    }
    const natural = page.getViewport({ scale: 1 });
    const rotation = natural.width > natural.height ? (natural.rotation + 90) % 360 : natural.rotation;
    const base = page.getViewport({ scale: 1, rotation });
    const scale = Math.min(FRAME_WIDTH / base.width, FRAME_HEIGHT / base.height);
    const fitted = page.getViewport({ scale, rotation });
    const viewport = page.getViewport({
      scale,
      rotation,
      offsetX: (FRAME_WIDTH - fitted.width) / 2,
      offsetY: (FRAME_HEIGHT - fitted.height) / 2,
    });
    const context = canvas.getContext('2d', { alpha: false });
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    renderTask = page.render({
      canvasContext: context,
      viewport,
      background: '#f7f4ec',
    });
    return renderTask.promise.then(() => pdf.numPages);
  });

  return {
    promise,
    cancel() {
      cancelled = true;
      renderTask?.cancel();
    },
  };
}
