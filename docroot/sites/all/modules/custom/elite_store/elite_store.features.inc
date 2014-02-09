<?php
/**
 * @file
 * elite_store.features.inc
 */

/**
 * Implements hook_node_info().
 */
function elite_store_node_info() {
  $items = array(
    'store' => array(
      'name' => t('Store'),
      'base' => 'node_content',
      'description' => t('use this for adding a store that has managers and employees.'),
      'has_title' => '1',
      'title_label' => t('Store Name'),
      'help' => '',
    ),
  );
  return $items;
}
