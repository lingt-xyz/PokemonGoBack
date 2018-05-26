# PokemonGoBack
COMP354

## Development
- VM: Debian 9.4
- Connection: ssh username@host
- Apache2 WebRoot: /var/www/html
- Installation
  - \# su
  - \# apt install mysql-server
  - \# apt install php libapache2-mod-php php-mysql
- Configuration
  - \# vi /etc/apache2/mods-enabled/dir.conf
    - Move the PHP index file to the first position after the DirectoryIndex specification
  - \# systemctl restart apache2
  

## PokemonGoBackInstallation

#### System Requirement
- [x] Unix/Linux

#### Prerequisites
- [x] Apache2
- [x] PHP7.0
- [x] MySQL

1. Assumptions
- $Web_Root: Web Document Root (e.g. /var/www/html)
- $MySQL_U: MySQL username
- $MySQL_P: MySQL password

References:
1. https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
