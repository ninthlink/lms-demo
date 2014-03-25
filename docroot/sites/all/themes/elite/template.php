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
	
	if ( !isset( $vars['page']['pre_top'] ) ) {
		$vars['page']['pre_top'] = array();
	}
	// tealium
	$qenv = 'dev';
	if (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
	  switch ($_ENV['AH_SITE_ENVIRONMENT']) {
		case 'dev':
		  $qenv = 'dev';
		  break;
		case 'test':
		  $qenv = 'qa';
		  break;
		case 'prod':
		  $qenv = 'prod';
		  break;
	  }
	}
	$vars['page']['pre_top']['qtealium'] = array(
		'#markup' => "<script type=\"text/javascript\">
var utag_data = {
  ev : '',
  action : '',
  detail : '',
  label : '',
  location : ''
}
</script>


<script type=\"text/javascript\">
    (function(a,b,c,d){
    a='//tags.tiqcdn.com/utag/qualcomm/elite-web/". $qenv ."/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();
</script>"
	);

	watchdog('qe', 'elite_preprocess_page? hdr : <pre>'. print_r($vars['page'],true) .'</pre>');
}

function elite_quiz_admin_summary($variables) {
  $quiz = $variables['quiz'];
  $questions = $variables['questions'];
  $score = $variables['score'];
  $summary = $variables['summary'];
  $rid = $variables['rid'];
  // To adjust the title uncomment and edit the line below:
  // drupal_set_title(check_plain($quiz->title));
  if (!$score['is_evaluated']) {
    drupal_set_message(t('This quiz has not been scored yet.'), 'warning');
  }
  // Display overall result.
  $output = '';
  $params = array('%num_correct' => $score['numeric_score'], '%question_count' => $score['possible_score']);
  $output .= '<div id="quiz_score_possible">' . t('This person got %num_correct of %question_count correct', $params) . '</div>' . "\n";
  //$output .= '<div id="quiz_score_percent">' . t('Total score: @score %', array('@score' => $score['percentage_score'])) . '</div>' . "\n";
	/*
  if (isset($summary['passfail'])) {
    $output .= '<div id="quiz_summary">' . check_markup($summary['passfail'], $quiz->body['und'][0]['format']) . '</div>' . "\n";
  }
  if (isset($summary['result'])) {
    $output .= '<div id="quiz_summary">' . check_markup($summary['result'], $quiz->body['und'][0]['format']) . '</div>' . "\n";
  }
	*/
  // Get the feedback for all questions.
  require_once DRUPAL_ROOT . '/' . drupal_get_path('module', 'quiz') . '/quiz.pages.inc';
  $report_form = drupal_get_form('quiz_report_form', $questions, TRUE, TRUE, TRUE);
  $output .= drupal_render($report_form);
  return $output;
}

function elite_quiz_take_summary($variables) {
  $quiz = $variables['quiz'];
  $questions = $variables['questions'];
  $score = $variables['score'];
  $summary = $variables['summary'];
  $rid =  $variables['rid'];
  // Set the title here so themers can adjust.
  drupal_set_title($quiz->title);

  // Display overall result.
  $output = '';
  if (!empty($score['possible_score'])) {
    if (!$score['is_evaluated']) {
      if (user_access('score taken quiz answer')) {
        $msg = t('Parts of this @quiz have not been evaluated yet. The score below is not final. <a class="self-score" href="!result_url">Click here</a> to give scores on your own.', array('@quiz' => QUIZ_NAME, '!result_url' => url('node/' . $quiz->nid . '/results/' . $rid)));
      }
      else {
        $msg = t('Parts of this @quiz have not been evaluated yet. The score below is not final.', array('@quiz' => QUIZ_NAME));
      }
      drupal_set_message($msg, 'warning');
    }
    $output .= '<div id="quiz_score_possible">' . t('You got %num_correct of %question_count questions correct', array('%num_correct' => $score['numeric_score'], '%question_count' => $score['possible_score'])) . '</div>' . "\n";
    //$output .= '<div id="quiz_score_percent">' . t('Your score: %score %', array('%score' => $score['percentage_score'])) . '</div>' . "\n";
  }
	/*
  if (isset($summary['passfail'])) {
    $output .= '<div id="quiz_summary">' . $summary['passfail'] . '</div>' . "\n";
  }
  if (isset($summary['result'])) {
    $output .= '<div id="quiz_summary">' . $summary['result'] . '</div>' . "\n";
  }
	*/
  // Get the feedback for all questions. These are included here to provide maximum flexibility for themers
  if ($quiz->display_feedback) {
    $form = drupal_get_form('quiz_report_form', $questions);
    $output .= drupal_render($form);
  }
  return $output;
}