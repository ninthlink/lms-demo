<?php
/**
 * This settings.php file was created by the Acquia Cloud ah-site-archive-import
 * Drush command. The imported archive did not contain a settings.php file, so
 * the import process created this file by default. You can replace this file
 * with the standard default settings.php file for your version of Drupal.
 * However, be sure to keep the last line that loads the "Acquia Cloud settings
 * include file", which provides the correct database credentials for your site.
 */
$update_free_access = FALSE;
$drupal_hash_salt = '';
ini_set('arg_separator.output',     '&amp;');
ini_set('magic_quotes_runtime',     0);
ini_set('magic_quotes_sybase',      0);
ini_set('session.cache_expire',     200000);
ini_set('session.cache_limiter',    'none');
ini_set('session.cookie_lifetime',  2000000);
ini_set('session.gc_divisor',       100);
ini_set('session.gc_maxlifetime',   200000);
ini_set('session.gc_probability',   1);
ini_set('session.save_handler',     'user');
ini_set('session.use_cookies',      1);
ini_set('session.use_only_cookies', 1);
ini_set('session.use_trans_sid',    0);
ini_set('url_rewriter.tags',        '');

if (isset($_GET['q']) && ( ( strpos($_GET['q'], 'admin') === 0) || ( strpos($_GET['q'], 'batch') === 0) ) ) {
	ini_set('memory_limit', '512M');
	ini_set('max_execution_time', 10000);
	ini_set('max_input_time', 300);
	ini_set('mysql.connect_timeout', 300);
	ini_set('default_socket_timeout', 300);
	
	if ( strpos($_GET['q'], 'batch') === 0) {
		set_time_limit(300);
	}
}
/* memcache
*$conf['cache_backends'][] = './sites/all/modules/contrib/memcache/memcache.inc';
*$conf['cache_default_class'] = 'MemCacheDrupal';
*$conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
*/
$conf['userpoints_truncate'] = 100;
//vde
$conf['views_data_export_directory'] = 'public://';

// On Acquia Cloud, this include file configures Drupal to use the correct
// database in each site environment (Dev, Stage, or Prod). To use this
// settings.php for development on your local workstation, set $db_url
// (Drupal 5 or 6) or $databases (Drupal 7) as described in comments above.
if (file_exists('/var/www/site-php')) {
  require('/var/www/site-php/elite/elite-settings.inc');
} else {
  $databases = array();

  $databases['default']['default'] = array(
    'driver' => 'mysql',
    'database' => 'elite',
    'username' => 'root',
    'password' => 'root',
    'host' => 'localhost',
    'prefix' => '',
  );
  //define('ELITELOCAL', 'http://192.168.0.57/elite/docroot');
}
// t() overrides?
$conf['locale_custom_strings_en'][''] = array(
    'The e-mail address %mail is not valid.' => 'The e-mail address you provided is not valid.',
);