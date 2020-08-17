export const validateVenue = ({
  translations: { FI: { name } = {} } = {},
}: {
  translations: { FI?: { name?: string } }; // TS lol
}) => {
  if (!name) {
    return { 'it-does-not-matter': 'what-we-have-here' };
  }
  return {};
};
