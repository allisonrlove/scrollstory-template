---
title: Story Features
layout: default
date: 2026-10-29
---

# Story Features

Scrollstories can have a slim **tab bar**, a **reading progress line**, **fade-in on scroll**, and a **back-to-top button**. All are optional and easy to switch off.

## Tabs

Add `story-tabs` to the top of your story (the part between the `---` lines). Each tab has a `title` and either a `section` or a `url`.

```yaml
story-tabs:
  - title: Introduction
    section: Introduction          # scrolls to the heading with this text
  - title: The Trail
    url: /scrollstories/trail/     # opens another page on this site
  - title: Learn more
    url: https://example.com       # a full web address also works
```

- `section` is the words of a heading in your story (or its `id`). It is not case-sensitive.
- To add a tab, copy two lines. To remove one, delete them.
- Write `story-tabs: auto` to get one tab for every `##` heading with no typing.
- Delete the `story-tabs` lines to hide the bar.

## Turning features on and off

Site-wide, in `_config.yml`:

```yaml
story_features:
  tabs: true
  progress_bar: true
  reveal: true
  back_to_top: true
```

For one story, put the matching name in its front matter: `progress-bar: false`, `reveal: false`, `back-to-top: false`.

## Changing the look

Open `assets/css/story-features.css`. The variables at the top (`--tabs-active`, `--progress-color`, `--reveal-speed`, and so on) control colors and speed. They use the site's theme colors by default, so a theme change carries over.

## Key figures

Big numbers that count up when scrolled into view:

```liquid
{% raw %}{% include layout/stats.html title="By the numbers"
   stats="1200|miles of trail; 12|weeks on the road; 85%|of mules survived" %}{% endraw %}
```

Separate figures with `;` and write each as `number|label`.

## Video and embeds

Paste a normal YouTube or Vimeo link; it becomes a responsive player:

```liquid
{% raw %}{% include media/embed.html url="https://www.youtube.com/watch?v=VIDEO_ID" caption="Optional caption" %}{% endraw %}
```

Optional: `title` (for screen readers) and `ratio` (`16x9`, `4x3`, `1x1`).

## Where the code lives

| Piece | File |
|---|---|
| Tab bar markup | `_includes/nav/story-tabs.html` |
| Key figures | `_includes/layout/stats.html` |
| Video embed | `_includes/media/embed.html` |
| Progress bar and back-to-top markup | `_includes/scrollstory/features.html` |
| Behavior | `assets/js/story-features.js` |
| Style | `assets/css/story-features.css` |
