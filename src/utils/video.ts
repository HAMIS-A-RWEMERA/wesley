export interface ParsedVideoInfo {
  type: 'youtube' | 'vimeo' | 'direct' | 'unknown';
  videoId?: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl?: string;
  isValid: boolean;
}

/**
 * Robust video URL parser and embed converter.
 * Supports:
 * - standard YouTube URLs: https://www.youtube.com/watch?v=VIDEO_ID
 * - short URLs: https://youtu.be/VIDEO_ID
 * - shorts: https://www.youtube.com/shorts/VIDEO_ID
 * - live streams: https://www.youtube.com/live/VIDEO_ID
 * - mobile URLs: https://m.youtube.com/watch?v=VIDEO_ID
 * - embed URLs: https://www.youtube.com/embed/VIDEO_ID
 * - raw 11-char video IDs: e.g. ScMzIvxBSi4
 * - raw <iframe> embed codes: <iframe src="...">
 * - Vimeo URLs: https://vimeo.com/123456789 or player.vimeo.com/video/123456789
 */
export function parseVideoUrl(input: string | undefined | null): ParsedVideoInfo {
  if (!input || typeof input !== 'string') {
    return {
      type: 'unknown',
      embedUrl: '',
      watchUrl: '',
      isValid: false
    };
  }

  let cleaned = input.trim();

  // Handle user pasting full <iframe ... src="..."> embed snippet
  const iframeMatch = cleaned.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    cleaned = iframeMatch[1];
  }

  // 1. YouTube Matchers
  // Matches watch?v=, embed/, v/, shorts/, live/, youtu.be/
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/|live\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = cleaned.match(ytRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      isValid: true
    };
  }

  // Match raw 11-character YouTube ID string
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleaned)) {
    const videoId = cleaned;
    return {
      type: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      isValid: true
    };
  }

  // 2. Vimeo Matchers
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = cleaned.match(vimeoRegex);

  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    return {
      type: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      watchUrl: `https://vimeo.com/${videoId}`,
      thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`,
      isValid: true
    };
  }

  // 3. Direct video file or generic secure web link
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    // If it's already an embed link
    return {
      type: 'direct',
      embedUrl: cleaned,
      watchUrl: cleaned,
      isValid: true
    };
  }

  return {
    type: 'unknown',
    embedUrl: cleaned,
    watchUrl: cleaned,
    isValid: false
  };
}

export function formatVideoEmbedUrl(url: string | undefined | null): string {
  if (!url) return '';
  const parsed = parseVideoUrl(url);
  return parsed.embedUrl || url;
}

export function getVideoWatchUrl(url: string | undefined | null): string {
  if (!url) return '';
  const parsed = parseVideoUrl(url);
  return parsed.watchUrl || url;
}

export function getVideoThumbnail(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  const parsed = parseVideoUrl(url);
  return parsed.thumbnailUrl;
}
