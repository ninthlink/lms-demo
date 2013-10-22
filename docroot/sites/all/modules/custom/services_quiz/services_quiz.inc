<?php

/**
 * @file
 * Services integration for the quiz module.
 */

function services_quiz_data($data) {
  $content_id = $data['content_id'];
  $quiz = node_load($content_id);
  
  return _services_quiz_data($quiz);
}

function _services_quiz_data($quiz, $reset = FALSE) {
  if($reset) {
    $quiz = node_load($quiz->nid, $quiz->vid, TRUE);
  }
  
  return $quiz;
}

function services_quiz_eval_question($data) {
  global $user;
  $quiz_id = $data['quiz_id'];
  $question_id = $data['question_id'];
  $answer = array('answer' => $data['answer']);

  $question = node_load($question_id);
  $result_id = $_SESSION['quiz_' . $quiz_id]['result_id'];
  $result = module_invoke('quiz_question', 'evaluate_question', $question, $result_id, $answer);
watchdog('services_quiz', 'Evaluating response for ResultID:' . $result_id . ' QuizID:' . $quiz_id . ' QuestionID:' .$question_id . ' Answer:' . $answer);
  return $result;
}

/**
 * Service wrapper to vote on a quiz.
 *
 * @param $data
 *   An associative array containing POSTed arguments.
 *   - quiz_name: The quiz name.
 *   - content_id: The content ID to be voted on.
 *   - chid: The Choice ID selected by the user.
 *   - action: Optional. The desired method - quiz or unquiz. Defaults to quiz.
 *
 * @return
 *   $quiz
 *     a quiz object.
 */
function services_quiz_finalize($data) {
  global $user;
  $quiz_id = $data['quiz_id'];
  $quiz = node_load($quiz_id);

  $return = _services_quiz_finalize($quiz);
  if ($return !== FALSE) {
    return $return;
  } else {
    return services_error(t('There was a problem finalizing this quiz: @quiz_name', array('@quiz_name' => $quiz->title)), 406);
  }
}

function _services_quiz_finalize($quiz) {watchdog('sc', print_r($quiz, TRUE));
  $questions = _quiz_get_answers($quiz, $_SESSION['quiz_' . $quiz->nid]['result_id']);
  $score = quiz_end_scoring($quiz, $_SESSION['quiz_' . $quiz->nid]['result_id']);
  
  $session_data = $_SESSION['quiz_' . $quiz->nid];
  unset($_SESSION['quiz_' . $quiz->nid]);

  quiz_end_actions($quiz, $score, $session_data);

  $return = new stdClass();
  $return->score = $score;
  return $return;
}