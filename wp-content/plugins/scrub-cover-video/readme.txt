=== Scrub Cover Video ===
Contributors: yourcompany
Tags: video, scroll, gsap, cover block, animation
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds scroll-scrub video functionality to the WordPress Cover block.

== Description ==

This plugin adds a "Scroll-scrub video" toggle to the core Cover block. When enabled on a Cover block with a background video, the video playback will be synchronized with the scroll position on the front-end.

**Features:**
* Simple toggle in the Cover block inspector
* Only appears when the Cover has a video background
* Uses GSAP ScrollTrigger for smooth scroll synchronization
* CDN loading with local fallbacks
* Lightweight and performant

**Usage:**
1. Add a Cover block to your page
2. Set a video as the background
3. In the block settings, enable "Scroll-scrub background video"
4. The video will now scrub based on scroll position

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/scrub-cover-video` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the toggle in Cover blocks with video backgrounds

== Changelog ==

= 1.0.0 =
* Initial release
* Added scroll-scrub video functionality to Cover blocks
* CDN loading with local fallbacks
* Gutenberg block extension
