export const validateVenue = ({
  translations,
}: {
  translations?: { FI?: { name?: string } };
}) => {
  if (!translations?.FI?.name) {
    return {
      'it-does-not-matter': {
        type: 'required',
        message: 'what-we-have-here',
      },
    };
  }
  return {};
};
