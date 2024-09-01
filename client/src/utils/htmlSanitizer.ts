import DOMPurify from 'dompurify';

// Configuration object for DOMPurify
const purifyConfig = {
  ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
  ALLOWED_ATTR: []
};

/**
 * Sanitizes HTML string using DOMPurify
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, purifyConfig);
}

// Example usage of more specific sanitization functions
export function sanitizeAndStripAllTags(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

export function sanitizeAndAllowLinks(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'br', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  });
}