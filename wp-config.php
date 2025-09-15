<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u745707804_bnpublisher' );

/** Database username */
define( 'DB_USER', 'u745707804_bnpublisher' );

/** Database password */
define( 'DB_PASSWORD', 'BNpublisher@2025' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'x)r&]Ujlc-S]:s:4l]p~ope2uW)IwgMy2/ v1s@*$j=vPIO_K]4Eu%i~Q^Yp,]&}' );
define( 'SECURE_AUTH_KEY',   'hY*Q5,5p{w-+Nv[rQyc9Nl!{|2_x<Q)!TvbvP&6M%%M*Yv0U&<+Tx1q(8)p(tE{O' );
define( 'LOGGED_IN_KEY',     'cZ(1e/)z[{ ~%3|zluRI|zBv$5hsXE:cVOT&V:uLOg?s&hefKeI{QUw^{43y#&RF' );
define( 'NONCE_KEY',         '/g+f]lUm5-8iIheG9-!|!VCy/WT][<hl[[AA|<9Fp$C|^6Y$f<r_iUzW};:vQ2a7' );
define( 'AUTH_SALT',         'oB}]3)9|t%CXi<sD6UhP:[Z[Li,z-v>VPIcF|`VuC{.-DOwOzMNcUo_8u-/zsOGh' );
define( 'SECURE_AUTH_SALT',  '&Ymyei1|TBz~YIcFR1U2j{13v/6)NZdOpB(]:Eh%ZIj]K1?p !bOa:LL:<du>wc>' );
define( 'LOGGED_IN_SALT',    ';}hLv%/x1.}Q[>.=>-UILJpD%`~yvp2i 4/$$9v^F)nP:RN!4{-o|,bV#xYfJ-X7' );
define( 'NONCE_SALT',        'WUXmt#v!)9e0okTArQs53cA*M[2:6ua-x3NCdUdEdW *@3/:D#K?_(ef`CfzAkc1' );
define( 'WP_CACHE_KEY_SALT', '@pxU`I4$(SX!a_2KM^pEDlGsG/?GL|mnBl.N#/>C [g!%LI&^f}xU}S+<6Z>TQ[m' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
