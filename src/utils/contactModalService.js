const listeners = new Set();

export const onContactModalRequest = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const requestContactModal = (payload = {}) => {
  listeners.forEach((listener) => listener(payload));
};
