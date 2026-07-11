import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import {
  formatIndustryNewsDate,
  industryNewsRoundups,
  latestIndustryNewsRoundup,
  type IndustryNewsStory,
} from "@/lib/industry-news";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Snowmobile Industry News | Colorado Snomo Expo",
  description:
    "Weekly snowmobile industry news covering product announcements, manufacturers, dealers, technology, safety, access, racing and market developments.",
  path: "/snowmobile-industry-news",
});

function StoryThumbnail({ story }: { story: IndustryNewsStory }) {
  const variantIndex = story.thumbnailVariant
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const accent = variantIndex % 2 === 0 ? "#C3192E" : "#F8C744";
  const secondary = variantIndex % 3 === 0 ? "#5CA8D8" : "#9FB3C8";

  return (
    <div className="industry-news-thumbnail" aria-label={story.thumbnailAlt} role="img">
      <svg viewBox="0 0 640 360" focusable="false" aria-hidden="true">
        <rect width="640" height="360" rx="0" fill="#08131F" />
        <path
          d="M0 270 C96 214 152 232 244 178 C332 126 414 146 502 92 C566 52 606 62 640 34 L640 360 L0 360 Z"
          fill="#101F31"
        />
        <path
          d="M54 262 C126 220 186 226 254 184 C330 138 396 144 470 100 C528 66 586 58 640 46"
          fill="none"
          stroke={secondary}
          strokeOpacity="0.36"
          strokeWidth="3"
        />
        <path
          d="M92 288 C178 246 268 250 352 202 C430 158 528 152 604 112"
          fill="none"
          stroke="#F8FBFF"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <g opacity="0.9">
          <rect x="76" y="70" width="150" height="82" rx="10" fill="none" stroke={accent} strokeWidth="5" />
          <path d="M98 128 L202 92" stroke="#F8FBFF" strokeOpacity="0.72" strokeWidth="7" />
          <path d="M116 142 L220 106" stroke={accent} strokeOpacity="0.8" strokeWidth="4" />
        </g>
        <g transform="translate(382 214)" opacity="0.9">
          <path d="M0 42 H154" stroke="#F8FBFF" strokeWidth="9" strokeLinecap="round" />
          <path d="M26 42 C50 2 102 -8 126 42" fill="none" stroke={accent} strokeWidth="10" />
          <circle cx="52" cy="44" r="16" fill="#08131F" stroke="#F8FBFF" strokeWidth="6" />
          <circle cx="112" cy="44" r="16" fill="#08131F" stroke="#F8FBFF" strokeWidth="6" />
        </g>
        <text
          x="48"
          y="322"
          fill="#F8FBFF"
          fillOpacity="0.72"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="4"
        >
          {story.category.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}

function StoryCard({ story }: { story: IndustryNewsStory }) {
  return (
    <article className="industry-news-card">
      <StoryThumbnail story={story} />
      <div className="industry-news-card-content">
        <div className="industry-news-card-meta">
          <span>#{story.rank}</span>
          <span>{story.category}</span>
          <span>{formatIndustryNewsDate(story.publishedAt)}</span>
        </div>
        <h3>{story.headline}</h3>
        <p className="industry-news-source">{story.sourceName}</p>
        <p>{story.synopsis}</p>
        <Link
          className="industry-news-external-link"
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read the original story from ${story.sourceName}. Opens an external website.`}
        >
          Read the original story
        </Link>
      </div>
    </article>
  );
}

export default function SnowmobileIndustryNewsPage() {
  const topStories = latestIndustryNewsRoundup?.stories.filter((story) => story.featured) ?? [];
  const additionalStories =
    latestIndustryNewsRoundup?.stories.filter((story) => !story.featured) ?? [];

  return (
    <main className="industry-news-page">
      <SiteHeader />

      <section className="industry-news-page-header" aria-labelledby="industry-news-title">
        <p className="industry-news-kicker">Updated Every Monday</p>
        <h1 id="industry-news-title">Snowmobile Industry News</h1>
        <p>
          Weekly coverage of product announcements, manufacturers, dealers,
          technology, regulations, recalls, trail access, competition, safety and
          broader market developments shaping the snowmobile industry.
        </p>
        <div className="industry-news-update-label">
          <span>Latest Roundup</span>
          <strong>
            {latestIndustryNewsRoundup
              ? formatIndustryNewsDate(latestIndustryNewsRoundup.updatedAt)
              : "Pending editorial publication"}
          </strong>
        </div>
      </section>

      {latestIndustryNewsRoundup ? (
        <>
          <section className="industry-news-section" aria-labelledby="top-five-title">
            <div className="industry-news-section-heading">
              <p className="industry-news-kicker">
                Week of {formatIndustryNewsDate(latestIndustryNewsRoundup.weekOf)}
              </p>
              <h2 id="top-five-title">Top 5 This Week</h2>
            </div>
            <div className="industry-news-grid">
              {topStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>

          {additionalStories.length > 0 ? (
            <section className="industry-news-section" aria-labelledby="more-news-title">
              <div className="industry-news-section-heading">
                <p className="industry-news-kicker">Additional Stories</p>
                <h2 id="more-news-title">More Industry News</h2>
              </div>
              <div className="industry-news-compact-list">
                {additionalStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="industry-news-empty" aria-labelledby="industry-news-empty-title">
          <p className="industry-news-kicker">Editorial Desk</p>
          <h2 id="industry-news-empty-title">First Weekly Roundup Coming Soon</h2>
          <p>
            We are preparing the first verified snowmobile industry roundup.
            This page will publish only sourced stories with direct original
            links and original editorial synopses.
          </p>
        </section>
      )}

      <section className="industry-news-section" aria-labelledby="industry-news-archive-title">
        <div className="industry-news-section-heading">
          <p className="industry-news-kicker">Archive</p>
          <h2 id="industry-news-archive-title">Weekly Roundups</h2>
        </div>
        {industryNewsRoundups.length > 0 ? (
          <div className="industry-news-archive">
            {industryNewsRoundups.map((roundup) => (
              <article key={roundup.id}>
                <h3>{formatIndustryNewsDate(roundup.weekOf)}</h3>
                <p>{roundup.stories.length} verified stories</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="industry-news-archive-empty">
            Archived editions will appear here after each verified Monday update.
          </p>
        )}
      </section>
    </main>
  );
}
