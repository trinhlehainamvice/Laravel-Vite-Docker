if [ ! f "vendor/autoload.php" ]; then
    composer install
fi

if [ ! f ".env" ]; then
    echo "Create .env file"
    cp .env.example .env
fi

php-fpm -D
