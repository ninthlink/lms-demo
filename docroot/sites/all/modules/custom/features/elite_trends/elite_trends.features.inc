<?php
/**
 * @file
 * elite_trends.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elite_trends_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function elite_trends_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_flag_default_flags().
 */
function elite_trends_flag_default_flags() {
  $flags = array();
  // Exported flag: "Collect Points".
  $flags['collect_points'] = array(
    'entity_type' => 'node',
    'title' => 'Collect Points',
    'global' => 0,
    'types' => array(
      0 => 'article',
    ),
    'flag_short' => 'Collect Points',
    'flag_long' => '',
    'flag_message' => '',
    'unflag_short' => 'Unredeem points',
    'unflag_long' => '',
    'unflag_message' => '',
    'unflag_denied_text' => 'Points Collected',
    'link_type' => 'normal',
    'weight' => 0,
    'show_in_links' => array(
      'full' => 0,
      'teaser' => 0,
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
    ),
    'show_as_field' => 1,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 1,
    'module' => 'elite_trends',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  // Exported flag: "Favorites".
  $flags['favorites'] = array(
    'entity_type' => 'node',
    'title' => 'Favorites',
    'global' => 0,
    'types' => array(
      0 => 'article',
      1 => 'training',
    ),
    'flag_short' => 'Favorite',
    'flag_long' => '',
    'flag_message' => 'The [node:type] has been added to your Favorites',
    'unflag_short' => 'Unfavorite',
    'unflag_long' => '',
    'unflag_message' => 'The [node:type] has been removed from your Favorites',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 0,
    'show_in_links' => array(
      'full' => 0,
      'teaser' => 0,
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
      'token' => 0,
    ),
    'show_as_field' => 1,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 1,
    'module' => 'elite_trends',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  return $flags;

}

/**
 * Implements hook_image_default_styles().
 */
function elite_trends_image_default_styles() {
  $styles = array();

  // Exported image style: 260x146.
  $styles['260x146'] = array(
    'name' => '260x146',
    'label' => '260x146',
    'effects' => array(
      2 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 260,
          'height' => 146,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: 810x455.
  $styles['810x455'] = array(
    'name' => '810x455',
    'label' => '810x455',
    'effects' => array(
      3 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 810,
          'height' => 455,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function elite_trends_node_info() {
  $items = array(
    'article' => array(
      'name' => t('Article'),
      'base' => 'node_content',
      'description' => t('Use <em>articles</em> for time-sensitive content like Trends, news, press releases, blog posts...'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
