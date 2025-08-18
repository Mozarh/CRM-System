export function validationTodoTitle(text: string): string {
  if (text.trim().length < 2) {
    return 'The minimum text length is 2 characters';
  }
  if (text.trim().length > 64) {
    return 'The maximum text length is 64 characters';
  }
  return '';
}
