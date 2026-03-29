/** Build Calendly embed URL with Obsidian-branded chrome (dark theme). */
export function calendlyEmbedSrc(baseUrl: string): string {
  try {
    const u = new URL(
      baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`
    );
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("background_color", "09090b");
    u.searchParams.set("text_color", "f4f4f5");
    u.searchParams.set("primary_color", "22d3ee");
    return u.toString();
  } catch {
    return baseUrl;
  }
}
