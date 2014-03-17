<?php

/**
 * @file field.tpl.php
 * Default template implementation to display the value of a field.
 *
 * This file is not used and is here as a starting point for customization only.
 * @see theme_field()
 *
 * Available variables:
 * - $items: An array of field values. Use render() to output them.
 * - $label: The item label.
 * - $label_hidden: Whether the label display is set to 'hidden'.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - field: The current template type, i.e., "theming hook".
 *   - field-name-[field_name]: The current field name. For example, if the
 *     field name is "field_description" it would result in
 *     "field-name-field-description".
 *   - field-type-[field_type]: The current field type. For example, if the
 *     field type is "text" it would result in "field-type-text".
 *   - field-label-[label_display]: The current label position. For example, if
 *     the label position is "above" it would result in "field-label-above".
 *
 * Other variables:
 * - $element['#object']: The entity to which the field is attached.
 * - $element['#view_mode']: View mode, e.g. 'full', 'teaser'...
 * - $element['#field_name']: The field name.
 * - $element['#field_type']: The field type.
 * - $element['#field_language']: The field language.
 * - $element['#field_translatable']: Whether the field is translatable or not.
 * - $element['#label_display']: Position of label display, inline, above, or
 *   hidden.
 * - $field_name_css: The css-compatible field name.
 * - $field_type_css: The css-compatible field type.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess_field()
 * @see theme_field()
 *
 * @ingroup themeable
 */
$vid = $vmp4 = $vwebm = '';
$showvid = false;
if ( in_array($element['#object']->type, array('article','training') ) ) {
	if ( is_array( $element['#object']->field_video_url ) ) {
		if ( isset( $element['#object']->field_video_url['und'] ) ) {
			if ( $element['#object']->field_video_url['und'][0]['url'] != '' ) {
				$vid = $element['#object']->field_video_url['und'][0]['url'];
				// only vimeo for starters..
				$vat = strpos($vid,'vimeo.com/');
				if ( $vat > 0 ) {
					$vid = substr($vid, $vat+10);
					$showvid = true;
				} else {
					$vid = '';
				}
			}
		}
	}
	$basepath = defined('ELITELOCAL') ? ELITELOCAL : '';
	if ( is_array( $element['#object']->field_video_file ) ) {
		if ( isset( $element['#object']->field_video_file['und'] ) ) {
			$vmp4 = $basepath .'/sites/default/files/videos/'. $element['#object']->field_video_file['und'][0]['filename'];
		}
	}
	if ( is_array( $element['#object']->field_video_webm ) ) {
		if ( isset( $element['#object']->field_video_webm['und'] ) ) {
			$vwebm = $basepath .'/sites/default/files/videos/'. $element['#object']->field_video_webm['und'][0]['filename'];
		}
	}
	if ( ( $vmp4 != '' ) || ( $vwebm != '' ) ) {
		$vid = ''; // use html5 instead
		$showvid = true;
		drupal_add_js('//cdn.sublimevideo.net/js/brxysbmu.js', 'external');
	}
}
if ( $showvid ) {
	if ( $vid != '' ) {
		// falling back to VIMEO, but still check for local debugging :
		if ( defined('ELITELOCAL') ) {
			// lets just print the video html5 stuff here
			if ( is_array( $element['#object']->field_video_file ) ) {
				if ( isset( $element['#object']->field_video_file['und'] ) ) {
					$vmp4 = $basepath .'/sites/default/files/videos/'. $element['#object']->field_video_file['und'][0]['filename'];
				}
			}
		}
		if ( $vmp4 != '' ) {
			?>
	<video id="qvideo" controls width="800" height="450" poster="<?php echo $basepath .'/sites/default/files/'. ( $element['#object']->type == 'training' ? 'trainings/' : 'field/image/' ) . $element['#object']->field_image['und'][0]['filename'] ?>">
		<source src="<?php echo $vmp4 ?>" type="video/mp4" />
		Your device does not support HTML5 video.
	</video>
	<?php
		} else {
			// just vimeo (for now?)
			echo '<iframe id="qvideo" src="//player.vimeo.com/video/'. $vid .'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}
	} else {
		?>
	<video class="sublime" id="qvideo" controls width="800" height="450" poster="<?php echo $basepath .'/sites/default/files/field/image/'. $element['#object']->field_image['und'][0]['filename'] ?>" data-uid="q-video-<?php echo $element['#object']->nid ?>" data-autoresize="fit" preload="none">
		<?php
			if ( $vmp4 != '' ) echo '<source src="'. $vmp4 .'" type="video/mp4" />' ."\n";
			if ( $vwebm != '' ) echo '<source src="'. $vwebm .'" type="video/webm" />' ."\n";
		?>
		Your device does not support HTML5 video.
	</video>
		<?php
	}
} else { ?>
<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if (!$label_hidden): ?>
    <div class="field-label"<?php print $title_attributes; ?>><?php print $label ?>&nbsp;</div>
  <?php endif; ?>
  <div class="field-items"<?php print $content_attributes; ?>>
    <?php foreach ($items as $delta => $item): ?>
      <div class="field-item <?php print $delta % 2 ? 'odd' : 'even'; ?>"<?php print $item_attributes[$delta]; ?>><?php print render($item); ?></div>
    <?php endforeach; ?>
  </div>
</div>
<?php } ?>