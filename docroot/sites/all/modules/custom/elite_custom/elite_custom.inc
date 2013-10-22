<?php

function elite_custom_user_purchase($product_id, $shipping_data) {
  global $user;
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
      //@todo update shipping information
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