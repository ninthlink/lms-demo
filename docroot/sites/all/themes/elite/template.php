<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */
 
function elite_preprocess_views_view_responsive_grid(&$vars) {
	if ( isset( $vars['rows'] ) ) {
		$viewresults = $vars['view']->result;
		$count = 0;
		foreach ( $vars['rows'] as $i => $row ) {
			foreach ( $row as $j => $col ) {
				if ( isset( $viewresults[$count]->node_field_data_field_training_quiz_nid ) ) {
					if ( $viewresults[$count]->node_field_data_field_training_quiz_nid == 1 ) {
						// set in elite_custom.module, elite_custom_views_pre_render function
						$vars['rows'][$i][$j]['classes'] .= ' taken';
						$vars['rows'][$i][$j]['content'] = str_replace( 'views-field-field-base-points">', 'views-field-field-base-points"><span class="chk"></span>', $vars['rows'][$i][$j]['content'] );
					}
				}
				$count++;
			}
		}
//		watchdog('rowscheck', 'rows : <pre>'. print_r($vars['rows'],true) .'</pre><br />view results <pre>'. print_r($vars['view']->result,true) .'</pre>');
	}
}

function elite_preprocess_page( &$vars, $hook ) {
	if ( isset( $vars['node'] ) ) {
		$vars['theme_hook_suggestions'][] = 'page__'. str_replace('_', '--', $vars['node']->type);
		$vars['theme_hook_suggestions'][] = 'page__'. str_replace('_', '--', drupal_get_path_alias());
	}
}