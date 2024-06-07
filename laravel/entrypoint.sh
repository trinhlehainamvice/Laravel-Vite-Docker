#!/bin/sh

if [ ! -f /var/www/html/vendor/autoload.php ]; then
    composer install
fi

if [ ! -f /var/www/html/.env ]; then
    cp /var/www/html/.env.example /var/www/html/.env
fi

# Check if APP_KEY is set in the .env file
if grep -q "APP_KEY=" /var/www/html/.env && [ -n "$(grep 'APP_KEY=' /var/www/html/.env | cut -d '=' -f2)" ]; then
  echo "Application key already exists."
else
  echo "Generating application key..."
  php artisan key:generate
fi

# Function to check if database is migrated or not
is_database_not_migrated() {
  # Check if there are any entries in the migrations table
  # HACK: output from migrate:status potentially changed
  php artisan migrate:status | grep 'not found'
}

if is_database_not_migrated; then
    php artisan migrate
else
    echo "Database is already migrated."
fi

#check if php-fpm is running
if ! pgrep -x "php-fpm" > /dev/null; then
    php-fpm
fi

