export const vatsimAuthRedirectUrl = `${
  import.meta.env.VITE_VATSIM_AUTH_ENDPOINT
}/oauth/authorize?client_id=${
  import.meta.env.VITE_VATSIM_AUTH_CLIENT_ID
}&redirect_uri=${
  window.location.origin + "/login/verify"
}&response_type=code&scope=vatsim_details+full_name+email`;

export const discordRedirectUrl = `https://discord.com/api/oauth2/authorize?client_id=546531280842653696&redirect_uri=https%3A%2F%2Fzabartcc.org%2Fconnect%2Fdiscord&response_type=code&scope=identify`;
