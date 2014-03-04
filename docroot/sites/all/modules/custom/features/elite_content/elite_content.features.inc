<?php
/**
 * @file
 * elite_content.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elite_content_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

/**
 * Implements hook_views_api().
 */
function elite_content_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function elite_content_image_default_styles() {
  $styles = array();

  // Exported image style: 114x64.
  $styles['114x64'] = array(
    'name' => '114x64',
    'label' => '114x64',
    'effects' => array(
      1 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 114,
          'height' => 64,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
