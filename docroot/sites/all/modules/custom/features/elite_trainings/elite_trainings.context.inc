<?php
/**
 * @file
 * elite_trainings.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function elite_trainings_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'trainings_menu_active';
  $context->description = '';
  $context->tag = 'section';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'quiz' => 'quiz',
        'training' => 'training',
      ),
      'options' => array(
        'node_form' => '1',
      ),
    ),
    'path' => array(
      'values' => array(
        'node/*/take' => 'node/*/take',
      ),
    ),
  );
  $context->reactions = array(
    'menu' => 'trainings',
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('section');
  $export['trainings_menu_active'] = $context;

  return $export;
}
