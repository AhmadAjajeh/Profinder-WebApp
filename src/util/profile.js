export function getGitHubLink(socialMediaLinks) {
  return (
    socialMediaLinks.find((item) => item.link.includes('github.com'))?.link ||
    null
  );
}

export function getLinkedInLink(socialMediaLinks) {
  return (
    socialMediaLinks.find((item) => item.link.includes('linkedin.com'))?.link ||
    null
  );
}
