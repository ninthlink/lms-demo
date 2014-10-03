<?php

/**
 * @file
 * VIVE node : theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php //print $user_picture; ?>

  <?php /*if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif;*/ ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php
      /* more hardcoded for security..
	  // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
			
			// add header stuff this way??
			$content['title_field'][0]['#markup'] = "\n". '<div class="pad">'. "\n". '<a href="/" class="qlogo">Qualcomm</a>'. "\n". $content['title_field'][0]['#markup'] .'<h2>'. t('Synergize your Network') .'</h2>'."\n".'<p class="tdisc">'. t('Qualcomm VIVE and StreamBoost are products of Qualcomm Atheros, Inc.') ."</p>\n".'<a href="/wtrainings/vive-b/" class="tbutton">'. t('Take the Training') ."</a>\n</div>\n";
			
      print render($content);
	  */
    ?>
	<div class="field field-name-title-field field-type-text field-label-hidden">
    <div class="field-items">
          <div class="field-item even">
	<div class="pad">
		<a href="/" class="qlogo">Qualcomm</a>
		<h1><?php print t('Qualcomm&reg; VIVE&trade; with StreamBoost&trade;'); ?></h1>
		<h2><?php print t('Synergize your Network'); ?></h2>
		<p class="tdisc"><?php print t('Qualcomm VIVE and StreamBoost are products of Qualcomm Atheros, Inc.'); ?></p>
		<a href="/wtrainings/vive-b/" class="tbutton"><?php print t('Take the Training'); ?></a>
	</div>
	</div>
      </div>
</div>
<div class="field field-name-body field-type-text-with-summary field-label-hidden">
    <div class="field-items">
          <div class="field-item even">
		  <div class="grid-12">
  <div class="pad">
    <div class="grid-12">
      <h2>Your wireless network is getting crowded. Moving your media around to all your devices requires Wi-Fi networks that keep up with intense demands for more bandwidth and speed. </h2>
    </div>
    <div class="grid-8">
    <p>Introducing Qualcomm&reg; VIVE&trade; 802.11ac. Unleashing Gigabit Wi-Fi and more efficient connectivity to all your devices, VIVE is "Wi with a lot more Fi". <br /><br />Qualcomm VIVE brings your content and devices to life. It is 3x faster than 11n, so you can enjoy faster downloads, smoother video and music streams, and latency-free gaming, on more connected devices. <br /><br />With Qualcomm&reg; VIVE&trade; 11ac inside, a router uses superior channel agility to perform better in the presence of legacy Wi-Fi devices. VIVE-based routers can transmit data over 80, 40 or 20 MHz channels &mdash; depending on the available bandwidth and type of client devices on the other end of the connection.<br /><br />In addition, Qualcomm 11ac is smartly designed with an efficient architecture to reduce your router&rsquo;s power usage by up to 30% less than other networking solutions. </p>
    </div>
    <div class="grid-4">
      <img src="/sites/all/themes/elite/images/vive/icons.png" alt="Channel Agility, 30% Lower Power than Competition, 3x Faster than 11n" />
    </div>
  </div>
</div>
</div>
<div class="grid-12 orange">
  <div class="pad">
    <div class="grid-10">
      <h2>What else is unique to Qualcomm VIVE technology?</h2>
      <p>In some of the new Qualcomm VIVE 11ac routers, you can also enjoy StreamBoost technology. StreamBoost intelligently manages bandwidth coming into your home network. It automatically gives each app &amp; device what it needs to ensure a great online experience for everyone on the network. </p>
    </div>
    <div class="grid-12">
      <h2>Today&lsquo;s home networks suffer<br />from network contention</h2>
      <h4>Devices &amp; APPs compete<br />for limited bandwidth</h4>
    </div>
    <div class="grid-12">
      <h2>Qualcomm&reg; StreamBoost&trade;<br />has the intelligence<br />needed to fix this</h2>
      <h4>With Streamboost, your network<br />runs smooth</h4>
    </div>
    <div class="grid-10">
      <h2>Qualcomm StreamBoost provides:</h2>
      <ul>
      <li>Faster, more efficient home networks - especially when running many applications on multiple devices</li>
      <li>A simple, web-based interface to see and manage devices &amp; apps on your network </li>
      <li>Cloud-based updates. StreamBoost routers can continuously learn &amp; adapt as your network changes, for improved performance over time.</li>
      </ul>
    </div>
  </div>
</div>
<div class="grid-12 teal">
  <div class="pad">
    <div class="grid-12">
    	<h3>Qualcomm&reg; VIVE&trade; 11ac Routers With StreamBoost</h3>
    </div>
  </div>
</div>
<div class="grid-12 devicerow">
<div class="grid-6 device odd"><img src="/sites/all/themes/elite/images/vive/d1.jpg" alt="" /><span class="name">D-Link AC1300 Dual Band Gaming Router</span></div>
<div class="grid-6 device"><img src="/sites/all/themes/elite/images/vive/d2.jpg" alt="" /><span class="name">ZyXEL NBG6716</span></div>
</div>
<div class="grid-12 teal"><div class="pad"><div class="grid-12"><h3>Qualcomm&reg; VIVE&trade; 11ac Routers</h3></div></div></div>
<div class="grid-12 devicerow">
<div class="grid-6 device odd"><img src="/sites/all/themes/elite/images/vive/d3.jpg" alt="" /><span class="name">NETGEAR AC1200</span></div>
<div class="grid-6 device"><img src="/sites/all/themes/elite/images/vive/d4.jpg" alt="" /><span class="name">Belkin AC1750</span></div>
</div>
<div class="grid-12 devicerow">
<div class="grid-6 device odd"><img src="/sites/all/themes/elite/images/vive/d5.jpg" alt="" /><span class="name">TP-LINK Archer C7</span></div>
<div class="grid-6 device"><img src="/sites/all/themes/elite/images/vive/d6.jpg" alt="" /><span class="name">EnGenius Technologies AC1750 &amp; 1200</span></div>
</div>
<div class="grid-12 teal">
  <div class="pad">
    <div class="grid-12">
    	<a href="/wtrainings/vive-b/" class="tbutton right">Take the Training</a>
    	<h3 style="float:left;margin: 20px 0; line-height: 53px">Qualcomm&reg; VIVE&trade; With StreamBoost</h3>
    </div>
  </div>
</div>
		  </div>
	</div>
</div>
  </div>

  <?php //print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
