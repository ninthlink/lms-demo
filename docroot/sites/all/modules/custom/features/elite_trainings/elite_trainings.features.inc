<?php
/**
 * @file
 * elite_trainings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function elite_trainings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

/**
 * Implements hook_views_api().
 */
function elite_trainings_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function elite_trainings_node_info() {
  $items = array(
    'training' => array(
      'name' => t('Training'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => t('NOTE : Due to the integration of a "Quiz" at the end of each Training, it may be helpful to create the Quiz piece of content first, and then create the Training which ties to it.'),
    ),
  );
  return $items;
}
