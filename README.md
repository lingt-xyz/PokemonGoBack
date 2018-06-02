PokemonGoBack

http://dumblev3.encs.concordia.ca/

http://dumblev3.encs.concordia.ca/index.html

http://dumblev3.encs.concordia.ca/info.php


Development Environment

    VM: Debian 9.4
    Connection: ssh username@host
    Apache2 WebRoot: /var/www/html
    Installation
        # su
        # apt install mysql-server
        # apt install php libapache2-mod-php php-mysql
        # apt install phpmyadmin php-mbstring php-gettext
        # vi /etc/apache2/apache2.conf
        Add the following line to the end of the file:
            Include /etc/phpmyadmin/apache.conf
        # systemctl restart apache2
        # exit
    Configuration
        su
        # vi /etc/apache2/mods-enabled/dir.conf
            Move the PHP index file to the first position after the DirectoryIndex specification
        # systemctl restart apache2
        # mysql --user=root mysql
            > CREATE DATABASE pokemongoback;
            > CREATE USER 'pokemongoback'@'localhost' IDENTIFIED BY 'pokemongoback';
            > GRANT ALL PRIVILEGES ON pokemongoback.* TO 'pokemongoback'@'localhost';
            > FLUSH PRIVILEGES;
            > EXIT;
        # exit

PokemonGoBackInstallation
System Requirement

    Unix/Linux

Prerequisites

    Apache2
    PHP7.0
    MySQL

    Assumptions

    $Web_Root: Web Document Root (e.g. /var/www/html)
    $MySQL_U: MySQL username
    $MySQL_P: MySQL password

References:

    https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
    https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-16-04
    https://askubuntu.com/questions/668734/the-requested-url-phpmyadmin-was-not-found-on-this-server
    https://askubuntu.com/questions/763336/cannot-enter-phpmyadmin-as-root-mysql-5-7
    https://dev.mysql.com/doc/refman/8.0/en/create-user.html
    https://stackoverflow.com/questions/5555328/error-1396-hy000-operation-create-user-failed-for-jacklocalhost
