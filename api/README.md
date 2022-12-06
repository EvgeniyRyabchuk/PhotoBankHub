

### Install Laravel 

1. Если проект только что устнолен 

``` composer create-project laravel/laravel api ```

``` php artisan migrate:refresh --seed ```

``` php artisan serve ```

2. Если проект скачанный с гитхаба

create .env file if not exist and fill such property like DB_CONNECTION

``` composer i ```

``` php artisan key:generate```

``` php artisan migrate:refresh --seed ```



### Passport Authorization Installation 

1. Install passport 

``` composer require laravel/passport ``` 

2. Migrate table from this package  

``` php artisan migrate ```

3. Creating public & private access key and two oauth clients 

``` php artisan passport:install ```

4. Creating public & private access key 

``` php artisan passport:keys ```

5. Create one oauth client for retrieve someone user 

``` php artisan passport:client --password ``` 

5. Move passport config file to laravel config folder 

``` php artisan vendor:publish --tag=passport-config ```

5. Move passport migration file to laravel migration folder

``` php artisan vendor:publish --tag=passport-migrations ```


#### Code edit for passport

add: 

use Laravel\Passport\HasApiTokens; 

and 

use HasApiTokens; 

in User Model 


Create AuthController with command 

``` php artisan make:controller AuthController ```

Seed Static Oauth Clients for handy development 

``` php artisan make:model OauthClient ```

```php 
        $client1 = [
            'id' => 1,
            'user_id' => null,
            'name' => "Laravel Personal Access Client",
            "secret" => "yygu0hUlhcDJttOCsiHhkButCEjEp0rLq6rUrWdP",
            "provider" => null,
            "redirect" => "http://localhost",
            "personal_access_client" => true,
            "password_client" => false,
            "revoked" => false,
            "updated_at" => Carbon::now(),
            'created_at' => Carbon::now()
        ];

        $client2 = [
            'id' => 2,
            'user_id' => null,
            'name' => "Laravel Password Grant Client",
            "secret" => "2zM8Ny0Usfu3LgchNakjVZjwKY8PpTtejZFBwssz",
            "provider" => "users",
            "redirect" => "http://localhost",
            "personal_access_client" => false,
            "password_client" => true,
            "revoked" => false,
            "updated_at" => Carbon::now(),
            'created_at' => Carbon::now()
        ];


        OauthClient::insert([
            $client1,
            $client2
        ]);
        
```

``` php artisan migrate:refresh --seed ```

---

Then in AuthServiceProvider in method boot insert next: 

Passport::tokensExpireIn(now()->addDays(15)); 

Passport::refreshTokensExpireIn(now()->addDays(30));

Passport::personalAccessTokensExpireIn(now()->addMonths(6));

Passport::ignoreCsrfToken(true);

---  

Then config file that named as auth.php must include this arrya 

```php 

 'guards' => [
        'web' => [
            'driver' => 'session', 
            'provider' => 'users',
        ],
        'api' => [
            'driver' => 'passport', 
            'provider' => 'users', 
        ],
    ],

```

--- 

Change property in file .env from local on public 

``` FILESYSTEM_DISK=public ```

``` php artisan storage:link ```

Add to filesystem config file 

```php 

'private' => [
        'driver' => 'local',
        'root' => storage_path('app/private'),
        'url' => env('APP_URL').'/storage/private/',
        'visibility' => 'private',
        'throw' => false,
    ],

```







