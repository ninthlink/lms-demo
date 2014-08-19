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
		//watchdog('rowscheck', 'rows : <pre>'. print_r($vars['rows'],true) .'</pre><br />view results <pre>'. print_r($vars['view']->result,true) .'</pre>');
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
	$tealiumk = "<script type=\"text/javascript\">
    (function(a,b,c,d){
    a='//tags.tiqcdn.com/utag/qualcomm/elite-web/". $qenv ."/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();
</script>";
	global $user;
	if ( $user->uid ) {
		$region = elite_custom_user_region();
		$tealiumk = "<script type=\"text/javascript\">
var utag_data = {
  location : \"". $region ."\",
  logged_in : \"yes\"
}
</script>". $tealiumk;
	}
	$vars['page']['pre_top']['qtealium'] = array(
		'#markup' => $tealiumk
	);
	//watchdog('qe', 'elite_preprocess_page? hdr : <pre>'. print_r($vars['page'],true) .'</pre>');
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
/*
 * hook template_preprocess_field
 */
function elite_preprocess_field(&$vars) {
	// here is one way to change it from "50 points" to "<strong>50</strong> points"...
	if ( ( $vars['element']['#field_name'] == 'field_base_points' ) && ( $vars['element']['#bundle'] == 'poll' ) ) {
		foreach ( $vars['items'] as $k => $v ) {
			$vars['items'][$k] = '<strong>'. $vars['element']['#items'][$k]['value'] .'</strong> '. t('points');
		}
	}
}
/*
 * hook_html_head_alter
 * remove "X-Generator" header, via https://www.drupal.org/node/982034#comment-3758880
 */
function elite_html_head_alter(&$head_elements) {
  unset($head_elements['system_meta_generator']);
}

/*
 * theme_quiz_get_user_results from quiz module quiz.pages.inc
 */
function elite_quiz_get_user_results($variables) {
  global $language;
  $results = $variables['results'];
  $rows = array();

  while (list($key, $result) = each($results)) {
    $interval = _quiz_format_duration($result['time_end'] - $result['time_start']);
    $passed = $result['score'] >= $result['pass_rate'];
    $grade = $passed ? t('Passed') : t('Failed');
    $passed_class = $passed ? 'quiz-passed' : 'quiz-failed';
    if (!is_numeric($result['score'])) {
      $score = t('In progress');
    }
    elseif (!$result['is_evaluated']) {
      $score = t('Not evaluated');
    }
    else {
      if (!empty($result['pass_rate']) && is_numeric($result['score'])) {
        $pre_score = '<span class = "' . $passed_class . '">';
        $post_score = ' %<br><em>' . $grade . '</em></span>';
      }
      else {
        $post_score = ' %';
      }
      $score = $pre_score . $result['score'] . $post_score;
    }
	// instead of linking to the Quiz and Quiz title, link to the Training for the Quiz?
	$quiz_title = l($result['title'], 'node/' . $result['nid']);
	if ( function_exists( 'elite_custom_quiz_training' ) ) {
		$tnode = elite_custom_quiz_training( $result['nid'] );
		if ( $tnode->language != $language->language ) {
			$tlang = new stdClass();
			$tlang->language = $tnode->language;
			$quiz_title = l( $tnode->title, 'node/' . $tnode->nid, array('prefix' => $tnode->language .'/', 'language' => $tlang ) );
		} else {
			$quiz_title = l( $tnode->title, 'node/' . $tnode->nid ); //, array( 'language' => $tlang ) );
		}
	}
    $rows[] = array(
      'title'       => $quiz_title,
      'time_start'  => format_date($result['time_start'], 'short'),
      'time_end'    => ($result['time_end'] > 0) ? format_date($result['time_end'], 'short') . '<br />' . t('Duration :  @value', array('@value' => $interval)) : t('In Progress'),

      'score'       => $score,
      'evaluated'   => $result['is_evaluated'] ? t('Yes') : t('No'),
      'op'          => l(t('View answers'), 'user/quiz/' . $result['result_id'] . '/userresults'),
    );

  }

  if (empty($rows)) {
    return t('No @quiz results found.', array('@quiz' => QUIZ_NAME));
  }

  $header = array(
    t('Trainings'),
    t('Started'),
    t('Finished'),
    t('Score'),
    t('Evaluated'),
    t('Operation'),
  );

  $per_page = 10;
  // Initialise the pager
  $current_page = pager_default_initialize(count($rows), $per_page);
  // Split your list into page sized chunks
  $chunks = array_chunk($rows, $per_page, TRUE);
  // Show the appropriate items from the list
  $output = theme('table', array('header' => $header, 'rows' => $chunks[$current_page]));
  // Show the pager
  $output .= theme('pager', array('quantity',count($rows)));
  $output .= '<p><em>' . t('@quizzes that are not evaluated may have a different score and grade once evaluated.', array('@quizzes' => QUIZ_NAME)) . '</em></p>';
  return $output;
}
/*
 * theme_menu_local_task
 * to catch & remove user profile VIEW tab?
 */
function elite_menu_local_task($variables) {
  $link = $variables['element']['#link'];
  //watchdog('q catch', 'elite_menu_local_task : <pre>'. print_r($link,true) .'</pre>');
  $link_text = $link['title'];

  // catch to remove user profile VIEW tab?
  if ( $link['path'] == 'user/%/view' ) {
	return;
  }
  
  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));
  }

  return '<li' . (!empty($variables['element']['#active']) ? ' class="active"' : '') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}