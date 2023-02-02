# PhotoBankHub
> This project implements the functionality of a resource with stock photos. Including subscription system, functionality for clients and authors.


The project was implemented using the React, Laravel, Mysql technology stack


<img 
src="assets/logo/logo_with_lable.png" 
alt="Markdownify" 
width="400" 
style="max-width: 100%; display: block; margin: 0 auto;" 
/>


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

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
