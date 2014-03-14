<?php

function elite_custom_user_purchase($data) {
  global $user;
  $product_id = $data['product_id'];
  $shipping_data = $data['shipping_data'];
  if($product = commerce_product_load($product_id)) {
    $user_points = userpoints_get_current_points($user->uid);
    $product_points = $product->commerce_price[LANGUAGE_NONE][0]['amount'];
    if ($product->commerce_price[LANGUAGE_NONE][0]['amount'] == 'USD') {
      $product_points *= .1;
    }
    if ($user_points > $product_points) {
      $order = commerce_order_new($user->uid, 'pending');

      $product = commerce_product_load($product_id);
      $line_item = commerce_product_line_item_new($product, 1, $order->order_id, array());
      commerce_line_item_save($line_item);

      $order_wrapper = entity_metadata_wrapper('commerce_order', $order);
      $order_wrapper->commerce_line_items[] = $line_item;

      $profile_data = commerce_customer_profile_new('shipping', $user->uid);
      $profile_data->commerce_customer_address = $shipping_data;
      commerce_customer_profile_save($profile_data);
      $profile_id = $profile_data->profile_id;
      $order->commerce_customer_shipping[LANGUAGE_NONE][0]['profile_id'] = $profile_id;
      
      commerce_order_save($order);

      userpoints_userpointsapi($product_points * -1);
      return 'Success';
    } else {
      return 'You do not have enough points for this transaction';
    }
  } else {
    return 'Invalid Product';
  }
  return 'There was an error processing this purchase';
}

function elite_custom_user_picture($data) {
  global $user;
  $fid = $data['fid'];
  
  $check = db_select('file_managed', 'fm')
    ->fields('fm')
    ->condition('fid', $fid, '=')
    ->condition('uid', $user->uid, '=')
    ->execute()
    ->fetchAssoc();

  if (!empty($check)) {
    $result = db_update('users')
      ->fields(array('picture' => $fid))
      ->condition('uid', $user->uid, '=')
      ->execute();
    
    if (!empty($result)) {
      $user = user_load($user->uid, TRUE);
      user_save($user);
      
      return 'Success';
    } 
  }
  return services_error('Could not find picture');
}

function elite_custom_services_imagecache($data) {
  $fid = $data['fid'];
  $style = $data['style'];

  $file = file_load($fid);
  $uri = image_style_url($style, $file->uri);

  $return = new stdClass();
  $return->path = $uri;

  return $return;
}

/**
 * callback for services /user/counts
 * 
 * returns
 * uid of current user
 * points total for current user
 * total + complete + remaining # for both Trainings & Trends
 */
function elite_custom_services_user_counts() {
	global $user;
	$uid = (int)$user->uid;
	
	$return = new stdClass();
	if ( $uid > 0 ) {
		// trainings
		$total_trainings = (int)elite_custom_get_node_count('training');
		$complete_trainings = (int)elite_custom_user_training_count();
		$remaining_trainings = $total_trainings - $complete_trainings;
		if ( $remaining_trainings < 0 ) $remaining_trainings = 0; // just in case
		
		$trainings = array(
			'total' => $total_trainings,
			'complete' => $complete_trainings,
			'remaining' => $remaining_trainings,
		);
		// trends
		$total_trends = (int)elite_custom_get_node_count('article');
		$complete_trends = (int)db_query("SELECT COUNT(*) FROM flagging WHERE uid=:uid and fid=2", array(':uid' => $uid))->fetchField();
		$remaining_trends = $total_trends - $complete_trends;
		if ( $remaining_trends < 0 ) $remaining_trends = 0; // just in case
		
		$trends = array(
			'total' => $total_trends,
			'complete' => $complete_trends,
			'remaining' => $remaining_trends,
		);
		
		$points = (int)userpoints_get_current_points($uid);
		
		$favorites = (int)elite_custom_user_favorites_count();
		
		$return->uid = $uid;
		$return->points = $points;
		$return->trainings = $trainings;
		$return->trends = $trends;
		$return->favorites = $favorites;
	}
	return $return;
}

/**
 * callback for services /regions
 * 
 * returns
 * regions for registering peoples
 */
function elite_custom_services_regions() {
	$field = field_info_field('field_region');
	$values = list_allowed_values($field);
	
	//$return = new stdClass();
	$return = $values;
	
	return $return;
}
/**
 * callback for services /regions/verbose
 * 
 * returns
 * regions for registering peoples
 */
function elite_custom_services_regions_verbose() {
	return elite_custom_default_regions_list_verbose();
}
/**
 * callback for services /terms
 * 
 * returns
 * Content from the About / Terms / Privacy pages all at once
 */
function elite_custom_services_terms() {
	$return = array();
	
	$pages = array(
		'about' => 'about',
		'privacy' => 'about/privacy-policy',
		'cookie' => 'about/cookie-policy',
		'terms' => 'about/terms-conditions',
	);
	foreach ( $pages as $k => $v ) {
		$path = drupal_lookup_path('source', $v);
		$node = menu_get_object('node', 1, $path);
		
		$return[$k] = new stdClass();
		if ( $node ) {
			$return[$k]->title = $node->title;
			$return[$k]->body = $node->body['und'][0]['safe_value'];
		} else {
			$return[$k]->title = $k;
			$return[$k]->body = '<p>There appears to have been some kind of an error. Please contact the Site Administrators.</p>';
		}
	}
	return $return;
}