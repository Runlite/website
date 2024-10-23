export const generateApiKey = (): string => {
  return (
    "ak_" +
    Array.from({ length: 32 }, () => Math.random().toString(36).charAt(2)).join(
      ""
    )
  );
};
