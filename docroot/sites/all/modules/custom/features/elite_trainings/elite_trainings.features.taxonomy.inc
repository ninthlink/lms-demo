<?php
/**
 * @file
 * elite_trainings.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function elite_trainings_taxonomy_default_vocabularies() {
  return array(
    'type' => array(
      'name' => 'Type',
      'machine_name' => 'type',
      'description' => 'Tags for content containing media types',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
