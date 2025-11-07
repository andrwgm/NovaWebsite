const listeners = new Set();

export const onContactModalRequest = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const requestContactModal = () => {
  listeners.forEach((listener) => listener());
};
