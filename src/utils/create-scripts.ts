// TODO: Add validation for the scripts
export const createScript = ({ apiKey }: { apiKey: string }) => {

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://maps.googleapis.com/maps/api/js"
  if (apiKey) script.src += `?key=${apiKey}`

  document.head.appendChild(script);

  return script;
}
