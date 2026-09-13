export async function onRequest(context) {
  const { request, next } = context;
  // Pass through unmodified.
  return next();
}
