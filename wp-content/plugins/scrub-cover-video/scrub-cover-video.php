<?php
/**
 * Plugin Name: Scrub Cover Video
 * Description: Adds a "Scroll-scrub video" toggle to the core Cover block and syncs video playback to scroll.
 * Version: 1.0.0
 * Author: Your Company
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'SCV_VER', '1.0.0' );
define( 'SCV_URL', plugin_dir_url( __FILE__ ) );
define( 'SCV_PATH', plugin_dir_path( __FILE__ ) );

add_action('init', function () {
  // Editor script: block extension
  wp_register_script(
    'scv-editor',
    SCV_URL . 'build/editor.js',
    [ 'wp-blocks', 'wp-hooks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-compose', 'wp-data' ],
    SCV_VER,
    true
  );
  wp_enqueue_script('scv-editor');
});

add_action('wp_enqueue_scripts', function () {
  // CDN scripts
  wp_register_script('gsap', 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js', [], null, true);
  wp_register_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js', ['gsap'], null, true);

  // Local fallbacks if CDN blocked
  $fallback = "
    (function(){
      function inject(src){ var s=document.createElement('script'); s.src=src; s.defer=true; document.head.appendChild(s); }
      if (!window.gsap) inject('" . esc_js( SCV_URL . "assets/gsap.min.js" ) . "');
      if (!window.ScrollTrigger) inject('" . esc_js( SCV_URL . "assets/ScrollTrigger.min.js" ) . "');
    })();
  ";
  wp_add_inline_script('gsap-scrolltrigger', $fallback);

  // Our front-end
  wp_register_script('scv-frontend', SCV_URL . 'build/frontend.js', ['gsap', 'gsap-scrolltrigger'], SCV_VER, true);
  wp_enqueue_script('gsap');
  wp_enqueue_script('gsap-scrolltrigger');
  wp_enqueue_script('scv-frontend');
});
