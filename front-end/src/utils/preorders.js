const PREORDER_STORAGE_KEY = "preOrderedBooks";

export function getStoredPreOrderIds() {
  const rawValue = localStorage.getItem(PREORDER_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    localStorage.removeItem(PREORDER_STORAGE_KEY);
    return [];
  }
}

export function savePreOrder(bookId) {
  const existing = getStoredPreOrderIds();

  if (existing.includes(bookId)) {
    return existing;
  }

  const updated = [...existing, bookId];
  localStorage.setItem(PREORDER_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearPreOrders() {
  localStorage.setItem(PREORDER_STORAGE_KEY, JSON.stringify([]));
  return [];
}
