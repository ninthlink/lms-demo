<?php
/**
 * @file
 * elite_content.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function elite_content_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'popular_content';
  $view->description = '"What\'s Hot" content from the Nodequeue : Block + Services';
  $view->tag = 'elite';
  $view->base_table = 'node';
  $view->human_name = 'Popular Content';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'What\'s Hot';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['required'] = TRUE;
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['queues'] = array(
    'whats_hot' => 'whats_hot',
    'home_slider' => 0,
  );
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['id'] = 'field_training_quiz_target_id';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['table'] = 'field_data_field_training_quiz';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['field'] = 'field_training_quiz_target_id';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['label'] = 'quiz';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['max_length'] = '41';
  $handler->display->display_options['fields']['title']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Field: Product Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => 'content',
  );
  /* Field: Content: Rate this */
  $handler->display->display_options['fields']['field_rating']['id'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['table'] = 'field_data_field_rating';
  $handler->display->display_options['fields']['field_rating']['field'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['label'] = '';
  $handler->display->display_options['fields']['field_rating']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_rating']['click_sort_column'] = 'rating';
  $handler->display->display_options['fields']['field_rating']['settings'] = array(
    'widget' => array(
      'fivestar_widget' => 'default',
    ),
    'expose' => 1,
    'style' => 'average',
    'text' => 'average',
  );
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_training_base_points']['id'] = 'field_training_base_points';
  $handler->display->display_options['fields']['field_training_base_points']['table'] = 'field_data_field_training_base_points';
  $handler->display->display_options['fields']['field_training_base_points']['field'] = 'field_training_base_points';
  $handler->display->display_options['fields']['field_training_base_points']['label'] = '';
  $handler->display->display_options['fields']['field_training_base_points']['element_label_colon'] = FALSE;
  /* Field: Content: Media Types */
  $handler->display->display_options['fields']['field_media_types']['id'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['table'] = 'field_data_field_media_types';
  $handler->display->display_options['fields']['field_media_types']['field'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['label'] = '';
  $handler->display->display_options['fields']['field_media_types']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_types']['click_sort_column'] = 'tid';
  $handler->display->display_options['fields']['field_media_types']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_media_types']['group_column'] = 'tid';
  /* Sort criterion: Nodequeue: Position */
  $handler->display->display_options['sorts']['position']['id'] = 'position';
  $handler->display->display_options['sorts']['position']['table'] = 'nodequeue_nodes';
  $handler->display->display_options['sorts']['position']['field'] = 'position';
  $handler->display->display_options['sorts']['position']['relationship'] = 'nodequeue_rel';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'responsive_grid';
  $handler->display->display_options['style_options']['column_classes'] = 'views-column grid-3';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Field: Product Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'image_style' => '114x64',
    'image_link' => 'content',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['max_length'] = '41';
  $handler->display->display_options['fields']['title']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Rate this */
  $handler->display->display_options['fields']['field_rating']['id'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['table'] = 'field_data_field_rating';
  $handler->display->display_options['fields']['field_rating']['field'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['label'] = '';
  $handler->display->display_options['fields']['field_rating']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_rating']['click_sort_column'] = 'rating';
  $handler->display->display_options['fields']['field_rating']['settings'] = array(
    'widget' => array(
      'fivestar_widget' => 'sites/all/modules/contrib/fivestar/widgets/outline/outline.css',
    ),
    'expose' => 1,
    'style' => 'average',
    'text' => 'none',
  );
  /* Field: Content: Base Points */
  $handler->display->display_options['fields']['field_base_points']['id'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['table'] = 'field_data_field_base_points';
  $handler->display->display_options['fields']['field_base_points']['field'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['label'] = '';
  $handler->display->display_options['fields']['field_base_points']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_points']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Media Types */
  $handler->display->display_options['fields']['field_media_types']['id'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['table'] = 'field_data_field_media_types';
  $handler->display->display_options['fields']['field_media_types']['field'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['label'] = '';
  $handler->display->display_options['fields']['field_media_types']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['relationship'] = 'field_training_quiz_target_id';
  $handler->display->display_options['fields']['nid_1']['label'] = 'taken';
  $handler->display->display_options['fields']['nid_1']['exclude'] = TRUE;

  /* Display: Services */
  $handler = $view->new_display('services', 'Services', 'services_1');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['max_length'] = '41';
  $handler->display->display_options['fields']['title']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Field: Product Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['type'] = 'services';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'skip_safe' => 1,
    'skip_empty_values' => 1,
  );
  /* Field: Content: Rate this */
  $handler->display->display_options['fields']['field_rating']['id'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['table'] = 'field_data_field_rating';
  $handler->display->display_options['fields']['field_rating']['field'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['label'] = '';
  $handler->display->display_options['fields']['field_rating']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_rating']['click_sort_column'] = 'rating';
  $handler->display->display_options['fields']['field_rating']['type'] = 'services';
  $handler->display->display_options['fields']['field_rating']['settings'] = array(
    'skip_safe' => 1,
    'skip_empty_values' => 1,
  );
  /* Field: Content: Base Points */
  $handler->display->display_options['fields']['field_base_points']['id'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['table'] = 'field_data_field_base_points';
  $handler->display->display_options['fields']['field_base_points']['field'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['label'] = '';
  $handler->display->display_options['fields']['field_base_points']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_points']['type'] = 'number_unformatted';
  $handler->display->display_options['fields']['field_base_points']['settings'] = array(
    'thousand_separator' => ' ',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Media Types */
  $handler->display->display_options['fields']['field_media_types']['id'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['table'] = 'field_data_field_media_types';
  $handler->display->display_options['fields']['field_media_types']['field'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['label'] = '';
  $handler->display->display_options['fields']['field_media_types']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_types']['type'] = 'services';
  $handler->display->display_options['fields']['field_media_types']['settings'] = array(
    'skip_safe' => 0,
    'skip_empty_values' => 0,
  );
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['relationship'] = 'field_training_quiz_target_id';
  $handler->display->display_options['fields']['nid_1']['label'] = 'taken';
  $handler->display->display_options['path'] = 'popular_content';
  $translatables['popular_content'] = array(
    t('Master'),
    t('What\'s Hot'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('queue'),
    t('quiz'),
    t('Block'),
    t('taken'),
    t('Services'),
    t('title'),
  );
  $export['popular_content'] = $view;

  $view = new view();
  $view->name = 'related_content';
  $view->description = '"Related Content" for a given piece of content : Block + Services';
  $view->tag = 'elite';
  $view->base_table = 'node';
  $view->human_name = 'Related Content';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['css_class'] = 'view-popular-content';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['style_plugin'] = 'responsive_grid';
  $handler->display->display_options['style_options']['columns'] = '3';
  $handler->display->display_options['style_options']['column_classes'] = 'views-column grid-3';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h2 class="block-title centered">Related Content</h2>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_related_content_target_id']['id'] = 'field_related_content_target_id';
  $handler->display->display_options['relationships']['field_related_content_target_id']['table'] = 'field_data_field_related_content';
  $handler->display->display_options['relationships']['field_related_content_target_id']['field'] = 'field_related_content_target_id';
  $handler->display->display_options['relationships']['field_related_content_target_id']['label'] = 'related_content';
  $handler->display->display_options['relationships']['field_related_content_target_id']['required'] = TRUE;
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['id'] = 'field_training_quiz_target_id';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['table'] = 'field_data_field_training_quiz';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['field'] = 'field_training_quiz_target_id';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['relationships']['field_training_quiz_target_id']['label'] = 'quiz';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Field: Product Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'image_style' => '114x64',
    'image_link' => 'content',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Rate this */
  $handler->display->display_options['fields']['field_rating']['id'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['table'] = 'field_data_field_rating';
  $handler->display->display_options['fields']['field_rating']['field'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_rating']['label'] = '';
  $handler->display->display_options['fields']['field_rating']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_rating']['click_sort_column'] = 'rating';
  $handler->display->display_options['fields']['field_rating']['settings'] = array(
    'widget' => array(
      'fivestar_widget' => 'sites/all/modules/contrib/fivestar/widgets/outline/outline.css',
    ),
    'expose' => 1,
    'style' => 'average',
    'text' => 'none',
  );
  /* Field: Content: Base Points */
  $handler->display->display_options['fields']['field_base_points']['id'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['table'] = 'field_data_field_base_points';
  $handler->display->display_options['fields']['field_base_points']['field'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_base_points']['label'] = '';
  $handler->display->display_options['fields']['field_base_points']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_points']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Media Types */
  $handler->display->display_options['fields']['field_media_types']['id'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['table'] = 'field_data_field_media_types';
  $handler->display->display_options['fields']['field_media_types']['field'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_media_types']['label'] = '';
  $handler->display->display_options['fields']['field_media_types']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['relationship'] = 'field_training_quiz_target_id';
  $handler->display->display_options['fields']['nid_1']['label'] = 'taken';
  $handler->display->display_options['fields']['nid_1']['exclude'] = TRUE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['filters']['status']['value'] = '1';
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');

  /* Display: Services */
  $handler = $view->new_display('services', 'Services', 'services_1');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['nid']['label'] = 'nid';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Field: Product Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['type'] = 'services';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'skip_safe' => 1,
    'skip_empty_values' => 1,
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['title']['label'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Rate this */
  $handler->display->display_options['fields']['field_rating']['id'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['table'] = 'field_data_field_rating';
  $handler->display->display_options['fields']['field_rating']['field'] = 'field_rating';
  $handler->display->display_options['fields']['field_rating']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_rating']['label'] = '';
  $handler->display->display_options['fields']['field_rating']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_rating']['click_sort_column'] = 'rating';
  $handler->display->display_options['fields']['field_rating']['type'] = 'services';
  $handler->display->display_options['fields']['field_rating']['settings'] = array(
    'skip_safe' => 1,
    'skip_empty_values' => 1,
  );
  /* Field: Content: Base Points */
  $handler->display->display_options['fields']['field_base_points']['id'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['table'] = 'field_data_field_base_points';
  $handler->display->display_options['fields']['field_base_points']['field'] = 'field_base_points';
  $handler->display->display_options['fields']['field_base_points']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_base_points']['label'] = '';
  $handler->display->display_options['fields']['field_base_points']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_points']['type'] = 'number_unformatted';
  $handler->display->display_options['fields']['field_base_points']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Media Types */
  $handler->display->display_options['fields']['field_media_types']['id'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['table'] = 'field_data_field_media_types';
  $handler->display->display_options['fields']['field_media_types']['field'] = 'field_media_types';
  $handler->display->display_options['fields']['field_media_types']['relationship'] = 'field_related_content_target_id';
  $handler->display->display_options['fields']['field_media_types']['label'] = '';
  $handler->display->display_options['fields']['field_media_types']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_types']['type'] = 'services';
  $handler->display->display_options['fields']['field_media_types']['settings'] = array(
    'skip_safe' => 0,
    'skip_empty_values' => 0,
  );
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['relationship'] = 'field_training_quiz_target_id';
  $handler->display->display_options['fields']['nid_1']['label'] = 'taken';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'php';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['code'] = 'if ( isset( $_GET[\'args\'] ) ) {
$args = $_GET[\'args\'];
if ( isset( $args[0] ) ) return $args[0];
}';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['path'] = 'related_content';
  $translatables['related_content'] = array(
    t('Master'),
    t('<none>'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('<h2 class="block-title centered">Related Content</h2>'),
    t('related_content'),
    t('quiz'),
    t('taken'),
    t('All'),
    t('Block'),
    t('Services'),
    t('nid'),
    t('title'),
  );
  $export['related_content'] = $view;

  return $export;
}
