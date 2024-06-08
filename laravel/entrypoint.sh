#!/bin/sh

if [ ! -f /var/www/html/vendor/autoload.php ]; then
    composer install
fi

if [ ! -f /var/www/html/.env ]; then
    echo "Create .env file"
    cp /var/www/html/.env.example /var/www/html/.env
    rm /var/www/html/.env.example
fi

# Check if APP_KEY is set in the .env file
if grep -q "APP_KEY=" /var/www/html/.env && [ -n "$(grep 'APP_KEY=' /var/www/html/.env | cut -d '=' -f2)" ]; then
  echo "Application key already exists."
else
  echo "Generating application key..."
  php artisan key:generate
fi

# TODO: read from .env
DB_HOST=${DB_HOST:-mysql}
DB_PORT=${DB_PORT:-3306}

# NOTE: wait until can connect to database before running php artisan migrate
# https://stackoverflow.com/questions/25503412/how-do-i-know-when-my-docker-mysql-container-is-up-and-mysql-is-ready-for-taking
until nc -z $DB_HOST $DB_PORT
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

echo "Database connection established."

# Function to check if database is migrated or not
is_database_not_migrated() {
  # Check if there are any entries in the migrations table
  # HACK: output from migrate:status potentially changed
  php artisan migrate:status | grep 'not found' > /dev/null
}

if is_database_not_migrated; then
    php artisan migrate
else
    echo "Database is already migrated."
fi

# Don't exit to keep container running
tail -f /dev/null
