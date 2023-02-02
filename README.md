# PhotoBankHub
> This project implements the functionality of a resource with stock photos. Including subscription system, functionality for clients and authors.


The project was implemented using the React, Laravel, Mysql technology stack


<div align="center">
    <img 
        src="assets/logo/logo_with_lable.png" 
        alt="Markdownify" 
        width="400" 
    />
</div>



## Links 

Storage Backup and Sql Dumb - https://drive.google.com/file/d/1KsTnUVhFcf-ADhPeoGgT0eW3s6AzGqKa/view?usp=share_link

Activity log - [REAMDME](/api/README.md)

## Installation 

---
### Clineth App


```sh 
npm install 
```

```sh 
npm run start 
```

--- 

### Server

First of all your need copy and rename file .env.example in api  root folder.
<br />
Then 


```sh
composer i
```

```sh
php artisan passport:keys
```

```sh 
php artisan key:generate
```

Refresh data (long way)
```sh 
php artisan migrate:refresh --seed 
```
or your may [export sql dumb and extract file to <i>storage/app</i> folder](https://drive.google.com/file/d/1KsTnUVhFcf-ADhPeoGgT0eW3s6AzGqKa/view?usp=share_link) 


In php.ini: 

```
extension=imagick
post_max_size = 100M
upload_max_filesize = 100M
```

```sh
php artisan storage:link
```

```sh
php artisan serve
```


--- 
Start Queue (for email sending)
```sh
php artisan queue:listen 
```
--- 
Start Shedule Cron Job (for subscription renewal test)
```sh
php artisan schedule:work 
```


## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```


## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/EvgeniyRyabchuk/PhotoBankHub](https://github.com/EvgeniyRyabchuk/PhotoBankHub)
